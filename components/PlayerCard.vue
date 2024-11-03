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
  </div>
</template>
