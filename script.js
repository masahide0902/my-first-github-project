// DOM要素の取得
const clickBtn = document.getElementById('clickBtn');
const resetBtn = document.getElementById('resetBtn');
const statusDisplay = document.getElementById('status-display');
const darkModeBtn = document.getElementById('darkModeBtn');
const historyDisplay = document.getElementById('history-display');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

// クリック回数をカウント
let clickCount = 0;

// クリック履歴を保存
let clickHistory = [];

// ダークモードの状態
let isDarkMode = false;

// 現在の日時を取得する関数
function getCurrentDateTime() {
    const now = new Date();
    return now.toLocaleString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

// ランダムなメッセージを生成する関数
function getRandomMessage() {
    const messages = [
        '🎉 素晴らしい！GitHubの学習が進んでいますね！',
        '🚀 コミットの準備はできていますか？',
        '🌟 プッシュしてGitHubに公開しましょう！',
        '💡 ブランチを作成して新機能を追加してみませんか？',
        '🔥 プルリクエストでコードレビューを体験しよう！',
        '⭐ GitHubでオープンソースプロジェクトに貢献しよう！',
        '🎯 イシューを作成してタスク管理をしてみましょう！',
        '🌈 GitHubの世界へようこそ！'
    ];
    
    return messages[Math.floor(Math.random() * messages.length)];
}

// ボタンクリック時の処理
function handleButtonClick() {
    clickCount++;
    
    // 履歴に追加
    const clickTime = getCurrentDateTime();
    clickHistory.push({
        count: clickCount,
        time: clickTime,
        message: getRandomMessage()
    });
    
    updateDisplay();
    updateHistoryDisplay();
}

// リセットボタンクリック時の処理
function handleResetClick() {
    clickCount = 0;
    clickBtn.textContent = 'クリックしてみよう！';
    
    // リセットアニメーション
    resetBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        resetBtn.style.transform = 'scale(1)';
    }, 150);
    
    // ステータス表示をリセット
    statusDisplay.style.background = 'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)';
    statusDisplay.innerHTML = `
        <h4>🔄 カウンターがリセットされました！</h4>
        <p><strong>リセット時刻:</strong> ${getCurrentDateTime()}</p>
        <p><strong>メッセージ:</strong> 新しいスタートです！再度ボタンをクリックしてみましょう。</p>
        <div style="margin-top: 1rem;">
            <small>🆕 新機能: リセットボタンが追加されました！</small>
        </div>
    `;
}

// 履歴クリアボタンクリック時の処理
function handleClearHistoryClick() {
    clickHistory = [];
    updateHistoryDisplay();
    
    // アニメーション
    clearHistoryBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        clearHistoryBtn.style.transform = 'scale(1)';
    }, 150);
}

// ダークモードボタンクリック時の処理
function handleDarkModeClick() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    
    // ボタンテキストを更新
    darkModeBtn.textContent = isDarkMode ? '☀️ ライトモード' : '🌙 ダークモード';
    
    // アニメーション
    darkModeBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        darkModeBtn.style.transform = 'scale(1)';
    }, 150);
    
    // ローカルストレージに保存
    localStorage.setItem('darkMode', isDarkMode);
}

// 表示を更新する関数
function updateDisplay() {
    // ボタンのテキストを更新
    clickBtn.textContent = `クリック回数: ${clickCount}`;
    
    // ステータス表示を更新
    const currentTime = getCurrentDateTime();
    const randomMessage = getRandomMessage();
    
    statusDisplay.innerHTML = `
        <h4>🎊 ボタンがクリックされました！</h4>
        <p><strong>クリック回数:</strong> ${clickCount}回</p>
        <p><strong>最終更新:</strong> ${currentTime}</p>
        <p><strong>メッセージ:</strong> ${randomMessage}</p>
        <div style="margin-top: 1rem;">
            <small>このページはGitHub学習用のサンプルプロジェクトです</small>
        </div>
    `;
    
    // ボタンにアニメーション効果を追加
    clickBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        clickBtn.style.transform = 'scale(1)';
    }, 150);
    
    // 特定のクリック回数で特別なメッセージ
    if (clickCount === 5) {
        statusDisplay.style.background = 'linear-gradient(45deg, #11998e 0%, #38ef7d 100%)';
        statusDisplay.innerHTML += '<p style="margin-top: 1rem; font-weight: bold;">🏆 5回クリック達成！GitHubマスターへの道のりが始まりました！</p>';
    } else if (clickCount === 10) {
        statusDisplay.style.background = 'linear-gradient(45deg, #ffecd2 0%, #fcb69f 100%)';
        statusDisplay.innerHTML += '<p style="margin-top: 1rem; font-weight: bold;">🎖️ 10回クリック達成！あなたは真のGitHub愛好家です！</p>';
    }
}

