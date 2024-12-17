<script lang="ts" setup>
import "crypto";

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
  seed.value = parseInt(createHash(), 16);
}

function handleClickRoll() {
  resetAllResult();
}

const waitTimeBase = 200;
const waitTimeBetween = 150;
const waitTimePlayerGap = 1000;

function resetAllResult() {}

function handleClickTrainer() {
  trainers.value.push({
    name: "",
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
    },
  });
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
        <Button icon="pi pi-share-alt" @click="handleClickShareLink" />
      </div>

      <div class="flex flex-col gap-8">
        <div class="flex justify-center" v-for="(t, i) in trainers">
          <PlayerCard
            v-model:name="t.name"
            :properties="{
              seed,
              waitTimeBase: waitTimeBase + waitTimePlayerGap * i,
              waitTimeBetween,
            }"
            @on-delete="() => handleClickDeleteTrainer(i)"
          />
        </div>
      </div>

      <Button label="Add Trainer" @click="handleClickTrainer" />
    </div>
  </div>
</template>
