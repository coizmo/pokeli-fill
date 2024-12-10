<script setup lang="ts">
import type { XorShift } from '~/composables/useXorShift';

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

const result1 = ref<null | PokeType>(null);
const result2 = ref<null | PokeType>(null);
const result3 = ref<null | PokeType>(null);
const result4 = ref<null | PokeType>(null);
const result5 = ref<null | PokeType>(null);

watch(() => props.properties.xorshift, () => {
  result1.value = null
  result2.value = null
  result3.value = null
  result4.value = null
  result5.value = null

  const roll = () => {
    return props.properties.xorshift?.randType() ?? null;
  }

  setTimeout(() => {
    result1.value = roll()
  }, props.properties.waitTimeBase + props.properties.waitTimeBetween * 1);
  setTimeout(() => {
    result2.value = roll()
  }, props.properties.waitTimeBase + props.properties.waitTimeBetween * 2);
  setTimeout(() => {
    result3.value = roll()
  }, props.properties.waitTimeBase + props.properties.waitTimeBetween * 3);
  setTimeout(() => {
    result4.value = roll()
  }, props.properties.waitTimeBase + props.properties.waitTimeBetween * 4);
  setTimeout(() => {
    result5.value = roll()
  }, props.properties.waitTimeBase + props.properties.waitTimeBetween * 5);
})

const pokeTypes = computed(() => {
  return [result1.value, result2.value, result3.value, result4.value, result5.value]
})

const isRolled = computed(() => {
  return pokeTypes.value.every((t) => t !== null);
});

function handleClickMoveToDex() {
  const uniqueTypes = [...new Set(pokeTypes.value)]
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
      <template v-for="r in pokeTypes" :key="r">
        <TypeCard :poke-type="r"></TypeCard>
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
