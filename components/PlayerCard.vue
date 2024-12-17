<script setup lang="ts">
interface Props {
  name?: string;
  properties: {
    seed: number;
    waitTimeBase: number;
    waitTimeBetween: number;
  };
}
const props = defineProps<Props>();

const xorshift = computed(() => {
  if (props.name) {
    return useXorShift().newInstance(props.properties.seed, props.name);
  } else {
    return null;
  }
});

interface Emits {
  (e: "update:name", name: string): void;
  (e: "on-delete"): void;
}
const emits = defineEmits<Emits>();

function handleUpdateName(v: string | undefined) {
  if (v !== undefined) {
    emits("update:name", v);
  }
}

const isFocused = ref(false);
function handleFocusIn() {
  isFocused.value = true;
}
function handleFocusOut() {
  isFocused.value = false;
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
  return xorshift.value?.randType() ?? null;
};

function rollAll() {
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

watch(
  () => props.properties.seed,
  () => rollAll()
);
watch(
  () => props.name,
  () => rollAll()
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

function handleClickDelete() {
  emits("on-delete");
}
</script>

<template>
  <Panel>
    <template #header>
      <div class="flex items-center gap-2">
        <InputText
          :model-value="props.name"
          placeholder="トレーナー名を入力"
          class="text-center"
          :style="{ minWidth: '120px', maxWidth: '320px' }"
          @update:model-value="handleUpdateName"
          @focusin="handleFocusIn"
          @focusout="handleFocusOut"
        ></InputText>
      </div>
    </template>

    <template #icons>
      <Button
        icon="pi pi-book"
        severity="secondary"
        text
        :disabled="!isRolled"
        @click="handleClickMoveToDex"
      />
      <Button
        icon="pi pi-trash"
        severity="secondary"
        text
        @click="handleClickDelete"
      />
    </template>

    <div class="flex flex-row gap-2">
      <template v-for="r in result" :key="r">
        <TypeCard :is-show="r.fl" :poke-type="r.pt"></TypeCard>
      </template>
    </div>
  </Panel>
</template>
