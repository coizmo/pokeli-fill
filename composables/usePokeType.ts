export interface PokeType {
  name: string;
  shortName: string;
  code: string;
  color: string;
};

export const pokeTypes: PokeType[] = [
  { name: "むし", shortName: "虫", code: "bug", color: "A8B820" },
  { name: "あく", shortName: "悪", code: "dark", color: "705848" },
  { name: "ドラゴン", shortName: "龍", code: "dragon", color: "7038F8" },
  { name: "でんき", shortName: "電", code: "electric", color: "F8D030" },
  { name: "フェアリー", shortName: "妖", code: "fairy", color: "EE99AC" },
  { name: "かくとう", shortName: "闘", code: "fighting", color: "C03028" },
  { name: "ほのお", shortName: "炎", code: "fire", color: "F08030" },
  { name: "ひこう", shortName: "飛", code: "flying", color: "A890F0" },
  { name: "ゴースト", shortName: "霊", code: "ghost", color: "705898" },
  { name: "くさ", shortName: "草", code: "grass", color: "78C850" },
  { name: "じめん", shortName: "地", code: "ground", color: "E0C068" },
  { name: "こおり", shortName: "氷", code: "ice", color: "98D8D8" },
  { name: "ノーマル", shortName: "ノ", code: "normal", color: "A8A878" },
  { name: "どく", shortName: "毒", code: "poison", color: "A040A0" },
  { name: "エスパー", shortName: "超", code: "psychic", color: "F85888" },
  { name: "いわ", shortName: "岩", code: "rock", color: "B8A038" },
  { name: "はがね", shortName: "鋼", code: "steel", color: "B8B8D0" },
  { name: "みず", shortName: "水", code: "water", color: "6890F0" },
];

export const pokeTypesOrdered: PokeType[] = [
  { name: "ノーマル", shortName: "ノ", code: "normal", color: "A8A878" },
  { name: "ほのお", shortName: "炎", code: "fire", color: "F08030" },
  { name: "みず", shortName: "水", code: "water", color: "6890F0" },
  { name: "でんき", shortName: "電", code: "electric", color: "F8D030" },
  { name: "くさ", shortName: "草", code: "grass", color: "78C850" },
  { name: "こおり", shortName: "氷", code: "ice", color: "98D8D8" },
  { name: "かくとう", shortName: "闘", code: "fighting", color: "C03028" },
  { name: "どく", shortName: "毒", code: "poison", color: "A040A0" },
  { name: "じめん", shortName: "地", code: "ground", color: "E0C068" },
  { name: "ひこう", shortName: "飛", code: "flying", color: "A890F0" },
  { name: "エスパー", shortName: "超", code: "psychic", color: "F85888" },
  { name: "むし", shortName: "虫", code: "bug", color: "A8B820" },
  { name: "いわ", shortName: "岩", code: "rock", color: "B8A038" },
  { name: "ゴースト", shortName: "霊", code: "ghost", color: "705898" },
  { name: "ドラゴン", shortName: "龍", code: "dragon", color: "7038F8" },
  { name: "あく", shortName: "悪", code: "dark", color: "705848" },
  { name: "はがね", shortName: "鋼", code: "steel", color: "B8B8D0" },
  { name: "フェアリー", shortName: "妖", code: "fairy", color: "EE99AC" },
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
