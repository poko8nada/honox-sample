# MVP実装タスク (tasks-mvp.md)

## Phase 1: HonoX 基礎機能の実装

### Task 1: 動的ルーティングとタグ巻き上げの実装

- [ ] `app/routes/posts/[id].tsx` - パスパラメータの取得と `<title>` タグの定義 **(FR-02)**

**依存関係**: なし
**成果物**: `/posts/123` でアクセス時にIDが表示され、ブラウザのタブ名が動的に変わるページ
**完了条件**: ブラウザでアクセスし、IDが画面とタブタイトルに反映されていること
**テスト**: 手動確認

### Task 2: APIルートの作成

- [ ] `app/routes/api/hello.ts` - JSONレスポンスを返すハンドラの実装 **(FR-03)**

**依存関係**: なし
**成果物**: `/api/hello` でJSONデータが返るエンドポイント
**完了条件**: ブラウザまたは `curl` でアクセスし、期待したJSONが返ること
**テスト**: 手動確認

### Task 3: Islandsアーキテクチャの応用 ($コンポーネント)

- [ ] `app/routes/posts/$post-like.tsx` - `$` プレフィックスを用いたIslandの作成 **(FR-04)**
- [ ] `app/routes/posts/[id].tsx` - 作成したIslandをページにインポートして組み込む

**依存関係**: Task 1
**成果物**: 投稿詳細ページに「いいね」ボタンが配置され、クライアントサイドで動作する機能
**完了条件**: ブラウザ上でボタンが反応し、カウントがインクリメントされること
**テスト**: 手動確認

---

## Phase 2: 検証・最適化 (Validation & Optimization)

### Task 4: アセット管理とハイドレーションの最適化

- [ ] `app/routes/_renderer.tsx` - `Script` と `Link` コンポーネントへの移行 **(FR-01)**
- [ ] ブラウザの開発者ツールで、Islandが含まれないページでJSがロードされていないことを確認

**依存関係**: Phase 1 完了
**完了条件**: `Script` コンポーネントが適切に機能し、不要なJS配信が抑制されていること

---

## チェックリスト（完了確認）

### 機能確認

- [ ] `/posts/[id]` ページで動的なIDが表示される
- [ ] `/api/hello` からJSONが返却される
- [ ] `post-like` Islandがクライアントサイドで動作する

### アーキテクチャ確認

- [ ] `honox/factory` の `createRoute` を使用してハンドラが定義されている
- [ ] Islandsコンポーネントが `app/islands/` または `$` プレフィックス付きで配置されている
- [ ] `<title>` や `<meta>` タグがルートコンポーネント内で直接定義（巻き上げ）されている
- [ ] `app/routes/_renderer.tsx` で `honox/server` の `Script` / `Link` が使用されている
