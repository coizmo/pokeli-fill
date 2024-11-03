<script setup lang="ts">
import { defineProps } from "vue";

import { type PokeType } from "~/composables/usePokeType";

interface Props {
  pokeType: PokeType | null;
}
defineProps<Props>();
</script>

<template>
  <template v-if="!pokeType">
    <div class="p-2">
       Rolling... 
    </div>
  </template>
  <template v-else>
    <div class="p-2" :style="{ backgroundColor: `#${pokeType.color}` }">
      {{ pokeType.name }}
    </div>
  </template>
</template>
