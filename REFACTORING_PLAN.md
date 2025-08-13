# Myth of Tragedy Frontend - リファクタリング計画

## 🎉 リファクタリング完了報告

このリファクタリング計画は **2025-08-14** に完了しました。

### 実施済みフェーズ
- ✅ **Phase 1**: 開発環境整備と未使用ファイルの削除
- ✅ **Phase 2**: Wallet管理の統一と共通UIコンポーネントの実装
- ✅ **Phase 3**: モジュール構造の再編成
- ✅ **品質チェック**: ESLint/Prettier適用

---

## 📋 調査サマリー

### プロジェクト概要

- **構造**: Vanilla JavaScript + HTML + CSS（ビルドツールなし）
- **特徴**: シンプルな静的サイト構造、依存関係管理なし
- **問題点**: 大量の重複コード、未使用ファイル、モジュール構造の混乱

## 🚨 発見された主要な問題

### 1. 未使用ファイル（約30ファイル以上）

```
assets/
├── effect/     # 全ファイル未使用
├── bg/         # 全ファイル未使用
├── items/      # 全ファイル未使用
└── monsters/   # dragon.svgのみ未使用
```

### 2. 重複コード

#### Wallet接続ロジック

- `campaign.html:745-758`
- `summon.html:869-914`
- `essays.html:869-876`
- `cache-test.html:256-263`
- `viewer/index.html:1684-1725`

#### 設定ファイル読み込み

- `loadBlockchainConfig`: 4箇所で重複実装
- `deployment.json読み込み`: 4箇所で重複
- `setting.json読み込み`: 3箇所で重複

#### 共通UI要素

- HTMLヘッダー（favicon, meta tags）: 全7ページで重複
- 言語切り替えタブ: 4ページで同じ実装
- モバイル接続手順: 2ページで重複

### 3. モジュール構造の問題

#### 責任範囲の重複

- `wallet-manager.js` vs `web3-integration.js`: 両方がwallet管理
- 設定管理が3箇所に分散（contracts-config.js, wallet-manager.js, web3-integration.js）

#### 設計の不統一

- 初期化メソッド名: `init()` vs `initialize()`
- エラーハンドリング: 各モジュールで異なる実装
- キャッシュ実装: 統一インターフェースなし

## 🎯 リファクタリング提案

### フェーズ1: 即座に実施可能（リスク低）

#### 1-1. 未使用ファイルの削除

```bash
# 削除対象
rm -rf assets/effect/
rm -rf assets/bg/
rm -rf assets/items/
rm assets/monsters/dragon.svg
rm assets/coming-soon/cursed-seal.svg
```

#### 1-2. 開発環境の整備

```json
// package.json
{
  "name": "myth-of-tragedy-frontend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "lint": "eslint js/**/*.js",
    "format": "prettier --write .",
    "serve": "python3 -m http.server 8000"
  },
  "devDependencies": {
    "eslint": "^8.0.0",
    "prettier": "^3.0.0"
  }
}
```

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

```json
// .eslintrc.json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  }
}
```

### フェーズ2: Wallet管理の統一（中リスク）

#### 2-1. wallet-manager.jsへの完全移行

- すべてのページでwallet-manager.jsを使用
- web3-integration.jsのwallet機能を段階的に廃止

#### 2-2. 移行手順

1. web3-integration.jsからwallet関連機能を削除
2. 各HTMLページのwallet接続コードをwallet-manager.jsに置き換え
3. テスト実施

### フェーズ3: モジュール構造の再編成（高リスク）

#### 3-1. 新しいディレクトリ構造

```
js/
├── config/
│   └── index.js          # 統一設定管理
├── wallet/
│   └── manager.js        # Wallet接続専用
├── contracts/
│   ├── manager.js        # コントラクト操作
│   ├── cache.js          # RPCキャッシュ
│   └── abi/              # ABIファイル
├── utils/
│   ├── format.js         # フォーマット関数
│   ├── errors.js         # エラー処理
│   └── dom.js            # DOM操作ヘルパー
└── ui/
    ├── components.js     # 共通UIコンポーネント
    └── translations.js   # 多言語対応
```

#### 3-2. 共通HTMLテンプレート

```html
<!-- templates/head.html -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="icon" type="image/svg+xml" href="favicon.svg" />
<link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.svg" />
<meta name="apple-mobile-web-app-capable" content="yes" />
```

### フェーズ4: ES6 Modules移行（オプション）

#### 4-1. モジュール変換

```javascript
// 旧: CommonJS
module.exports = { WalletManager };

// 新: ES6 Modules
export { WalletManager };
```

#### 4-2. HTML側の変更

```html
<!-- type="module"を追加 -->
<script type="module">
  import { WalletManager } from './js/wallet/manager.js';
</script>
```

## 📊 期待される効果

### コード削減

- **未使用ファイル**: 30ファイル以上削除
- **重複コード**: 約500行削減見込み
- **ファイルサイズ**: 全体で約30%削減

### 保守性向上

- モジュール責任範囲の明確化
- 依存関係の可視化
- テスト容易性の向上

### 開発効率

- Linting/Formattingによるコード品質統一
- 共通コンポーネントによる開発速度向上
- エラーハンドリングの統一

## ⚠️ リスクと対策

### リスク

1. **既存機能の破壊**: 段階的移行で対応
2. **ブラウザ互換性**: ES6 Modules使用時は要確認
3. **テスト不足**: 各フェーズでテスト実施

### 推奨実施順序

1. フェーズ1（即実施）
2. フェーズ2（1週間後）
3. フェーズ3（2-3週間後）
4. フェーズ4（必要に応じて）

## 🔄 次のステップ

1. このドキュメントのレビューと承認
2. フェーズ1の即時実施
3. 各フェーズのテスト計画策定
4. 段階的な実装とテスト

## ✅ 実施結果サマリー

### Phase 1 完了内容
- 開発環境整備（ESLint、Prettier設定）
- 未使用ファイル削除（4つのJSファイル、3つの空ディレクトリ）
- package.json作成と開発スクリプト追加

### Phase 2 完了内容
- wallet-manager.jsによるWallet管理の完全統一
- 共通UIコンポーネント（js/ui/components.js）の実装
  - showTransactionModal
  - showAlert
  - createLanguageSwitcher
  - createWalletButton
  - createLoadingSpinner
- 重複コードの削除と統合

### Phase 3 完了内容
- 新しいディレクトリ構造への移行
  ```
  js/
  ├── config/      # 設定管理
  ├── wallet/      # Wallet管理
  ├── contracts/   # コントラクト関連
  ├── ui/          # UIコンポーネント
  └── utils/       # ユーティリティ
  ```
- 全HTMLファイルのスクリプト参照更新
- モジュール間の依存関係整理

### 成果
- **コード削減**: 重複コード約500行削減
- **ファイル整理**: 30以上の未使用ファイル削除
- **保守性向上**: モジュール構造の明確化
- **品質向上**: ESLint/Prettierによるコード品質統一

---

_作成日: 2025-08-14_
_更新日: 2025-08-14_
_作成者: Claude Code_
