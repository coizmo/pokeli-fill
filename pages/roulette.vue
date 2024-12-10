<script lang="ts" setup>
import "crypto";
import cryptoJs from "crypto-js";

import { pokeTypes } from "~/composables/usePokeType";
import type { XorShift } from "~/composables/useXorShift";

function getSeed(): number {
  const [s] = useQueryParam("s");
  return parseInt(s);
}

onBeforeMount(() => {
  const s = getSeed();
  if (!s || Number.isNaN(s)) {
    return useRouter().replace({
      path: "/roulette",
      query: {
        s: parseInt(createHash(), 16),
        t1: useQueryParam("t1")[0],
        t2: useQueryParam("t2")[0],
      },
    });
  }
});

const selectedTypes = ref<PokeType[]>();

const items = [];

function createHash() {
  return crypto.randomUUID().slice(0, 4);
}

const trainerName1 = ref(useQueryParam("t1")[0] ?? "");
const trainerName2 = ref(useQueryParam("t2")[0] ?? "");

const xs1 = ref<null | XorShift>(null);
const xs2 = ref<null | XorShift>(null);

const seed = ref(getSeed());

watchEffect(() => {
  seed.value = getSeed();
  trainerName1.value = useQueryParam("t1")[0];
  trainerName2.value = useQueryParam("t2")[0];
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

  xs1.value = useXorShift().newInstance(seed.value, trainerName1.value);
  xs2.value = useXorShift().newInstance(seed.value, trainerName2.value);
}

const waitTimeBase = 200;
const waitTimeBetween = 150;
const waitTimePlayerGap = 1000;

function resetAllResult() {
  xs1.value = null
  xs2.value = null
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
              xorshift: xs1,
              waitTimeBase: waitTimeBase + waitTimePlayerGap * 0,
              waitTimeBetween: waitTimeBetween,
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
              xorshift: xs2,
              waitTimeBase: waitTimeBase + waitTimePlayerGap * 1,
              waitTimeBetween: waitTimeBetween,
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>
