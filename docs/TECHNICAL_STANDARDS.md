# Technical Standards for The Mythical Cursed-Nightmare

## 依存関係のバージョン管理

### Ethers.js

**統一バージョン: v5.7.2**

プロジェクト全体でEthers.js v5.7.2に統一されています：

```html
<script src="https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.umd.min.js"></script>
```

**理由**:
- 安定性と互換性の確保
- 既存コードとの整合性
- WalletManagerとContractManagerがv5向けに最適化されている

### その他のライブラリ

現在、外部ライブラリはEthers.jsのみを使用しています。
新しいライブラリを追加する場合は、このドキュメントを更新してください。

## コーディング規約

### HTMLテンプレート

新しいページを作成する際は、以下のテンプレートを使用してください：

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page Title - The Mythical Cursed-Nightmare</title>
    <link rel="stylesheet" href="css/styles.css" />
  </head>
  <body>
    <!-- コンテンツ -->

    <!-- Scripts - 必ずこの順序で読み込む -->
    <script src="https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.umd.min.js"></script>
    <script src="js/config/contracts.js"></script>
    <script src="js/utils/format.js"></script>
    <script src="js/wallet/manager.js"></script>
    <script src="js/contracts/manager.js"></script>
    <script src="js/contracts/web3-integration.js"></script>
    <script src="js/ui/components.js"></script>
    <!-- ページ固有のスクリプト -->
  </body>
</html>
```

### スクリプト読み込み順序

1. **ethers.js** - Web3ライブラリ（v5.7.2推奨）
2. **js/config/contracts.js** - コントラクト設定（グローバル変数CONTRACTS_CONFIGを定義）
3. **js/utils/format.js** - フォーマット用ユーティリティ
4. **js/wallet/manager.js** - Wallet管理（WalletManagerクラス）
5. **js/contracts/manager.js** - コントラクト管理（ContractManagerクラス）
6. **js/contracts/web3-integration.js** - Web3統合レイヤー
7. **js/ui/components.js** - 共通UIコンポーネント
8. ページ固有のスクリプト

## ディレクトリ構造

```
js/
├── config/        # 設定管理
│   └── contracts.js
├── wallet/        # Wallet管理
│   └── manager.js
├── contracts/     # コントラクト関連
│   ├── manager.js
│   ├── web3-integration.js
│   └── cache.js
├── ui/           # UIコンポーネント
│   ├── components.js
│   ├── translations.js
│   └── campaign-translations.js
└── utils/        # ユーティリティ
    └── format.js
```

## 開発環境

### 必須ツール
- Node.js（開発ツール用）
- ESLint（コード品質）
- Prettier（コード整形）

### 開発コマンド
```bash
npm install    # 依存関係のインストール
npm run lint   # コード品質チェック
npm run format # コード整形
npm run serve  # ローカルサーバー起動
```

## 更新履歴

- 2025-08-14: モジュール構造の再編成、ディレクトリ構造の更新、Ethers.js v5.7.2に統一
- 2025-08-08: 初版作成
