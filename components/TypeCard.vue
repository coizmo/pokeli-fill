<script setup lang="ts">
import { type PokeType } from "~/composables/usePokeType";

interface Props {
  isShow?: boolean;
  pokeType: PokeType | null;
  withBorder?: boolean;
  shorten?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  isShow: true,
  withBorder: true,
});

const classes = computed(() => {
  return [
    'p-1',
    'text-center',
    props.withBorder ? 'my-border' : '',
    props.shorten ? 'my-width-shorten' : 'my-width',
  ]
})

const displayName = computed(() => props.shorten ? props.pokeType?.shortName : props.pokeType?.name)
</script>

<template>
  <template v-if="!isShow || !pokeType">
    <small :class="classes">Rolling...</small>
  </template>
  <template v-else>
    <small
      class="rounded"
      :class="classes"
      :style="{ backgroundColor: `#${pokeType.color}` }"
    >
      {{ displayName }}
    </small>
  </template>
</template>

<style scoped>
.my-width {
  min-width: 80px;
  font-weight: 700;
}

.my-width-shorten {
  width: 32px;
  font-weight: 700;
}

.my-border {
  border: 1px solid #324252;
  border-radius: 4px;;
}
</style>
