# 🚀 開発ガイドライン

このドキュメントは、複数人でのスムーズな開発を実現するためのガイドラインです。

## 📋 目次

1. [開発環境のセットアップ](#開発環境のセットアップ)
2. [ブランチ戦略](#ブランチ戦略)
3. [コーディング規約](#コーディング規約)
4. [コミット規約](#コミット規約)
5. [プルリクエスト規約](#プルリクエスト規約)
6. [レビュー規約](#レビュー規約)
7. [Issue管理](#issue管理)
8. [緊急時の対応](#緊急時の対応)

---

## 🛠️ 開発環境のセットアップ

### 必須ツール
- **Git** (最新版)
- **GitHub CLI** (`gh`)
- **Node.js** (LTS版) - 将来の拡張用
- **VS Code** または **Cursor** (推奨)
- **モダンブラウザ** (Chrome, Firefox, Safari)

### 推奨VS Code拡張機能
```json
{
  "recommendations": [
    "ms-vscode.vscode-git",
    "github.vscode-pull-request-github",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.live-server"
  ]
}
```

### 初期セットアップ手順

```bash
# 1. リポジトリをフォーク（GitHub上で）

# 2. ローカルにクローン
git clone https://github.com/YOUR_USERNAME/my-first-github-project.git
cd my-first-github-project

# 3. 元リポジトリをupstreamとして追加
git remote add upstream https://github.com/masahide0902/my-first-github-project.git

# 4. Git設定
git config user.name "Your Name"
git config user.email "your.email@example.com"

# 5. GitHub CLI認証
gh auth login

# 6. 開発ブランチ作成
git checkout -b feature/your-feature-name
```

---

## 🌿 ブランチ戦略

### ブランチの種類

#### メインブランチ
- **`main`** - 本番環境用の安定版
  - 直接プッシュ禁止
  - プルリクエスト経由でのみマージ
  - 常にデプロイ可能な状態を維持

#### 開発ブランチ
- **`develop`** - 開発統合ブランチ（将来実装予定）
- **`feature/機能名`** - 新機能開発
- **`fix/修正内容`** - バグ修正
- **`hotfix/緊急修正`** - 緊急バグ修正
- **`docs/更新内容`** - ドキュメント更新
- **`style/変更内容`** - UI/スタイル変更
- **`refactor/変更内容`** - リファクタリング
- **`test/テスト内容`** - テスト追加

### ブランチ命名規則

```bash
# 良い例
feature/add-user-authentication
fix/button-click-bug
hotfix/security-vulnerability
docs/update-readme
style/improve-mobile-layout
refactor/optimize-performance
test/add-unit-tests

# 悪い例
new-feature
bug-fix
update
my-branch
```

### ブランチ運用フロー

```bash
# 1. 最新のmainを取得
git checkout main
git pull upstream main

# 2. 新しいブランチを作成
git checkout -b feature/your-feature-name

# 3. 開発作業
# ... コーディング ...

# 4. 定期的にmainの変更を取り込み
git fetch upstream
git rebase upstream/main

# 5. プッシュ
git push origin feature/your-feature-name

# 6. プルリクエスト作成
gh pr create --title "✨ 機能名を追加" --body "詳細な説明"
```

---

## 💻 コーディング規約

### HTML規約

```html
<!-- 良い例 -->
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ページタイトル</title>
</head>
<body>
    <main>
        <section class="hero-section">
            <h1 class="hero-title">タイトル</h1>
            <button id="actionBtn" class="btn btn-primary">
                アクション
            </button>
        </section>
    </main>
</body>
</html>
```

#### HTML規約詳細
- **インデント**: 4スペース
- **属性**: ダブルクォート使用
- **ID/Class**: kebab-case使用
- **セマンティックHTML**: 意味のあるタグを使用
- **アクセシビリティ**: alt属性、aria属性を適切に設定

### CSS規約

```css
/* 良い例 */
.hero-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.hero-title {
    font-size: 2.5rem;
    font-weight: 600;
    color: white;
    margin-bottom: 1rem;
    text-align: center;
}

/* レスポンシブ */
@media (max-width: 768px) {
    .hero-title {
        font-size: 2rem;
    }
}
```

#### CSS規約詳細
- **インデント**: 4スペース
- **命名**: BEM記法またはkebab-case
- **プロパティ順序**: 表示→位置→サイズ→色→その他
- **単位**: remを優先、pxは必要時のみ
- **コメント**: セクションごとに記載

### JavaScript規約

```javascript
// 良い例
const clickBtn = document.getElementById('clickBtn');
const statusDisplay = document.getElementById('status-display');

let clickCount = 0;
const clickHistory = [];

/**
 * ボタンクリック時の処理
 * @param {Event} event - クリックイベント
 */
function handleButtonClick(event) {
    clickCount++;
    
    const clickTime = getCurrentDateTime();
    const newHistoryItem = {
        count: clickCount,
        time: clickTime,
        message: getRandomMessage()
    };
    
    clickHistory.push(newHistoryItem);
    updateDisplay();
}

/**
 * 現在の日時を取得
 * @returns {string} フォーマットされた日時文字列
 */
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
```

#### JavaScript規約詳細
- **インデント**: 4スペース
- **命名**: camelCase使用
- **定数**: UPPER_SNAKE_CASE
- **関数**: 動詞で開始
- **コメント**: JSDoc形式
- **セミコロン**: 必須
- **クォート**: シングルクォート優先

---

## 📝 コミット規約

### コミットメッセージ形式

```
<絵文字> <種類>: <簡潔な説明>

<詳細な説明（必要に応じて）>

<フッター（必要に応じて）>
```

### 絵文字とタイプ一覧

| 絵文字 | タイプ | 説明 |
|--------|--------|------|
| ✨ | feat | 新機能追加 |
| 🐛 | fix | バグ修正 |
| 📝 | docs | ドキュメント更新 |
| 🎨 | style | コードスタイル変更 |
| ♻️ | refactor | リファクタリング |
| ⚡ | perf | パフォーマンス改善 |
| 🧪 | test | テスト追加・修正 |
| 🔧 | chore | ビルド・設定変更 |
| 🚀 | deploy | デプロイ関連 |
| 🔒 | security | セキュリティ修正 |

### コミット例

```bash
# 良い例
git commit -m "✨ feat: ダークモード機能を追加

- ライト/ダークモード切り替えボタンを実装
- ローカルストレージで設定を永続化
- 全セクションのダークモードスタイルを追加

Closes #15"

# 悪い例
git commit -m "update"
git commit -m "fix bug"
git commit -m "add new feature"
```

---

## 🔍 プルリクエスト規約

### プルリクエストタイトル

```
<絵文字> <簡潔な説明>
```

### プルリクエスト本文テンプレート

プルリクエスト作成時は、自動的に以下のテンプレートが適用されます：

```markdown
## 📋 変更内容の概要
この PR で何を変更したかを簡潔に説明してください。

## 🎯 関連する Issue
- Closes #(issue番号)

## 🔄 変更の種類
- [ ] 🐛 バグ修正
- [ ] ✨ 新機能
- [ ] 📝 ドキュメント更新

## 🧪 テスト方法
1. 
2. 
3. 

## 📷 スクリーンショット
<!-- 変更前後のスクリーンショットを添付 -->

## ✅ チェックリスト
- [ ] コードが正常に動作することを確認した
- [ ] コミットメッセージが規則に従っている
- [ ] 必要に応じてドキュメントを更新した
```

### プルリクエスト作成前チェックリスト

- [ ] ブランチ名が規約に従っている
- [ ] コミットメッセージが規約に従っている
- [ ] コードが動作することを確認済み
- [ ] 関連するIssueがある場合はリンクしている
- [ ] 必要に応じてドキュメントを更新している
- [ ] スクリーンショットを添付している（UI変更の場合）

---

## 👀 レビュー規約

### レビュアーの責任

1. **コードの品質確認**
   - 可読性
   - 保守性
   - パフォーマンス
   - セキュリティ

2. **規約の遵守確認**
   - コーディング規約
   - コミット規約
   - ブランチ命名規約

3. **機能の動作確認**
   - 期待通りの動作
   - エラーハンドリング
   - エッジケースの考慮

### レビューコメントの書き方

```markdown
# 良い例
## 🐛 バグの可能性
この部分で`null`の場合の処理が不足しているようです。
以下のような修正を提案します：

```javascript
if (element && element.textContent) {
    element.textContent = newText;
}
```

## 💡 改善提案
パフォーマンス向上のため、この処理をキャッシュすることを検討してください。

## ✅ 良い実装
この関数の実装は非常に読みやすく、適切にエラーハンドリングされています！
```

### レビュー承認基準

- [ ] コードが規約に従っている
- [ ] 機能が正常に動作する
- [ ] セキュリティ上の問題がない
- [ ] パフォーマンスに問題がない
- [ ] ドキュメントが適切に更新されている

---

## 📋 Issue管理

### Issue作成ガイドライン

#### バグ報告
- 再現手順を詳細に記載
- 期待する動作と実際の動作を明記
- 環境情報（OS、ブラウザ等）を記載
- スクリーンショットを添付

#### 機能要求
- 解決したい問題を明確に記載
- 提案する解決策を詳しく説明
- 実装の優先度を記載
- モックアップがあれば添付

### ラベル運用

| ラベル | 説明 | 色 |
|--------|------|-----|
| `bug` | バグ報告 | 🔴 |
| `enhancement` | 機能改善 | 🟢 |
| `feature` | 新機能 | 🔵 |
| `documentation` | ドキュメント | 📚 |
| `good first issue` | 初心者向け | 🟡 |
| `help wanted` | ヘルプ募集 | 🆘 |
| `priority: high` | 高優先度 | 🔥 |
| `priority: low` | 低優先度 | ❄️ |

### Issue割り当て

1. **自己割り当て**: 作業開始時に自分をアサイン
2. **期限設定**: 可能な限り完了予定日を設定
3. **進捗更新**: 定期的にコメントで進捗を報告
4. **完了報告**: 作業完了時にクローズ

---

## 🚨 緊急時の対応

### ホットフィックス手順

```bash
# 1. mainから緊急修正ブランチを作成
git checkout main
git pull upstream main
git checkout -b hotfix/critical-bug-fix

# 2. 修正作業
# ... 最小限の修正 ...

# 3. テスト
# ... 動作確認 ...

# 4. 緊急プッシュ
git add .
git commit -m "🚨 hotfix: 緊急バグ修正"
git push origin hotfix/critical-bug-fix

# 5. 緊急プルリクエスト
gh pr create --title "🚨 緊急バグ修正" --body "緊急度: 高"
```

### 緊急時の連絡体制

1. **Slack/Discord**: 即座に通知
2. **GitHub Issue**: 緊急ラベル付きで作成
3. **プルリクエスト**: 緊急レビュー依頼
4. **メール**: 必要に応じて関係者に連絡

---

## 📞 サポート・質問

### 質問する前に

1. **ドキュメントを確認**
   - README.md
   - CONTRIBUTING.md
   - このガイドライン

2. **既存のIssueを検索**
   - 同様の問題が報告されていないか確認

3. **コードを確認**
   - エラーメッセージを詳しく読む
   - デバッグ情報を収集

### 質問方法

1. **GitHub Issues**: 技術的な質問
2. **GitHub Discussions**: 一般的な議論
3. **プルリクエストコメント**: コードレビュー関連

---

## 🎯 まとめ

このガイドラインに従うことで：

- **一貫性のあるコード**が書ける
- **効率的なレビュー**ができる
- **スムーズな協力**が実現できる
- **高品質なプロダクト**が作れる

質問や改善提案があれば、いつでもIssueやDiscussionで相談してください！

---

**Happy Coding! 🚀** 