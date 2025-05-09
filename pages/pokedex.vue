<script lang="ts" setup>
import pokedex from "../scripts/output/pokedex.json";
import s22out from "../scripts/output/s22out.json";
import s23out from "../scripts/output/s23out.json";
import {
  pokeTypesOrdered as pokeTypes,
  type PokeType,
} from "~/composables/usePokeType";

const { getType, getTypeLabel, getTypeColor } = usePokeType();

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
  const s23outCode = s23out.map((t) => t.code);

  const filtered = pokedex
    .filter((poke) => {
      if (completelyIncluded.value) {
        return poke.types.every((t) => usableTypes.includes(t));
      } else {
        return poke.types.some((t) => usableTypes.includes(t));
      }
    })
    .filter((poke) => {
      if (f === "s22out") {
        return s22outCode.includes(poke.form);
      }
      if (f === "s23out") {
        return s23outCode.includes(poke.form);
      }
      return true;
    })
    .sort((a, b) => {
      if (order.value === 0) return 1;
      if (order.value === 7) {
        return (
          b.stats.reduce((ra, rb) => ra + rb, 0) -
          a.stats.reduce((ra, rb) => ra + rb, 0)
        );
      }
      return b.stats[order.value - 1] - a.stats[order.value - 1];
    });

  return filtered;
});

const displayMode = ref("list");
const order = ref(0);
const orders = ["Dex", "H", "A", "B", "C", "D", "S", "ALL"];
function handleChangeOrder(o?: string) {
  if (o && orders.includes(o)) {
    order.value = orders.findIndex((order) => order === o);
  } else {
    order.value = (order.value + 1) % orders.length;
  }
}

const completelyIncluded = ref(true);
</script>

<template>
  <div class="bg-slate-400 h-dvh p-12 overflow-scroll">
    <div class="flex-row gap-4">
      <div class="card flex flex-col sm:flex-row justify-center gap-2">
        <MultiSelect
          v-model="selectedTypeCodes"
          :options="pokeTypes"
          optionValue="code"
          optionLabel="name"
          placeholder="Select Types"
          :maxSelectedLabels="5"
          class="w-full md:w-[20rem]"
        />
        <div class="flex justify-center gap-2">
          <div class="flex items-center gap-2">
            <Checkbox
              v-model="completelyIncluded"
              inputId="completelyIncludedInput"
              binary
            />
            <label for="completelyIncludedInput" class="text-no-wrap">
              完全に含む
            </label>
          </div>
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
        class="mt-4 justify-self-center grid sm:grid-cols-[20px_180px_160px_200px_20px] grid-cols-[20px_100px_60px_160px_20px] gap-y-2 sm:gap-x-4 gap-x-2"
      >
        <Button
          style="width: 28px; height: 40px; font-size: small; padding: 12px"
          :label="`No\n▼`"
          @click="() => handleChangeOrder('Dex')"
        ></Button>
        <div class="py-2">名前</div>
        <div class="py-2">タイプ</div>
        <div class="">
          <div class="grid grid-cols-6 align-center">
            <template
              v-for="stat in ['H', 'A', 'B', 'C', 'D', 'S']"
              class="w-8 align-center text-center"
            >
              <Button
                class="px-0"
                style="
                  width: 28px;
                  height: 40px;
                  font-size: small;
                  padding: 12px;
                "
                :label="`${stat}\n▼`"
                @click="() => handleChangeOrder(stat)"
              ></Button>
            </template>
          </div>
        </div>
        <Button
          style="width: 16px; height: 40px; font-size: small"
          :label="`all\n▼`"
          @click="() => handleChangeOrder('ALL')"
        ></Button>
        <template v-for="poke in usables" :key="`${poke.dexNo}_${poke.form}`">
          <small>{{ poke.dexNo }}</small>
          <span class="flex flex-col">
            {{ poke.name }}
            <small class="ml-1 -mt-1">{{ poke.form }}</small>
          </span>
          <div class="text-nowrap">
            <div class="grid grid-cols-2 gap-x-1 sm:gap-x-2">
              <!-- タイプ1 -->
              <TypeCard
                class="block sm:hidden"
                :poke-type="getType(poke.types[0]) ?? null"
                :with-border="false"
                shorten
              />
              <TypeCard
                class="hidden sm:block"
                :poke-type="getType(poke.types[0]) ?? null"
                :with-border="false"
              />
              <!-- タイプ2 -->
              <template v-if="poke.types[1]">
                <TypeCard
                  v-if="poke.types[1]"
                  class="block sm:hidden"
                  :poke-type="getType(poke.types[1]) ?? null"
                  :with-border="false"
                  shorten
                />
                <TypeCard
                  v-if="poke.types[1]"
                  class="hidden sm:block"
                  :poke-type="getType(poke.types[1]) ?? null"
                  :with-border="false"
                />
              </template>
            </div>
          </div>
          <div class="text-nowrap">
            <div class="grid grid-cols-6 align-center">
              <span
                v-for="stat in poke.stats"
                class="w-8 align-center text-center"
              >
                {{ stat }}
              </span>
            </div>
          </div>
          <span>
            {{
              poke.stats.reduce((prev: number, curr: number) => prev + curr, 0)
            }}
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-no-wrap {
  white-space: nowrap;
}
</style>
