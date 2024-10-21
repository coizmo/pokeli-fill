<script setup lang="ts">
import { PokeType } from "~/pages/roulette.vue";
import { defineProps } from "vue";

interface Props {
    pokeType: PokeType | null
}
defineProps<Props>()
</script>

<template>
  <template v-if="!pokeType">
    <Card><template #content> Rolling... </template></Card>
  </template>
  <template v-else>
    <Card :style="{ backgroundColor: `#${pokeType.color}` }">
      <template #content>{{ pokeType.name }}</template>
    </Card>
  </template>
</template>
