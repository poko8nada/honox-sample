# HonoX 学習プロジェクト 要件定義書 (requirement.md)

## 1. 概要 (Overview)

本プロジェクトは、Honoベースのメタフレームワークである「HonoX」の主要機能をステップバイステップで学習することを目的としたハンズオンプロジェクトである。

フェーズ1（MVP）では、HonoXの標準的な構成要素であるファイルベースルーティング、Islandsアーキテクチャ、SSRを理解するための最小構成を構築する。

### 1.1. プロジェクト基本情報

- **サービス名**
  - HonoX Learning Sandbox
- **目的**
  - HonoXのコアコンセプト（Vite統合、Islands、JSX Renderer、Middleware）の習得
- **ターゲット**
  - HonoXを初めて触れる開発者

### 1.2. HonoX の技術的特徴

HonoXは、Hono、Vite、およびUIライブラリ（hono/jsx等）の上に構築された高速なフルスタックWebフレームワークである。

- **File-based Routing**: `app/routes` ディレクトリの構造に基づいて自動的にルーティングを生成。
- **Islands Architecture**: ページ全体ではなく、インタラクティブな要素が必要な部分（Island）のみをクライアントサイドでハイドレーションし、JavaScriptの配信量を最小化する。
- **BYOR (Bring Your Own Renderer)**: デフォルトの `hono/jsx` 以外にも、好みのレンダラーを使用可能。
- **Vite Integration**: 開発時のHMR（Hot Module Replacement）や本番ビルドの最適化にViteをフル活用。
- **Middleware Support**: Honoの豊富なミドルウェアエコシステムをそのまま利用可能。
- **Zero JS by Default**: Islandsが含まれないページでは、クライアントサイドへのJavaScript配信を完全に行わない（`Script` コンポーネントによる最適化）。
- **Tag Hoisting**: React 19のように、コンポーネントツリー内のどこからでも `<title>` や `<meta>` タグを head に「巻き上げる」ことが可能。

---

## 2. 技術スタック (Technology Stack)

### MVP

- **フレームワーク**: HonoX
- **ランタイム**: Cloudflare Workers (Wrangler)
- **レンダラー**: hono/jsx (hono/jsx-renderer)
- **スタイリング**: Tailwind CSS v4
- **パッケージマネージャ**: pnpm
- **開発ツール**: Vite, Biome

---

## 3. 機能要件 (Functional Requirements)

### 3.1. ルーティングとレンダリング

**FR-01: `app/routes/_renderer.tsx` (既存・拡張)**

- **要件**: アプリケーション全体のレイアウトとクライアントサイドスクリプトの読み込み。
- **詳細**: `honox/server` の `Script` と `Link` コンポーネントを使用し、Viteのマニフェストに基づいた適切なアセット読み込みを行う。また、Islandsが存在しないページでは自動的にJSの配信がスキップされる。

**FR-02: `app/routes/posts/[id].tsx` (新規)**

- **要件**: 動的ルーティングとメタデータ巻き上げの学習。
- **詳細**: パスパラメータ `id` を取得し表示する。また、`hono/jsx` のタグ巻き上げ機能を使用して、ルート内で `<title>` や `<meta>` タグを直接定義する。
- **テスト観点**: 任意のIDでアクセスした際に正しく表示され、HTMLの `<head>` 内に指定したタイトルが反映されていること。

**FR-03: `app/routes/api/hello.ts` (新規)**

- **要件**: APIルートの作成。
- **詳細**: JSONレスポンスを返すAPIエンドポイント。Honoの標準的なハンドラ記述を確認。

### 3.2. インタラクティブ要素 (Islands)

**FR-04: `app/routes/posts/$post-like.tsx` (新規)**

- **要件**: 新しいIsland配置パターン（`$` プレフィックス）の学習。
- **詳細**: ファイル名に `$` を付けることで、`app/islands/` 以外（ルーティングフォルダ内など）に配置されたコンポーネントをIslandとして認識させる。「いいね」ボタンを実装。
- **テスト観点**: クライアントサイドでJSがハイドレーションされ、ボタンが動作すること。

---

## 4. 非機能要件 (Non-Functional Requirements)

**NFR-01: パフォーマンス**

- `Script` コンポーネントによる、Islands不使用ページでのJS配信ゼロ化を確認。

**NFR-02: 開発体験**

- Viteによる高速なHMR（Hot Module Replacement）の維持。

**NFR-03: テスタビリティ**

- Honoの `app.request()` を使用したルーティングのテストが可能であること。

---

## 5. ディレクトリ構成と作成ファイル (Directory Structure & Files)

### 5.1. フェーズ1: MVP実装時のディレクトリ構成

```
honox-sample/
├─ app/
│  ├─ islands/
│  │  └─ counter.tsx           # 既存: カウンター
│  ├─ routes/
│  │  ├─ api/
│  │  │  └─ hello.ts           # FR-03: JSON API
│  │  ├─ posts/
│  │  │  ├─ [id].tsx           # FR-02: 動的パス
│  │  │  └─ $post-like.tsx      # FR-04: 新しいIsland配置（$付与）
│  │  ├─ _renderer.tsx         # FR-01: 共通レイアウト（Script/Link使用）
│  │  └─ index.tsx             # トップページ
│  ├─ client.ts                # クライアントエントリ
│  └─ server.ts                # サーバーエントリ
├─ docs/
│  └─ requirement.md           # 本ドキュメント
└─ package.json
```

---

## 6. 画面設計 (Screen Design)

### 6.1. 画面一覧 (Screen List)

| No  | 画面名           | URLパス      | 機能概要                          |
| --- | ---------------- | ------------ | --------------------------------- |
| 001 | ホーム           | `/`          | カウンターIslandのデモ            |
| 002 | 投稿詳細(ダミー) | `/posts/:id` | パスパラメータの表示とLike Island |
| 003 | APIハロー        | `/api/hello` | JSONレスポンスの確認              |

---

## 7. 備考・参考資料 (Notes & References)

- [最近のHonoX (Zenn)](https://zenn.dev/yusukebe/articles/4d6297f3be121a) - $component, Script/Link, Tag Hoistingについての解説
- [HonoX GitHub Repository](https://github.com/honojs/honox)
- [Hono Documentation](https://hono.dev/)
