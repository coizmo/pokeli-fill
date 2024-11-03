<script lang="ts" setup>
import "crypto";

import { pokeTypes } from "~/composables/usePokeType";

const selectedTypes = ref<PokeType[]>();

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
    return pokeTypes[min + (r % (max + 1 - min))];
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
        <InputNumber
          v-model="seed"
          :useGrouping="false"
          @change="handleChangeSeed"
        ></InputNumber>
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
