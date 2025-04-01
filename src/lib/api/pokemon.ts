export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonSprites {
  front_default: string;
  back_default: string;
}

export interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  sprites: PokemonSprites;
}

export interface PokemonListResponse {
  results: Array<{
    name: string;
    url: string;
  }>;
}

export async function fetchPokemonList(
  limit: number = 1100
): Promise<Pokemon[]> {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
    );

    if (!response.ok) {
      throw new Error("No se pudieron cargar los Pokémon");
    }

    const data: PokemonListResponse = await response.json();

    const pokemonDetails = await Promise.all(
      data.results.map(async (pokemon) => {
        const detailResponse = await fetch(pokemon.url);

        if (!detailResponse.ok) {
          throw new Error(`No se pudo cargar el detalle de ${pokemon.name}`);
        }

        return detailResponse.json() as Promise<Pokemon>;
      })
    );

    return pokemonDetails;
  } catch (error) {
    console.error("Error al cargar Pokémon:", error);
    throw error;
  }
}

export function filterPokemonByName(
  pokemonList: Pokemon[],
  searchTerm: string
): Pokemon[] {
  return pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

export function filterPokemonByType(
  pokemonList: Pokemon[],
  type: string
): Pokemon[] {
  const filtered = pokemonList.filter((pokemon)=>
    pokemon.types.some(
      (pokemonType) =>
        pokemonType.type.name.toLowerCase() === type.toLowerCase()
    )
  );
  return filtered.slice(0, 10);
}

export function getPokemonTypes(pokemonList: Pokemon[]): string[] {
  const types = new Set<string>();
  pokemonList.forEach((pokemon) => {
    pokemon.types.forEach((type) => {
      types.add(type.type.name.toLowerCase());
    });
  });
  return Array.from(types).sort();
}
