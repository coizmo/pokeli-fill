<script setup lang="ts">
interface Props {
  name?: string;
  state: "waiting" | "rolling" | "displaying";
  properties: {
    seed: number;
    waitTimeBase: number;
    waitTimeBetween: number;
  };
}
const props = defineProps<Props>();

const randResult = computed(() => {
  return useXorShift().newResult(props.properties.seed, props.name);
});

interface Emits {
  (e: "update:name", name: string): void;
  (e: "update:state", state: string): void;
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

function rollAll() {
  result[0] = { fl: false, pt: randResult.value[0] };
  result[1] = { fl: false, pt: randResult.value[1] };
  result[2] = { fl: false, pt: randResult.value[2] };
  result[3] = { fl: false, pt: randResult.value[3] };
  result[4] = { fl: false, pt: randResult.value[4] };

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
    emits("update:state", "displaying");
  }, props.properties.waitTimeBase + props.properties.waitTimeBetween * 5);
}

function displayAll(v: boolean) {
  result[0].fl = v;
  result[1].fl = v;
  result[2].fl = v;
  result[3].fl = v;
  result[4].fl = v;
}

watch(
  () => props.properties.seed,
  () => emits("update:state", "waiting")
);
watch(
  () => props.name,
  () => emits("update:state", "waiting")
);
watch(
  () => props.state,
  () => {
    switch (props.state) {
      case "waiting":
        displayAll(false);
        break;
      case "rolling":
        rollAll();
        break;
      case "displaying":
        displayAll(true);
        break;
    }
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
