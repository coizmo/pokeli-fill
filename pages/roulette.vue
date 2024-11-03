<script lang="ts" setup>
import "crypto";

import { pokeTypes } from "~/composables/usePokeType";

function getSeed(): number {
  const [s] = useQueryParam("s");
  return parseInt(s);
}

onBeforeMount(() => {
  const s = getSeed();
  if (!s || Number.isNaN(s)) {
    return useRouter().replace({
      path: "/roulette",
      query: { s: parseInt(createHash(), 16) },
    });
  }
});

const selectedTypes = ref<PokeType[]>();

const items = [];

function createHash() {
  return crypto.randomUUID().slice(0, 8);
}

const trainerName1 = ref(useQueryParam("t1")[0] ?? "");
const trainerName2 = ref(useQueryParam("t2")[0] ?? "");

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

const seed = ref(getSeed());

watchEffect(() => {
  seed.value = getSeed();
  trainerName1.value = useQueryParam("t1")[0]
  trainerName2.value = useQueryParam("t2")[0]
  resetAllResult();
});

function handleChangeSeed(value: number) {
  resetAllResult();
  seed.value = value;
}

function handleClickChangeSeed() {
  resetAllResult();
  seed.value = parseInt(createHash(), 16);
}

function handleClickRoll() {
  resetAllResult();
  useRouter().push({
    path: "/roulette",
    query: {
      s: seed.value,
      t1: trainerName1.value,
      t2: trainerName2.value,
    },
  });

  const xs = new XorShift(seed.value);

  const waitTimeBase = 200;
  const waitTimeBetween = 50;

  setTimeout(() => {
    result1.value = xs.randType();
  }, waitTimeBase + waitTimeBetween * 1);
  setTimeout(() => {
    result2.value = xs.randType();
  }, waitTimeBase + waitTimeBetween * 2);
  setTimeout(() => {
    result3.value = xs.randType();
  }, waitTimeBase + waitTimeBetween * 3);
  setTimeout(() => {
    result4.value = xs.randType();
  }, waitTimeBase + waitTimeBetween * 4);
  setTimeout(() => {
    result5.value = xs.randType();
  }, waitTimeBase + waitTimeBetween * 5);

  setTimeout(() => {
    result1B.value = xs.randType();
  }, waitTimeBase + waitTimeBetween * 6);
  setTimeout(() => {
    result2B.value = xs.randType();
  }, waitTimeBase + waitTimeBetween * 7);
  setTimeout(() => {
    result3B.value = xs.randType();
  }, waitTimeBase + waitTimeBetween * 8);
  setTimeout(() => {
    result4B.value = xs.randType();
  }, waitTimeBase + waitTimeBetween * 9);
  setTimeout(() => {
    result5B.value = xs.randType();
  }, waitTimeBase + waitTimeBetween * 10);
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
          :model-value="seed"
          :useGrouping="false"
          @update:modelValue="handleChangeSeed"
        ></InputNumber>
        <Button label="Random Seed" @click="handleClickChangeSeed" />
        <Button label="Roll" @click="handleClickRoll" />
      </div>

      <div class="flex flex-row gap-4">
        <div class="flex-grow flex justify-end">
          <PlayerCard
            v-model:name="trainerName1"
            :properties="{
              pokeTypes: [result1, result2, result3, result4, result5],
            }"
          />
        </div>

        <div class="hidden sm:block flex-none justify-center">
          <Chip class="h-11 rounded-md">VS</Chip>
        </div>

        <div class="flex-grow flex justify-start">
          <PlayerCard
            v-model:name="trainerName2"
            :properties="{
              pokeTypes: [result1B, result2B, result3B, result4B, result5B],
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>
