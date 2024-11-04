import fs from "fs";
import type { Pokemon, Result, Specy } from "./types";
import { disableSpecies } from "./disableSpecies";

const speciesDirs = ["species_31", "species_32", "species_33", "species_add"];
const pokemonsDirs = [
  "pokemons_31",
  "pokemons_32",
  "pokemons_33",
  "pokemons_add",
];
const dexes = {
  "31": { species: "species_31", pokemons: "pokemons_31" },
  "32": { species: "species_32", pokemons: "pokemons_32" },
  "33": { species: "species_33", pokemons: "pokemons_33" },
  add: { species: "species_add", pokemons: "pokemons_add" },
};

const generatedResult: Result[] = [];

Object.entries(dexes).forEach(([key, value]) => {
  const targetSpecies = value.species;
  const targetPokemons = value.pokemons;

  fs.readdirSync(`./${targetSpecies}/`).forEach((file) => {
    const data: Specy = require(`./${targetSpecies}/${file}`);
    const name = data.names.find((n) => n.language.name === "ja")?.name;
    if (!name) {
      return;
    }

    // 伝説・幻をスキップしたいが is_legendary フラグが思った感じじゃない
    if (data.is_mythical) {
      console.log(name + " is skipped because of their power.");
      return;
    }

    data.varieties.forEach((variety) => {
      const variety_name = variety.pokemon.name;
      const matcher = variety.pokemon.url.match(/([0-9]+)\/$/);
      if (!matcher || matcher.length !== 2) {
        return;
      }

      // メガ進化個体をスキップ
      if (variety_name.endsWith("-mega")) {
        console.log(`${variety_name} is skipped.`);
        return;
      }
      if (variety_name.endsWith("-mega-x")) {
        console.log(`${variety_name} is skipped.`);
        return;
      }
      if (variety_name.endsWith("-mega-y")) {
        console.log(`${variety_name} is skipped.`);
        return;
      }

      // ダイマ個体をスキップ
      if (variety_name.endsWith("-gmax")) {
        console.log(`${variety_name} is skipped.`);
        return;
      }

      // ヌシ個体をスキップ
      if (variety_name.match("[^-]+-totem(-[^-]+)?")) {
        console.log(`${variety_name} is skipped.`);
        return;
      }

      // 特別な個体をスキップ
      if (disableSpecies.includes(variety_name)) {
        console.log(`${variety_name} is skipped.`);
        return;
      }

      const pokeNo = Number.parseInt(matcher[1]);
      const pokemon: Pokemon = require(`./${targetPokemons}/${pokeNo}.json`);

      // 図鑑IDと姿が一致するレコードがすでに追加されていたら図鑑設定の追加のみとする
      const already_added = generatedResult.find(
        (r) => r.dexNo === data.id && r.form === variety_name
      );
      if (already_added) {
        already_added.dexes.push(key);

        // console.log(
        //   `dexNo: ${data.id}, ${name}${variety.is_default ? "" : `(${variety_name})`} is already added.`
        // );
        return;
      }

      const stats = [
        pokemon.stats.find((s) => s.stat.name === "hp")?.base_stat ?? 0,
        pokemon.stats.find((s) => s.stat.name === "attack")?.base_stat ?? 0,
        pokemon.stats.find((s) => s.stat.name === "defense")?.base_stat ?? 0,
        pokemon.stats.find((s) => s.stat.name === "special-attack")
          ?.base_stat ?? 0,
        pokemon.stats.find((s) => s.stat.name === "special-defense")
          ?.base_stat ?? 0,
        pokemon.stats.find((s) => s.stat.name === "speed")?.base_stat ?? 0,
      ];

      generatedResult.push({
        dexes: [key],
        dexNo: data.id,
        name: name,
        form: variety_name,
        types: pokemon.types.map((t) => t.type.name),
        stats: stats,
      });

      // console.log(
      //   `dexNo: ${data.id}, ${name}${variety.is_default ? "" : `(${variety_name})`}, ${pokemon.types
      //     .map((t) => t.type.name)
      //     .join(".")}`
      // );
    });
  });
});

generatedResult.sort((a, b) => a.dexNo - b.dexNo);

console.log("generate output file.");
fs.writeFileSync(`./output/pokedex.json`, JSON.stringify(generatedResult));
console.log("generate output file completed.");
