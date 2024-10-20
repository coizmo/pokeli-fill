<script lang="ts" setup>
import pokedex from "../scripts/output/pokedex.json";

import { ref, computed } from "vue";

const selectedTypes = ref<{ name: string; code: string; color: string }[]>();
const types = ref([
  { name: "むし", code: "bug", color: "A8B820" },
  { name: "あく", code: "dark", color: "705848" },
  { name: "ドラゴン", code: "dragon", color: "7038F8" },
  { name: "でんき", code: "electric", color: "F8D030" },
  { name: "フェアリー", code: "fairy", color: "EE99AC" },
  { name: "かくとう", code: "fighting", color: "C03028" },
  { name: "ほのお", code: "fire", color: "F08030" },
  { name: "ひこう", code: "flying", color: "A890F0" },
  { name: "ゴースト", code: "ghost", color: "705898" },
  { name: "くさ", code: "grass", color: "78C850" },
  { name: "じめん", code: "ground", color: "E0C068" },
  { name: "こおり", code: "ice", color: "98D8D8" },
  { name: "ノーマル", code: "normal", color: "A8A878" },
  { name: "どく", code: "poison", color: "A040A0" },
  { name: "エスパー", code: "psychic", color: "F85888" },
  { name: "いわ", code: "rock", color: "B8A038" },
  { name: "はがね", code: "steel", color: "B8B8D0" },
  { name: "みず", code: "water", color: "6890F0" },
]);

function getTypeLabel(code: string) {
  return types.value.find((t) => t.code === code)?.name ?? "";
}
function getTypeColor(code: string) {
  return types.value.find((t) => t.code === code)?.color ?? "000000";
}

const items = [];

const usables = computed(() => {
  console.log(selectedTypes.value);
  const usableTypes = selectedTypes.value?.map((t) => t.code);
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
          v-model="selectedTypes"
          :options="types"
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
