<script setup lang="ts">
import { PokeType } from "~/pages/roulette.vue";
import { defineProps } from "vue";

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
