<script setup lang="ts">
interface Props {
  name?: string;
  state: "waiting" | "rolling" | "displaying";
  properties: {
    mode: RandomMode;
    seed: number;
    waitTimeBase: number;
    waitTimeBetween: number;
  };
}
const props = defineProps<Props>();

const randResult = computed(() => {
  return useRandom(props.properties.mode).newResult(props.properties.seed, props.name);
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

const isShowTypes = reactive<boolean[]>([false, false, false, false, false]);

function rollAll() {
  setTimeout(() => {
    isShowTypes[0] = true;
  }, props.properties.waitTimeBase + props.properties.waitTimeBetween * 1);
  setTimeout(() => {
    isShowTypes[1] = true;
  }, props.properties.waitTimeBase + props.properties.waitTimeBetween * 2);
  setTimeout(() => {
    isShowTypes[2] = true;
  }, props.properties.waitTimeBase + props.properties.waitTimeBetween * 3);
  setTimeout(() => {
    isShowTypes[3] = true;
  }, props.properties.waitTimeBase + props.properties.waitTimeBetween * 4);
  setTimeout(() => {
    isShowTypes[4] = true;
    emits("update:state", "displaying");
  }, props.properties.waitTimeBase + props.properties.waitTimeBetween * 5);
}

function setIsShowTypes(v: boolean) {
  isShowTypes[0] = v;
  isShowTypes[1] = v;
  isShowTypes[2] = v;
  isShowTypes[3] = v;
  isShowTypes[4] = v;
}

watch(
  () => props.properties.mode,
  () => emits("update:state", "waiting")
);
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
        setIsShowTypes(false);
        break;
        case "rolling":
        setIsShowTypes(false);
        rollAll();
        break;
      case "displaying":
        setIsShowTypes(true);
        break;
    }
  }
);
onMounted(() => {
  if (props.state === "displaying") {
    setIsShowTypes(true);
  }
});

const isRolled = computed(() => {
  return isShowTypes.every((t) => t)
});

function handleClickMoveToDex() {
  const uniqueTypes = [...new Set(randResult.value)];
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
          :style="{ minWidth: '80px', maxWidth: '320px' }"
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
      <template v-for="(showType, i) in isShowTypes" :key="i">
        <TypeCard :is-show="showType" :poke-type="randResult[i]"></TypeCard>
      </template>
    </div>
  </Panel>
</template>
