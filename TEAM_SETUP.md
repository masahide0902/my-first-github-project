# 🚀 チーム開発クイックスタートガイド

新しいチームメンバーが素早く開発に参加できるためのガイドです。

## ⚡ 5分でスタート

### 1. 事前準備（初回のみ）

```bash
# Git設定
git config --global user.name "あなたの名前"
git config --global user.email "your.email@example.com"

# GitHub CLI インストール（macOS）
brew install gh

# GitHub CLI 認証
gh auth login
```

### 2. プロジェクトセットアップ

```bash
# 1. リポジトリをフォーク（GitHub上で Fork ボタンをクリック）

# 2. ローカルにクローン
git clone https://github.com/YOUR_USERNAME/my-first-github-project.git
cd my-first-github-project

# 3. 元リポジトリを upstream として追加
git remote add upstream https://github.com/masahide0902/my-first-github-project.git

# 4. 動作確認
open index.html  # ブラウザでページが開けばOK
```

### 3. 開発開始

```bash
# 1. 最新版を取得
git checkout main
git pull upstream main

# 2. 新しいブランチを作成
git checkout -b feature/your-feature-name

# 3. 開発作業
# ... ファイルを編集 ...

# 4. 変更をコミット
git add .
git commit -m "✨ feat: 新機能を追加"

# 5. プッシュ
git push origin feature/your-feature-name

# 6. プルリクエスト作成
gh pr create --title "✨ 新機能を追加" --body "機能の説明"
```

## 📋 開発ルール（重要）

### ✅ やること
- [ ] ブランチ名は `feature/機能名` 形式
- [ ] コミットメッセージは絵文字付き
- [ ] プルリクエスト前に動作確認
- [ ] レビュー後にマージ

### ❌ やらないこと
- [ ] `main` ブランチに直接プッシュ
- [ ] 他人のブランチを勝手に変更
- [ ] テストなしでプルリクエスト作成

## 🎯 よく使うコマンド

```bash
# 現在のブランチ確認
git branch

# ブランチ切り替え
git checkout branch-name

# 変更状況確認
git status

# 変更差分確認
git diff

# コミット履歴確認
git log --oneline

# プルリクエスト一覧
gh pr list

# Issue一覧
gh issue list
```

## 🆘 困ったときは

### よくある問題と解決方法

#### 1. プッシュできない
```bash
# 最新版を取得してリベース
git fetch upstream
git rebase upstream/main
git push origin your-branch-name --force-with-lease
```

#### 2. コンフリクトが発生
```bash
# コンフリクトファイルを手動で修正後
git add .
git rebase --continue
```

#### 3. 間違ったコミット
```bash
# 最後のコミットを修正
git commit --amend -m "正しいメッセージ"

# コミットを取り消し（変更は保持）
git reset --soft HEAD~1
```

### 質問・相談先
1. **GitHub Issues** - バグ報告・機能要求
2. **プルリクエストコメント** - コードレビュー
3. **Slack/Discord** - 即座の質問
4. **開発ガイドライン** - 詳細なルール確認

## 🎉 開発の流れ例

### 新機能開発の例
```bash
# 1. Issue確認
gh issue view 5

# 2. ブランチ作成
git checkout -b feature/add-search-function

# 3. 開発
# ... コーディング ...

# 4. テスト
open index.html  # 動作確認

# 5. コミット
git add .
git commit -m "✨ feat: 検索機能を追加 - Closes #5"

# 6. プッシュ
git push origin feature/add-search-function

# 7. プルリクエスト
gh pr create --title "✨ 検索機能を追加" --body "Issue #5 の検索機能を実装しました"

# 8. レビュー待ち → マージ → ブランチ削除
```

## 📚 参考資料

- [開発ガイドライン](DEVELOPMENT_GUIDELINES.md) - 詳細なルール
- [コントリビューションガイド](CONTRIBUTING.md) - 貢献方法
- [README](README.md) - プロジェクト概要

---

**質問があれば遠慮なく聞いてください！チーム開発を楽しみましょう！🚀**
