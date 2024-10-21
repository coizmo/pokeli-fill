<script lang="ts" setup>
import pokedex from "../scripts/output/pokedex.json";

import { ref, computed } from "vue";
import "crypto";

export type PokeType = {
  name: string;
  code: string;
  color: string;
};
const selectedTypes = ref<PokeType[]>();
const types: PokeType[] = [
  { name: "むし", code: "bug", color: "A8B820" },
  { name: "あく", code: "dark", color: "705848" },
  { name: "ドラゴン", code: "dragon", color: "7038F8" },
  { name: "でんき", code: "electric", color: "F8D030" },
  { name: "フェアリー", code: "fairy", color: "EE99AC" },
  { name: "かくとう", code: "fighting", color: "C03028" },
  { name: "ほのお", code: "fire", color: "F08030" },
  { name: "ひこう", code: "flying", color: "A890F0" },
  { name: "ゴースト", code: "ghost", color: "705898" },
  { name: "くさ", code: "grass", color: "78C850" },
  { name: "じめん", code: "ground", color: "E0C068" },
  { name: "こおり", code: "ice", color: "98D8D8" },
  { name: "ノーマル", code: "normal", color: "A8A878" },
  { name: "どく", code: "poison", color: "A040A0" },
  { name: "エスパー", code: "psychic", color: "F85888" },
  { name: "いわ", code: "rock", color: "B8A038" },
  { name: "はがね", code: "steel", color: "B8B8D0" },
  { name: "みず", code: "water", color: "6890F0" },
];

function getTypeLabel(code: string) {
  return types.find((t) => t.code === code)?.name ?? "";
}
function getTypeColor(code: string) {
  return types.find((t) => t.code === code)?.color ?? "000000";
}

const items = [];

function createHash() {
  return crypto.randomUUID().slice(0, 8);
}
const seed = ref(parseInt(createHash(), 16));

function handleChangeSeed() {
  resetAllResult();
}

function handleClickChangeSeed() {
  resetAllResult();
  seed.value = parseInt(createHash(), 16);
}

function handleClickRoll() {
  resetAllResult();
  const xs = new XorShift(seed.value);

  setTimeout(() => {
    result1.value = xs.randType();
  }, 1000);
  setTimeout(() => {
    result2.value = xs.randType();
  }, 1200);
  setTimeout(() => {
    result3.value = xs.randType();
  }, 1400);
  setTimeout(() => {
    result4.value = xs.randType();
  }, 1600);
  setTimeout(() => {
    result5.value = xs.randType();
  }, 1800);

  setTimeout(() => {
    result1B.value = xs.randType();
  }, 2000);
  setTimeout(() => {
    result2B.value = xs.randType();
  }, 2200);
  setTimeout(() => {
    result3B.value = xs.randType();
  }, 2400);
  setTimeout(() => {
    result4B.value = xs.randType();
  }, 2600);
  setTimeout(() => {
    result5B.value = xs.randType();
  }, 2800);
}

class XorShift {
  _x: number;
  _y: number;
  _z: number;
  _current: number;
  constructor(seed = 1) {
    // 任意のxyz
    this._x = 827416273;
    this._y = 826162312;
    this._z = 172331274;
    this._current = seed;
  }
  rand() {
    let t = this._x ^ (this._x << 11);
    this._x = this._y;
    this._y = this._z;
    this._z = this._current;
    this._current = this._current ^ (this._current >>> 19) ^ (t ^ (t >>> 8));
    return this._current;
  }
  randType(): PokeType {
    const min = 0;
    const max = 17;
    const r = Math.abs(this.rand());
    return types[min + (r % (max + 1 - min))];
  }
}

const result1 = ref<null | PokeType>(null);
const result2 = ref<null | PokeType>(null);
const result3 = ref<null | PokeType>(null);
const result4 = ref<null | PokeType>(null);
const result5 = ref<null | PokeType>(null);

const result1B = ref<null | PokeType>(null);
const result2B = ref<null | PokeType>(null);
const result3B = ref<null | PokeType>(null);
const result4B = ref<null | PokeType>(null);
const result5B = ref<null | PokeType>(null);

function resetAllResult() {
  result1.value = null;
  result2.value = null;
  result3.value = null;
  result4.value = null;
  result5.value = null;
  result1B.value = null;
  result2B.value = null;
  result3B.value = null;
  result4B.value = null;
  result5B.value = null;
}
</script>

<template>
  <div class="bg-slate-400 h-dvh px-4 py-8 overflow-scroll">
    <div class="flex flex-col gap-8">
      <div class="flex justify-center gap-2">
        <InputText v-model="seed" @change="handleChangeSeed"></InputText>
        <Button label="Change Seed" @click="handleClickChangeSeed" />
      </div>
      <div class="flex justify-center gap-2">
        <Button label="Roll" @click="handleClickRoll" />
      </div>

      <div class="grid grid-cols-5">
        <div class="col-span-2 grid grid-rows-5 gap-4">
          <template
            v-for="r in [result1, result2, result3, result4, result5]"
            :key="r"
          >
            <TypeCard :poke-type="r"></TypeCard>
          </template>
        </div>

        <div class="flex justify-center">
          <Chip>VS</Chip>
        </div>

        <div class="col-span-2 grid grid-rows-5 gap-4">
          <template
            v-for="r in [result1B, result2B, result3B, result4B, result5B]"
            :key="r"
          >
            <TypeCard :poke-type="r"></TypeCard>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
