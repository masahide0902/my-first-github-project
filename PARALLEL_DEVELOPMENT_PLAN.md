# 🚀 並行開発プラン - Phase 1 基盤強化

## 📋 概要

このドキュメントは、**アクセシビリティ改善**（担当A）と**パフォーマンス最適化**（担当B）を並行して進めるための詳細な実行計画です。

### 🎯 目標
- **期間**: 3週間（開発2週間 + 統合1週間）
- **担当A**: アクセシビリティ改善（20時間）
- **担当B**: パフォーマンス最適化（25時間）
- **最終目標**: Phase 1の基盤強化完了

## 👥 担当者別作業計画

---

## 👤 担当A: アクセシビリティ改善

### 🎯 **目標**
- WCAG 2.1 AA準拠
- axe-coreスコア95+
- キーボードナビゲーション完全対応
- スクリーンリーダー対応

### 📂 **担当ファイル**
- `index.html` - ARIA属性追加、セマンティック改善
- `script.js` - キーボードイベント、フォーカス管理
- `style.css` - フォーカス表示、コントラスト改善（限定的）

### 📅 **週次スケジュール**

#### **Week 1: HTML構造とARIA属性**
```html
<!-- 実装例 -->
<header role="banner">
  <nav role="navigation" aria-label="メインナビゲーション">
    <h1>🚀 GitHub学習プロジェクト</h1>
  </nav>
</header>

<main role="main">
  <section class="hero" aria-labelledby="hero-title">
    <h2 id="hero-title">GitHubへようこそ！</h2>
    <div class="button-group" role="group" aria-label="操作ボタン">
      <button id="clickBtn" class="btn"
              aria-label="クリックカウンターを増加"
              aria-describedby="click-description">
        クリックしてみよう！
      </button>
      <button id="resetBtn" class="btn btn-secondary"
              aria-label="カウンターをリセット">
        リセット
      </button>
      <button id="darkModeBtn" class="btn btn-dark"
              aria-label="ダークモードを切り替え"
              aria-pressed="false">
        🌙 ダークモード
      </button>
    </div>
    <div id="click-description" class="sr-only">
      ボタンをクリックするとカウンターが増加し、学習進捗が記録されます
    </div>
  </section>
</main>
```

**Day 1-2: HTML構造の改善**
- [ ] セマンティックHTML要素の追加（header, nav, main, section）
- [ ] 適切な見出し階層の設定（h1, h2, h3）
- [ ] ランドマークroleの追加（banner, navigation, main, contentinfo）

**Day 3-4: ARIA属性の実装**
- [ ] ボタンにaria-label追加
- [ ] 動的コンテンツにaria-live="polite"設定
- [ ] フォームコントロールにaria-describedby追加
- [ ] ボタンの状態にaria-pressed追加

**Day 5: 検証とテスト**
- [ ] axe-core拡張機能でのテスト
- [ ] HTML Validatorでの構文チェック
- [ ] 初期コミット・プッシュ

#### **Week 2: JavaScript機能とキーボード対応**
```javascript
// キーボードナビゲーション実装例
class AccessibilityManager {
  constructor() {
    this.focusableElements = [];
    this.currentFocusIndex = 0;
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'Tab':
          this.handleTabNavigation(e);
          break;
        case 'Enter':
        case ' ':
          this.handleActivation(e);
          break;
        case 'Escape':
          this.handleEscape(e);
          break;
      }
    });
  }

  handleTabNavigation(e) {
    this.updateFocusableElements();
    // Tab順序の管理
  }

  handleActivation(e) {
    if (e.target.matches('button')) {
      e.preventDefault();
      e.target.click();
    }
  }

  announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
}
```

**Day 6-7: キーボードナビゲーション**
- [ ] Tab順序の最適化（tabindex設定）
- [ ] Enter/Spaceキーでのボタン操作
- [ ] Escapeキーでのモーダル・メニュー閉じる
- [ ] フォーカストラップの実装

**Day 8-9: フォーカス管理**
- [ ] 視覚的フォーカス表示の改善
- [ ] フォーカス移動の論理的順序確保
- [ ] スキップリンクの実装
- [ ] フォーカス状態の保持

**Day 10: スクリーンリーダー対応**
- [ ] 動的コンテンツ変更の音声通知
- [ ] 状態変化のアナウンス
- [ ] エラーメッセージの適切な通知
- [ ] 最終テスト・コミット

