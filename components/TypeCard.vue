<script setup lang="ts">
import { type PokeType } from "~/composables/usePokeType";

interface Props {
  isShow: boolean;
  pokeType: PokeType | null;
}
defineProps<Props>();
</script>

<template>
  <template v-if="!isShow || !pokeType">
    <small class="my-width p-2 text-center">Rolling...</small>
  </template>
  <template v-else>
    <small
      class="my-width p-2 text-center rounded"
      :style="{ backgroundColor: `#${pokeType.color}` }"
    >
      {{ pokeType.name }}
    </small>
  </template>
</template>

<style scoped>
.my-width {
  min-width: 96px;
  font-weight: 700;
  border: 1px solid #324252;
  border-radius: 4px;;
}
</style>
