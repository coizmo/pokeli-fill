# Overview

この階層のスクリプトは上の階層と異なって bun で管理されています

## 実行の手引き

1. dex31.csv のようなファイルをビルドアップ
   1. `https://pokeapi.co/api/v2/generation/9` から version_groups 取得
   2. 取得データ (例: `https://pokeapi.co/api/v2/version-group/25/` ) から pokedexes 取得
   3. 取得データ (例: `https://pokeapi.co/api/v2/pokedex/31/` ) から species の name, url を取り出す
2. get_species.sh をまるでカイリキーのような筋肉で書き換えて実行する
3. get_pokemons.sh をオーベムのサイコパワーばりに書き換えて実行する
4. 色々揃った状態で bun run index.ts すると、3 回たくわえた後の勢いで output に　はきだす　される

# generator

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.0.26. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
