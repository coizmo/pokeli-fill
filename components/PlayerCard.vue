<script setup lang="ts">
interface Props {
  properties: {
    pokeTypes: (PokeType | null)[];
  };
}
const props = defineProps<Props>();
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col gap-2">
      <template v-for="r in props.properties.pokeTypes" :key="r">
        <TypeCard :poke-type="r"></TypeCard>
      </template>
    </div>
  </div>
</template>
