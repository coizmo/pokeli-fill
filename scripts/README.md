# Overview

この階層のスクリプトは上の階層と異なって bun で管理されています

## 実行の手引き

1. dex31.csv のようなファイルをビルドアップ
   1. `https://pokeapi.co/api/v2/generation/9` から version_groups 取得
   2. 取得データ (例: `https://pokeapi.co/api/v2/version-group/25/` ) から pokedexes 取得
   3. 取得データ (例: `https://pokeapi.co/api/v2/pokedex/31/` ) から species の name, url を取り出す
2. get_species.sh <対象の図鑑番号(dex31.csvの場合31)> を実行する
3. get_pokemons.sh <対象の図鑑番号(dex31.csvの場合31)> を実行する
4. 色々揃った状態で bun run index.ts を実行する

## Dexに乗っていないキャラクターの追加方法

- dexadd.csv に対象キャラクターを追加
- 追加するデータは、 `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0` から確認できるURL内のspeciesを確認する
- 英語名は頑張る

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
