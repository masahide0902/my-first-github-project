// ⚡ Service Worker for Performance Optimization
// GitHub学習プロジェクト用 Service Worker

const CACHE_NAME = 'github-learning-v1.0.0';
const STATIC_CACHE = 'static-v1.0.0';
const DYNAMIC_CACHE = 'dynamic-v1.0.0';

// キャッシュするリソース
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/manifest.json'
];

// 動的にキャッシュするリソースのパターン
const CACHE_PATTERNS = [
    /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
    /\.(?:css|js)$/,
    /\.(?:woff|woff2|ttf|eot)$/
];

// インストール時の処理
self.addEventListener('install', (event) => {
    console.log('[SW] Installing Service Worker...');

    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('[SW] Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('[SW] Static assets cached successfully');
                return self.skipWaiting(); // 即座にアクティブ化
            })
            .catch((error) => {
                console.error('[SW] Failed to cache static assets:', error);
            })
    );
});

// アクティベーション時の処理
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating Service Worker...');

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        // 古いキャッシュを削除
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('[SW] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('[SW] Service Worker activated');
                return self.clients.claim(); // 即座に制御開始
            })
    );
});

// フェッチイベントの処理
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // 同一オリジンのリクエストのみ処理
    if (url.origin !== location.origin) {
        return;
    }

    // GET リクエストのみキャッシュ
    if (request.method !== 'GET') {
        return;
    }

    event.respondWith(
        handleFetchRequest(request)
    );
});

// フェッチリクエストの処理
async function handleFetchRequest(request) {
    const url = new URL(request.url);

    try {
        // 1. キャッシュファーストストラテジー（静的アセット）
        if (isStaticAsset(url.pathname)) {
            return await cacheFirst(request);
        }

        // 2. ネットワークファーストストラテジー（HTML）
        if (url.pathname === '/' || url.pathname.endsWith('.html')) {
            return await networkFirst(request);
        }

        // 3. ステイルワイルリバリデートストラテジー（その他）
        return await staleWhileRevalidate(request);

    } catch (error) {
        console.error('[SW] Fetch error:', error);

        // フォールバック処理
        if (url.pathname === '/' || url.pathname.endsWith('.html')) {
            return await caches.match('/index.html');
        }

        return new Response('オフラインです', {
            status: 503,
            statusText: 'Service Unavailable'
        });
    }
}

// 静的アセットかどうかを判定
function isStaticAsset(pathname) {
    return CACHE_PATTERNS.some(pattern => pattern.test(pathname));
}

// キャッシュファーストストラテジー
async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
        console.log('[SW] Cache hit:', request.url);
        return cachedResponse;
    }

    console.log('[SW] Cache miss, fetching:', request.url);
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
        const cache = await caches.open(STATIC_CACHE);
        cache.put(request, networkResponse.clone());
    }

    return networkResponse;
}

// ネットワークファーストストラテジー
async function networkFirst(request) {
    try {
        console.log('[SW] Network first:', request.url);
        const networkResponse = await fetch(request);

        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }

        return networkResponse;
    } catch (error) {
        console.log('[SW] Network failed, trying cache:', request.url);
        const cachedResponse = await caches.match(request);

        if (cachedResponse) {
            return cachedResponse;
        }

        throw error;
    }
}

// ステイルワイルリバリデートストラテジー
async function staleWhileRevalidate(request) {
    const cachedResponse = await caches.match(request);

    // バックグラウンドでネットワークから更新
    const networkResponsePromise = fetch(request)
        .then(async (networkResponse) => {
            if (networkResponse.ok) {
                const cache = await caches.open(DYNAMIC_CACHE);
                cache.put(request, networkResponse.clone());
            }
            return networkResponse;
        })
        .catch((error) => {
            console.log('[SW] Background update failed:', error);
        });

    // キャッシュがあればすぐに返す
    if (cachedResponse) {
        console.log('[SW] Stale while revalidate (cached):', request.url);
        return cachedResponse;
    }

    // キャッシュがなければネットワークを待つ
    console.log('[SW] Stale while revalidate (network):', request.url);
    return await networkResponsePromise;
}

// メッセージイベントの処理
self.addEventListener('message', (event) => {
    const { type, payload } = event.data;

    switch (type) {
        case 'SKIP_WAITING':
            self.skipWaiting();
            break;

        case 'GET_CACHE_SIZE':
            getCacheSize().then((size) => {
                event.ports[0].postMessage({ size });
            });
            break;

        case 'CLEAR_CACHE':
            clearAllCaches().then(() => {
                event.ports[0].postMessage({ success: true });
            });
            break;

        default:
            console.log('[SW] Unknown message type:', type);
    }
});

// キャッシュサイズを取得
async function getCacheSize() {
    const cacheNames = await caches.keys();
    let totalSize = 0;

    for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const requests = await cache.keys();

        for (const request of requests) {
            const response = await cache.match(request);
            if (response) {
                const blob = await response.blob();
                totalSize += blob.size;
            }
        }
    }

    return totalSize;
}

// 全キャッシュをクリア
async function clearAllCaches() {
    const cacheNames = await caches.keys();
    return Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
    );
}

// エラーハンドリング
self.addEventListener('error', (event) => {
    console.error('[SW] Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
    console.error('[SW] Unhandled promise rejection:', event.reason);
});

console.log('[SW] Service Worker script loaded');
