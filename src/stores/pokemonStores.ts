// src/stores/pokemonStore.ts
import { writable } from "svelte/store";
import type { Pokemon } from "../lib/api/pokemon";
import {
  fetchPokemonList,
  filterPokemonByName,
  filterPokemonByType,
  getPokemonTypes,
} from "../lib/api/pokemon";

// Definición del tipo de estado
export interface PokemonStoreState {
  originalList: Pokemon[];
  filteredList: Pokemon[];
  selectedPokemon: Pokemon | null;
  loading: {
    initial: boolean;
    filtering: boolean;
  };
  error: Error | null;
  filters: {
    searchTerm: string;
    selectedType: string;
  };
  types: string[];
}

function createPokemonStore() {
  const initialState: PokemonStoreState = {
    originalList: [],
    filteredList: [],
    selectedPokemon: null,
    loading: {
      initial: true,
      filtering: false,
    },
    error: null,
    filters: {
      searchTerm: "",
      selectedType: "",
    },
    types: [],
  };

  const { subscribe, set, update } = writable<PokemonStoreState>(initialState);

  return {
    subscribe,

    loadPokemon: async () => {
      update((state) => ({
        ...state,
        loading: { ...state.loading, initial: true },
        error: null,
      }));

      try {
        const pokemonList = await fetchPokemonList();
        update((state) => ({
          ...state,
          originalList: pokemonList,
          filteredList: pokemonList,
          types: getPokemonTypes(pokemonList),
          loading: { ...state.loading, initial: false },
        }));
      } catch (error) {
        update((state) => ({
          ...state,
          error:
            error instanceof Error ? error : new Error("Error desconocido"),
          loading: { ...state.loading, initial: false },
        }));
      }
    },

    // Exponemos la función filterPokemonByName para que esté disponible
    filterPokemonByName: (searchTerm: string): Pokemon[] => {
      return filterPokemonByName(initialState.originalList, searchTerm);
    },

    applyFilters: () => {
      update((state) => {
        let result = state.originalList;
        const { searchTerm, selectedType } = state.filters;

        update((innerState) => ({
          ...innerState,
          loading: { ...innerState.loading, filtering: true },
        }));

        if (searchTerm) {
          result = filterPokemonByName(result, searchTerm);
        }

        if (selectedType) {
          result = filterPokemonByType(result, selectedType);
        }

        return {
          ...state,
          filteredList: result,
          loading: { ...state.loading, filtering: false },
        };
      });
    },

    setSearchTerm: (searchTerm: string) => {
      update((state) => ({
        ...state,
        filters: { ...state.filters, searchTerm },
      }));
    },

    setSelectedType: (selectedType: string) => {
      update((state) => ({
        ...state,
        filters: { ...state.filters, selectedType },
      }));
    },

    selectPokemon: (pokemon: Pokemon | null) => {
      update((state) => ({
        ...state,
        selectedPokemon: pokemon,
      }));
    },

    resetFilters: () => {
      update((state) => ({
        ...state,
        filteredList: state.originalList,
        filters: {
          searchTerm: "",
          selectedType: "",
        },
      }));
    },
  };
}

export const pokemonStore = createPokemonStore();
