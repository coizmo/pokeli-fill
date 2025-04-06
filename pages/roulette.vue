<script lang="ts" setup>
import "crypto";
import { useClipboard } from "@vueuse/core";

function getMode(): RandomMode {
  const [m] = useQueryParam("m");
  if (m === "xs" || m === "mt") {
    return m;
  }
  return "mt";
}
const mode = ref(getMode());

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
  }))
);

watchEffect(() => {
  mode.value = getMode();
  resetAllResult();
});

function handleChangeMode(value: RandomMode) {
  resetAllResult();
  mode.value = value;
}

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
      m: mode.value,
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
  });
}
function handleClickDeleteTrainer(targetIndex: number) {
  trainers.value = trainers.value.filter((_, i) => i !== targetIndex);
}

function handleClickShareLink() {
  useRouter().push({
    path: "/roulette",
    query: {
      m: mode.value,
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

const rollSummary = computed(() => {
  const typeSum = trainers.value.flatMap((v) => {
    return useRandom(mode.value).newResult(seed.value, v.name);
  });
  const typeSumNumOfTrainers = trainers.value.flatMap((v) => {
    return [...new Set(useRandom(mode.value).newResult(seed.value, v.name))];
  });
  return pokeTypes.map((t) => {
    return {
      type: t,
      num: typeSum.filter((typeS) => typeS.code === t.code).length,
      numOfTrainers: typeSumNumOfTrainers.filter(
        (typeS) => typeS.code === t.code
      ).length,
    };
  });
});
</script>

<template>
  <div class="bg-slate-400 h-dvh px-4 py-8 overflow-scroll">
    <div class="flex flex-col gap-8">
      <div class="flex justify-center gap-4">
        <InputNumber
          :model-value="seed"
          :useGrouping="false"
          @update:modelValue="handleChangeSeed"
        ></InputNumber>
        <Button label="Random Seed" @click="handleClickChangeSeed" />
        <Button label="Roll" @click="handleClickRoll" />
        <div class="flex gap-2 items-center">
          <span>乱数器</span>
          <SelectButton
            :model-value="mode"
            :options="['mt', 'xs']"
            :allow-empty="false"
            @update:model-value="handleChangeMode"
          />
        </div>
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
              mode,
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

      <Panel v-if="!trainers.some((t) => t.state !== 'displaying')">
        <template #header>
          出現したタイプの合計数／()内は被りを除いた人数
        </template>
        <div class="grid grid-cols-6 gap-4">
          <div class="flex flex-col md:flex-row gap-2" v-for="s in rollSummary">
            <TypeCard is-show :poke-type="s.type"></TypeCard>
            <span>x{{ s.num }}({{ s.numOfTrainers }})</span>
          </div>
        </div>
      </Panel>
    </div>
  </div>
</template>
