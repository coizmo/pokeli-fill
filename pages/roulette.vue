<script lang="ts" setup>
import "crypto";
import { useClipboard } from "@vueuse/core";

function getSeed(): number {
  const [s] = useQueryParam("s");
  return parseInt(s);
}
const seed = ref(getSeed());

onBeforeMount(() => {
  const s = getSeed();
  if (!s || Number.isNaN(s)) {
    return useRouter().replace({
      path: "/roulette",
      query: {
        s: parseInt(createHash(), 16),
      },
    });
  }
});

function createHash() {
  return crypto.randomUUID().slice(0, 4);
}

const trainers = ref(
  useQueryParam("t").map((v) => ({
    name: v,
    state:
      useQueryParam("is-show")[0] === "true"
        ? "displaying"
        : ("waiting" as "waiting" | "rolling" | "displaying"),
    xorshift: useXorShift().newInstance(seed.value),
  }))
);

watchEffect(() => {
  seed.value = getSeed();
  resetAllResult();
});

function handleChangeSeed(value: number) {
  resetAllResult();
  seed.value = value;
}

function handleClickChangeSeed() {
  resetAllResult();
  trainers.value.forEach((t) => {
    t.state = "waiting";
  });
  seed.value = parseInt(createHash(), 16);
}

function handleClickRoll() {
  resetAllResult();
  trainers.value.forEach((t) => {
    t.state = "rolling";
  });
  useRouter().push({
    path: "/roulette",
    query: {
      s: seed.value,
      t: trainers.value.map((t) => t.name),
    },
  });
}

const waitTimeBase = 200;
const waitTimeBetween = 150;
const waitTimePlayerGap = 1000;

function resetAllResult() {}

function handleClickAddTrainer() {
  trainers.value.push({
    name: "",
    state: "waiting",
    xorshift: useXorShift().newInstance(seed.value),
  });
}
function handleClickDeleteTrainer(targetIndex: number) {
  trainers.value = trainers.value.filter((_, i) => i !== targetIndex);
}

function handleClickShareLink() {
  useRouter().push({
    path: "/roulette",
    query: {
      s: seed.value,
      t: trainers.value.map((t) => t.name),
      "is-show": "true",
    },
  });
  useClipboard().copy(useRequestURL().href);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2500);
}
const copied = ref(false);
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
        <div class="flex-grow"></div>
        <Button
          :icon="copied ? 'pi pi-check' : 'pi pi-link'"
          label="Copy URL"
          @click="handleClickShareLink"
        />
      </div>

      <div class="flex flex-col gap-4 items-center">
        <template v-for="(t, i) in trainers">
          <PlayerCard
            v-model:name="t.name"
            v-model:state="t.state"
            :properties="{
              seed,
              waitTimeBase: waitTimeBase + waitTimePlayerGap * i,
              waitTimeBetween,
            }"
            @on-delete="() => handleClickDeleteTrainer(i)"
          />
        </template>
      </div>

      <div class="flex flex-col items-center">
        <Button
          icon="pi pi-plus"
          label="Add Trainer"
          @click="handleClickAddTrainer"
        />
      </div>
    </div>
  </div>
</template>