// ページ読み込み時の初期化
function initializePage() {
    console.log('🚀 GitHub学習プロジェクトが開始されました！');
    console.log('📅 開始時刻:', getCurrentDateTime());
    
    // ダークモードの設定を復元
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        isDarkMode = true;
        document.body.classList.add('dark-mode');
        darkModeBtn.textContent = '☀️ ライトモード';
    }
    
    // 初期メッセージを設定
    statusDisplay.innerHTML = `
        <h4>👋 GitHub学習プロジェクトへようこそ！</h4>
        <p>このプロジェクトでGitの基本操作を学習しましょう。</p>
        <p><strong>開始時刻:</strong> ${getCurrentDateTime()}</p>
        <p>上のボタンをクリックして、JavaScriptの動作を確認してください！</p>
    `;
}

// 履歴表示を更新する関数
function updateHistoryDisplay() {
    if (clickHistory.length === 0) {
        historyDisplay.innerHTML = '<p>まだクリック履歴がありません。ボタンをクリックして履歴を作成しましょう！</p>';
        clearHistoryBtn.style.display = 'none';
        return;
    }
    
    // 最新10件の履歴を表示
    const recentHistory = clickHistory.slice(-10).reverse();
    
    let historyHTML = '<h4>📊 最新のクリック履歴</h4>';
    recentHistory.forEach((item, index) => {
        historyHTML += `
            <div class="history-item">
                <strong>#${item.count}</strong> - ${item.time}
                <br><small>${item.message}</small>
            </div>
        `;
    });
    
    if (clickHistory.length > 10) {
        historyHTML += `<p style="margin-top: 1rem; opacity: 0.8;"><small>他に${clickHistory.length - 10}件の履歴があります</small></p>`;
    }
    
    historyDisplay.innerHTML = historyHTML;
    clearHistoryBtn.style.display = 'inline-block';
}

// イベントリスナーの設定
document.addEventListener('DOMContentLoaded', initializePage);
clickBtn.addEventListener('click', handleButtonClick);
resetBtn.addEventListener('click', handleResetClick);
clearHistoryBtn.addEventListener('click', handleClearHistoryClick);
darkModeBtn.addEventListener('click', handleDarkModeClick);

// キーボードショートカット（Enterキーでボタンクリック）
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        handleButtonClick();
    }
});

// ページを離れる前の確認（学習用）
window.addEventListener('beforeunload', function(event) {
    if (clickCount > 0) {
        const message = `${clickCount}回クリックしました。本当にページを離れますか？`;
        event.returnValue = message;
        return message;
    }
});

// コンソールにGitコマンドのヒントを表示
console.log(`
🎯 GitHub学習のヒント:

📝 基本的なGitコマンド:
   git add .          # 変更をステージング
   git commit -m "メッセージ"  # コミット作成
   git push origin main       # リモートにプッシュ

🌿 ブランチ操作:
   git branch feature-branch  # 新しいブランチ作成
   git checkout feature-branch # ブランチ切り替え
   git merge feature-branch   # ブランチをマージ

🔄 リモート操作:
   git remote add origin <URL>  # リモートリポジトリ追加
   git pull origin main         # リモートから取得
   git clone <URL>              # リポジトリをクローン

頑張って学習しましょう！🚀
`); // 開発者2による変更
