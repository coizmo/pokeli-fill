export interface NameUrl {
  name: string;
  url: string;
}

export interface FlavorText {
  flavor_text: string;
  language: NameUrl;
  version: NameUrl;
}

export interface Genera {
  genus: string;
  language: NameUrl;
}

export interface Variety {
  is_default: boolean;
  pokemon: NameUrl;
}

export type Specy = {
  base_happiness: number;
  capture_rate: number;
  color: NameUrl;
  egg_groups: NameUrl[];
  evolution_chain: {
    url: string;
  };
  evolves_from_species: NameUrl;
  flavor_text_entries: FlavorText[];
  form_descriptions: any[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: Genera[];
  generation: NameUrl;
  growth_rate: NameUrl;
  habitat: null;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: {
    language: NameUrl;
    name: string;
  }[];
  order: number;
  pal_park_encounters: any[];
  pokedex_numbers: {
    entry_number: number;
    pokedex: NameUrl;
  }[];
  shape: null;
  varieties: Variety[];
};

export type Ability = {
  ability: NameUrl;
  is_hidden: boolean;
  slot: number;
};
export type GameIndex = {
  game_index: number;
  version: NameUrl;
}
export type Move = any;
export type Sprites = any;
export type Stat = {
  base_stat: number;
  effort: number;
  stat: NameUrl;
};
export type PokemonType = {
  slot: string;
  type: NameUrl;
};

// Pokemon
export type Pokemon = {
  abilities: Ability[];
  base_experience: null;
  cries: {
    latest: string;
    legacy: string | null;
  };
  forms: NameUrl[];
  game_indices: any[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_abilities: any[];
  past_types: any[];
  species: NameUrl;
  sprites: Sprites;
  stats: Stat[];
  types: PokemonType[];
  weight: number;
};


// Output
export type Result = {
  dexes: string[];
  dexNo: number;
  name: string;
  form: string;
  types: string[];
};
