# Technical Standards for The Mythical Cursed-Nightmare

## 依存関係のバージョン管理

### Ethers.js
**必須バージョン: v6.9.0**

すべてのHTMLファイルで以下のCDNリンクを使用してください：
```html
<script src="https://cdn.jsdelivr.net/npm/ethers@6.9.0/dist/ethers.umd.min.js"></script>
```

**理由**: 
- `web3-integration.js`がethers v6の新しいAPIを使用
- v5とv6では破壊的変更があるため混在不可

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
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title - The Mythical Cursed-Nightmare</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <!-- コンテンツ -->
    
    <!-- Scripts - 必ずこの順序で読み込む -->
    <script src="https://cdn.jsdelivr.net/npm/ethers@6.9.0/dist/ethers.umd.min.js"></script>
    <script src="js/contracts-config.js"></script>
    <script src="js/rpc-cache.js"></script>
    <script src="js/web3-integration.js"></script>
    <!-- ページ固有のスクリプト -->
</body>
</html>
```

### スクリプト読み込み順序
1. **ethers.js** - Web3ライブラリ（必須: v6.9.0）
2. **contracts-config.js** - コントラクト設定
3. **rpc-cache.js** - RPCキャッシュ（オプション）
4. **web3-integration.js** - Web3統合
5. ページ固有のスクリプト

## 更新履歴
- 2025-08-08: 初版作成、Ethers.js v6.9.0を標準に設定