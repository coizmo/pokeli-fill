export interface PokeType {
  name: string;
  code: string;
  color: string;
};

export const pokeTypes: PokeType[] = [
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
];

export const pokeTypesOrdered: PokeType[] = [
  { name: "ノーマル", code: "normal", color: "A8A878" },
  { name: "ほのお", code: "fire", color: "F08030" },
  { name: "みず", code: "water", color: "6890F0" },
  { name: "でんき", code: "electric", color: "F8D030" },
  { name: "くさ", code: "grass", color: "78C850" },
  { name: "こおり", code: "ice", color: "98D8D8" },
  { name: "かくとう", code: "fighting", color: "C03028" },
  { name: "どく", code: "poison", color: "A040A0" },
  { name: "じめん", code: "ground", color: "E0C068" },
  { name: "ひこう", code: "flying", color: "A890F0" },
  { name: "エスパー", code: "psychic", color: "F85888" },
  { name: "むし", code: "bug", color: "A8B820" },
  { name: "いわ", code: "rock", color: "B8A038" },
  { name: "ゴースト", code: "ghost", color: "705898" },
  { name: "ドラゴン", code: "dragon", color: "7038F8" },
  { name: "あく", code: "dark", color: "705848" },
  { name: "はがね", code: "steel", color: "B8B8D0" },
  { name: "フェアリー", code: "fairy", color: "EE99AC" },
]


export const usePokeType = () => {
  const getType = (code: string) => {
    return pokeTypes.find((t) => t.code === code)
  }

  const getTypeLabel = (code: string) => {
    return getType(code)?.name ?? "";
  }
  
  const getTypeColor = (code: string) => {
    return getType(code)?.color ?? "000000";
  }

  return {
    getType,
    getTypeLabel,
    getTypeColor,
  }
};
