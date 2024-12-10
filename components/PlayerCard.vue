<script setup lang="ts">
import type { XorShift } from "~/composables/useXorShift";

interface Props {
  name?: string;
  properties: {
    xorshift: XorShift | null;
    waitTimeBase: number;
    waitTimeBetween: number;
  };
}
const props = defineProps<Props>();

interface Emits {
  (e: "update:name", name: string): void;
}
const emits = defineEmits<Emits>();

function handleUpdateName(v: string | undefined) {
  if (v !== undefined) {
    emits("update:name", v);
  }
}

type DPokeType = { fl: boolean; pt: null | PokeType };
const result = reactive<DPokeType[]>([
  { fl: false, pt: null },
  { fl: false, pt: null },
  { fl: false, pt: null },
  { fl: false, pt: null },
  { fl: false, pt: null },
]);

const roll = () => {
  return props.properties.xorshift?.randType() ?? null;
};

watch(
  () => props.properties.xorshift,
  () => {
    result[0] = { fl: false, pt: roll() };
    result[1] = { fl: false, pt: roll() };
    result[2] = { fl: false, pt: roll() };
    result[3] = { fl: false, pt: roll() };
    result[4] = { fl: false, pt: roll() };

    setTimeout(() => {
      result[0].fl = true;
    }, props.properties.waitTimeBase + props.properties.waitTimeBetween * 1);
    setTimeout(() => {
      result[1].fl = true;
    }, props.properties.waitTimeBase + props.properties.waitTimeBetween * 2);
    setTimeout(() => {
      result[2].fl = true;
    }, props.properties.waitTimeBase + props.properties.waitTimeBetween * 3);
    setTimeout(() => {
      result[3].fl = true;
    }, props.properties.waitTimeBase + props.properties.waitTimeBetween * 4);
    setTimeout(() => {
      result[4].fl = true;
    }, props.properties.waitTimeBase + props.properties.waitTimeBetween * 5);
  }
);

const isRolled = computed(() => {
  return result.every((t) => t.fl);
});

function handleClickMoveToDex() {
  const uniqueTypes = [...new Set(result.map((r) => r.pt))];
  const dottedTypes = uniqueTypes
    .map((t) => t?.code)
    .filter((t) => !!t)
    .sort()
    .join(".");

  return navigateTo(`/pokedex?types=${dottedTypes}`);
}
</script>

<template>
  <div class="flex flex-col gap-8">
    <InputText
      :model-value="props.name"
      placeholder="トレーナー名を入力"
      class="text-center"
      :style="{ minWidth: '120px', maxWidth: '320px' }"
      @update:model-value="handleUpdateName"
    ></InputText>

    <div class="flex flex-col gap-2">
      <template v-for="r in result" :key="r">
        <TypeCard :is-show="r.fl" :poke-type="r.pt"></TypeCard>
      </template>
    </div>

    <Button
      v-if="isRolled"
      icon="pi pi-book"
      label="図鑑に移動"
      @click="handleClickMoveToDex"
    />
  </div>
</template>