### 🛠️ **実装詳細**

#### **CSSフォーカス表示（style.cssの限定的編集）**
```css
/* フォーカス表示の改善 */
.btn:focus,
button:focus {
  outline: 3px solid #0066cc;
  outline-offset: 2px;
  box-shadow: 0 0 0 1px #ffffff;
}

/* スクリーンリーダー専用テキスト */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* 高コントラスト対応 */
@media (prefers-contrast: high) {
  .btn {
    border: 2px solid currentColor;
  }
}
```

### ✅ **完了条件**
- [ ] axe-core自動テストでスコア95+
- [ ] NVDA/JAWSでの動作確認完了
- [ ] キーボードのみでの全機能操作確認
- [ ] カラーコントラスト比4.5:1以上

---

## 👤 担当B: パフォーマンス最適化

### 🎯 **目標**
- Lighthouseスコア90+
- ページ読み込み時間3秒以内
- Core Web Vitals改善
- モバイル・デスクトップ最適化

### 📂 **担当ファイル**
- `style.css` - CSS最適化、Critical CSS
- `sw.js` - Service Worker（新規作成）
- `index.html` - メタタグ最適化（head部分のみ）
- 画像ファイル - WebP変換、最適化
- `manifest.json` - PWA対応（新規作成）

### 📅 **週次スケジュール**

#### **Week 1: CSS最適化とCritical CSS**
```css
/* Critical CSS実装例 */
/* Above-the-fold content styles */
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  padding: 2rem 1rem;
  text-align: center;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  margin: 0.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-display: swap; /* フォント最適化 */
}

/* 遅延読み込み画像 */
img[data-src] {
  opacity: 0;
  transition: opacity 0.3s ease;
}

img[data-src].loaded {
  opacity: 1;
}
```

**Day 1-2: CSS最適化**
- [ ] 不要なCSSルールの削除
- [ ] CSS最小化（minification）
- [ ] Critical CSSの抽出と実装
- [ ] フォント最適化（font-display: swap）

**Day 3-4: 画像最適化**
- [ ] 既存画像のWebP変換
- [ ] 画像圧縮の最適化
- [ ] レスポンシブ画像の実装
- [ ] 遅延読み込み（lazy loading）の実装

**Day 5: 初期テスト**
- [ ] Lighthouseでの初期測定
- [ ] PageSpeed Insightsでの確認
- [ ] 初期コミット・プッシュ

#### **Week 2: Service WorkerとPWA対応**
```javascript
// Service Worker実装例
// sw.js
const CACHE_NAME = 'github-learning-v1';
const urlsToCache = [
  '/',
  '/style.css',
  '/script.js',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // キャッシュがあれば返す、なければネットワークから取得
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// 画像遅延読み込み
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.add('loaded');
      imageObserver.unobserve(img);
    }
  });
});

document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img);
});
```

**Day 6-7: Service Worker実装**
- [ ] Service Workerファイル作成
- [ ] キャッシュ戦略の実装
- [ ] オフライン対応の基本機能
- [ ] Service Worker登録コード追加

**Day 8-9: PWA対応**
- [ ] manifest.json作成
- [ ] アイコンファイル準備
- [ ] メタタグ最適化（viewport, theme-color等）
- [ ] PWA機能の基本実装

**Day 10: 最終最適化**
- [ ] JavaScript非同期読み込み
- [ ] リソースの事前読み込み（preload）
- [ ] 最終パフォーマンステスト
- [ ] 最終コミット・プッシュ

### 🛠️ **実装詳細**

#### **manifest.json（新規作成）**
```json
{
  "name": "GitHub学習プロジェクト",
  "short_name": "GitHub学習",
  "description": "GitHubの基本操作を学習するためのWebアプリ",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0366d6",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

#### **HTMLメタタグ最適化（index.htmlのhead部分のみ）**
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="GitHubの基本操作を学習できるインタラクティブなWebサイト。Git、GitHub、プルリクエストを実践的に学習。">
  <meta name="keywords" content="GitHub, Git, 学習, プログラミング, バージョン管理">
  <meta name="theme-color" content="#0366d6">

  <!-- Open Graph -->
  <meta property="og:title" content="GitHub学習プロジェクト">
  <meta property="og:description" content="Git/GitHubを実践的に学べる学習プラットフォーム">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://masahide0902.github.io/my-first-github-project/">

  <!-- PWA -->
  <link rel="manifest" href="/manifest.json">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">

  <!-- Critical CSS inline -->
  <style>
    /* Critical CSS here */
  </style>

  <!-- Non-critical CSS -->
  <link rel="stylesheet" href="style.css" media="print" onload="this.media='all'">

  <title>GitHub学習プロジェクト - Git/GitHubを実践的に学習</title>
</head>
```

