<script lang="ts" setup>
import pokedex from "../scripts/output/pokedex.json";
import { pokeTypes, type PokeType } from "~/composables/usePokeType";

const { getTypeLabel, getTypeColor } = usePokeType();

const selectedTypeCodes = ref<string[]>(
  useQueryParam("types").length
    ? useQueryParam("types")
    : pokeTypes.map((t) => t.code)
);

const items = [];

const usables = computed(() => {
  const usableTypes = selectedTypeCodes.value;
  if (!usableTypes) {
    return [];
  }

  const filtered = pokedex.filter((poke) => {
    return poke.types.every((t) => usableTypes.includes(t));
  });

  return filtered;
});
</script>

<template>
  <div class="bg-slate-400 h-dvh p-12 overflow-scroll">
    <div class="flex-row gap-4">
      <div class="card flex justify-center">
        <MultiSelect
          v-model="selectedTypeCodes"
          :options="pokeTypes"
          optionValue="code"
          optionLabel="name"
          placeholder="Select Types"
          :maxSelectedLabels="3"
          class="w-full md:w-[20rem]"
        />
      </div>

      <div class="mt-4 grid grid-cols-3 gap-4">
        <template v-for="poke in usables" :key="`${poke.dexNo}_${poke.form}`">
          <Card>
            <template #title> {{ poke.name }} </template>
            <template #subtitle> {{ poke.form }} </template>
            <template #content>
              <Chip
                :style="{ backgroundColor: `#${getTypeColor(poke.types[0])}` }"
                :label="getTypeLabel(poke.types[0])"
              ></Chip>
              <Chip
                v-if="poke.types.length === 2"
                class="ml-4"
                :style="{ backgroundColor: `#${getTypeColor(poke.types[1])}` }"
                :label="getTypeLabel(poke.types[1])"
              ></Chip>
            </template>
          </Card>
        </template>
      </div>
    </div>
  </div>
</template>
