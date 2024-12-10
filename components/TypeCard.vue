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
    <div class="p-2 text-center">Rolling...</div>
  </template>
  <template v-else>
    <div
      class="p-2 text-center rounded"
      :style="{ backgroundColor: `#${pokeType.color}` }"
    >
      {{ pokeType.name }}
    </div>
  </template>
</template>