### ✅ **完了条件**
- [ ] Lighthouse Performance スコア90+
- [ ] WebPageTestでページ読み込み時間3秒以内
- [ ] Core Web Vitalsの全指標が良好
- [ ] モバイル・デスクトップ両方で最適化確認

---

## 🤝 協調作業のルール

### 📋 **事前調整事項**

#### **ファイル編集権限**
| ファイル | 担当A | 担当B | 調整が必要 |
|----------|-------|-------|------------|
| `index.html` | ✅ body部分 | ✅ head部分 | ❌ |
| `style.css` | ⚠️ フォーカス関連のみ | ✅ 全般 | ✅ |
| `script.js` | ✅ 全般 | ❌ | ❌ |
| 新規ファイル | ❌ | ✅ | ❌ |

#### **競合回避ルール**
1. **style.css編集時の調整**
   - 担当A: フォーカス関連のみ（`.btn:focus`, `.sr-only`等）
   - 担当B: その他全般的な最適化
   - 編集前にSlack/チャットで確認

2. **コミットメッセージ規則**
   - 担当A: `♿ accessibility: [内容]`
   - 担当B: `⚡ performance: [内容]`

3. **ブランチ戦略**
   ```bash
   # 担当A
   git checkout -b feature/accessibility-improvements

   # 担当B
   git checkout -b feature/performance-optimization
   ```

### 📞 **コミュニケーション計画**

#### **定期ミーティング**
- **毎週月曜 10:00**: 週次進捗確認
- **毎週金曜 17:00**: 週次レビュー
- **随時**: 競合発生時の緊急相談

#### **進捗報告フォーマット**
```markdown
## 週次進捗報告

### 完了したタスク
- [ ] タスク1
- [ ] タスク2

### 今週の課題
- 課題内容

### 来週の予定
- 予定1
- 予定2

### 相手への確認事項
- 確認したいこと
```

---

## 📅 統合フェーズ（Week 3）

### **Day 11-12: ブランチマージ**
1. **担当A先行マージ**
   ```bash
   git checkout main
   git pull origin main
   git merge feature/accessibility-improvements
   git push origin main
   ```

2. **担当Bマージ（競合解決）**
   ```bash
   git checkout feature/performance-optimization
   git rebase main
   # 競合解決
   git checkout main
   git merge feature/performance-optimization
   git push origin main
   ```

### **Day 13-14: 統合テスト**
- [ ] 両機能の動作確認
- [ ] Lighthouse総合テスト
- [ ] アクセシビリティ総合テスト
- [ ] クロスブラウザテスト
- [ ] モバイルデバイステスト

### **Day 15: 最終調整・リリース**
- [ ] 最終的な微調整
- [ ] ドキュメント更新
- [ ] リリースノート作成
- [ ] Phase 1完了宣言

---

## 📊 成功指標

### **個別目標**
| 担当 | 指標 | 目標値 | 測定方法 |
|------|------|--------|----------|
| A | axe-coreスコア | 95+ | axe DevTools |
| A | キーボード操作 | 100%対応 | 手動テスト |
| B | Lighthouseスコア | 90+ | Lighthouse |
| B | 読み込み時間 | <3秒 | WebPageTest |

### **統合目標**
- [ ] 両機能が競合なく動作
- [ ] 全体的なUX向上
- [ ] Phase 2への準備完了

---

## 🔗 関連リソース

- [サイト改善プラン](./SITE_IMPROVEMENT_PLAN.md)
- [開発ガイドライン](./DEVELOPMENT_GUIDELINES.md)
- [WCAG 2.1 ガイドライン](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web Vitals](https://web.dev/vitals/)

---

**🎉 効率的な並行開発で Phase 1 を成功させましょう！**

*作成日: 2025年5月25日*
*更新予定: 開発進行に応じて随時*
