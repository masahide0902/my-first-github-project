# 🤝 コントリビューションガイド

このプロジェクトへの貢献を歓迎します！以下のガイドラインに従って開発にご参加ください。

## 📋 開発ワークフロー

### 1. リポジトリのフォーク・クローン
```bash
# リポジトリをフォーク（GitHub上で）
# その後、ローカルにクローン
git clone https://github.com/YOUR_USERNAME/my-first-github-project.git
cd my-first-github-project

# 元のリポジトリをupstreamとして追加
git remote add upstream https://github.com/masahide0902/my-first-github-project.git
```

### 2. 新機能開発の流れ
```bash
# 最新のmainブランチを取得
git checkout main
git pull upstream main

# 新しいブランチを作成
git checkout -b feature/your-feature-name

# 開発作業...
# ファイルを編集

# 変更をコミット
git add .
git commit -m "✨ 新機能: 機能の説明"

# 自分のフォークにプッシュ
git push origin feature/your-feature-name

# プルリクエストを作成（GitHub上で）
```

## 🌿 ブランチ命名規則

- `feature/機能名` - 新機能追加
- `fix/修正内容` - バグ修正
- `docs/更新内容` - ドキュメント更新
- `style/変更内容` - スタイル・デザイン変更
- `refactor/変更内容` - リファクタリング

## 📝 コミットメッセージ規則

以下の形式でコミットメッセージを書いてください：

```
絵文字 種類: 簡潔な説明

詳細な説明（必要に応じて）
```

### 絵文字の使い分け
- ✨ `:sparkles:` - 新機能
- 🐛 `:bug:` - バグ修正
- 📝 `:memo:` - ドキュメント
- 🎨 `:art:` - UI/スタイル改善
- ⚡ `:zap:` - パフォーマンス改善
- 🔧 `:wrench:` - 設定変更
- 🧪 `:test_tube:` - テスト追加

## 🔍 プルリクエストガイドライン

### プルリクエスト作成時
1. **明確なタイトル**をつける
2. **変更内容の説明**を詳しく書く
3. **テスト方法**を記載する
4. **スクリーンショット**を添付（UI変更の場合）

### レビュー時の注意点
- 建設的なフィードバックを心がける
- コードの品質と可読性を重視
- セキュリティ面も考慮する

## 🚀 開発環境のセットアップ

### 必要なツール
- Git
- GitHub CLI (`gh`)
- モダンなブラウザ
- テキストエディタ（VS Code推奨）

### ローカル開発
```bash
# プロジェクトディレクトリに移動
cd my-first-github-project

# ブラウザでindex.htmlを開いて動作確認
open index.html  # macOS
# または
start index.html  # Windows
```

## 📋 Issue管理

### Issue作成時
- **明確なタイトル**
- **再現手順**（バグの場合）
- **期待する動作**
- **実際の動作**
- **環境情報**

### ラベルの使い分け
- `bug` - バグ報告
- `enhancement` - 機能改善
- `feature` - 新機能提案
- `documentation` - ドキュメント関連
- `good first issue` - 初心者向け
- `help wanted` - ヘルプ募集

## 🤝 コミュニティガイドライン

1. **尊重** - すべての参加者を尊重する
2. **建設的** - 建設的な議論を心がける
3. **協力的** - チームワークを大切にする
4. **学習** - 互いに学び合う姿勢を持つ

## 📞 連絡先

質問や提案がある場合は、以下の方法でご連絡ください：
- GitHub Issues
- プルリクエストのコメント
- ディスカッション機能

---
ご協力ありがとうございます！🎉 