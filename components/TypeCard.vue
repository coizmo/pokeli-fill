<script setup lang="ts">
import { type PokeType } from "~/composables/usePokeType";

interface Props {
  isShow?: boolean;
  pokeType: PokeType | null;
  withBorder?: boolean;
}
withDefaults(defineProps<Props>(), {
  isShow: true,
  withBorder: true,
});
</script>

<template>
  <template v-if="!isShow || !pokeType">
    <small class="my-width p-1 text-center" :class="withBorder ? 'my-border' : ''">Rolling...</small>
  </template>
  <template v-else>
    <small
      class="my-width p-1 text-center rounded"
       :class="withBorder ? 'my-border' : ''"
      :style="{ backgroundColor: `#${pokeType.color}` }"
    >
      {{ pokeType.name }}
    </small>
  </template>
</template>

<style scoped>
.my-width {
  min-width: 80px;
  font-weight: 700;
}

.my-border {
  border: 1px solid #324252;
  border-radius: 4px;;
}
</style>
