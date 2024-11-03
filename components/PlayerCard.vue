<script setup lang="ts">
interface Props {
  name: string;
  properties: {
    pokeTypes: (PokeType | null)[];
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

const isRolled = computed(() => {
  return props.properties.pokeTypes.every((t) => t !== null);
});

function handleClickMoveToDex() {
  const uniqueTypes = [...new Set(props.properties.pokeTypes)]
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
      class="text-center"
      :style="{ minWidth: '120px', maxWidth: '320px' }"
      @update:model-value="handleUpdateName"
    ></InputText>

    <div class="flex flex-col gap-2">
      <template v-for="r in props.properties.pokeTypes" :key="r">
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
