<script lang="ts" setup>
import pokedex from "../scripts/output/pokedex.json";
import s22out from "../scripts/output/s22out.json";
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

  const [f] = useQueryParam("f");
  const s22outCode = s22out.map((t) => t.code);

  const filtered = pokedex
    .filter((poke) => {
      return poke.types.every((t) => usableTypes.includes(t));
    })
    .filter((poke) => {
      if (f !== "s22out") {
        return true;
      }
      return s22outCode.includes(poke.form);
    })
    .sort((a, b) => {
      if (order.value === 0) return 1;
      return b.stats[order.value - 1] - a.stats[order.value - 1];
    });

  return filtered;
});

const displayMode = ref("list");
const order = ref(0);
const orders = ["Dex", "H", "A", "B", "C", "D", "S"];
function handleChangeOrder() {
  order.value = (order.value + 1) % orders.length;
}
</script>

<template>
  <div class="bg-slate-400 h-dvh p-12 overflow-scroll">
    <div class="flex-row gap-4">
      <div class="card flex justify-center gap-4">
        <MultiSelect
          v-model="selectedTypeCodes"
          :options="pokeTypes"
          optionValue="code"
          optionLabel="name"
          placeholder="Select Types"
          :maxSelectedLabels="3"
          class="w-full md:w-[20rem]"
        />
        <Button
          icon="pi pi-th-large"
          :outlined="displayMode === 'list'"
          :raised="displayMode !== 'list'"
          @click="displayMode = 'card'"
        />
        <Button
          icon="pi pi-list"
          :outlined="displayMode === 'card'"
          :raised="displayMode !== 'card'"
          @click="displayMode = 'list'"
        />
      </div>

      <div v-if="displayMode === 'card'" class="mt-4 grid grid-cols-3 gap-4">
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

      <div
        v-else-if="displayMode === 'list'"
        class="mt-4 grid grid-cols-3 gap-y-2"
      >
        <div class="py-4">名前</div>
        <div class="py-4">タイプ</div>
        <div class="">
          <Button
            class="w-20"
            :label="orders[order]"
            @click="handleChangeOrder"
          ></Button>
        </div>
        <template v-for="poke in usables" :key="`${poke.dexNo}_${poke.form}`">
          <span>{{ poke.name }}</span>
          <div class="text-nowrap">
            <Chip
              :style="{ backgroundColor: `#${getTypeColor(poke.types[0])}` }"
              :label="getTypeLabel(poke.types[0])"
            ></Chip>
            <Chip
              v-if="poke.types.length === 2"
              :style="{ backgroundColor: `#${getTypeColor(poke.types[1])}` }"
              :label="getTypeLabel(poke.types[1])"
            ></Chip>
          </div>
          <div calss="text-nowrap">
            <div
              v-for="stat in poke.stats"
              class="inline-block w-8 align-end text-end"
            >
              {{ stat }}
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
