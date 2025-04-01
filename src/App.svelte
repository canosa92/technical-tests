<script lang="ts">
  import './app.pcss';
  import { onMount } from 'svelte';
  import { pokemonStore } from './stores/pokemonStores';
  import PokemonList from './components/PokemonList.svelte';
  import Filters from './components/PokemonFilter.svelte';
  import LoadingIndicator from './components/LoadingIndicator.svelte.svelte';

  import type { Pokemon } from './lib/api/pokemon';
  import type { PokemonStoreState } from './stores/pokemonStores';

  let filteredList: Pokemon[] = [];
  let loading: { initial: boolean, filtering: boolean } = { initial: true, filtering: false };
  let error: Error | null = null;
  let types: string[] = [];
  let searchTerm = '';
  let selectedType = '';

  const unsubscribe = pokemonStore.subscribe((state: PokemonStoreState) => {
    filteredList = state.filteredList;
    loading = state.loading;
    error = state.error;
    types = state.types;
    searchTerm = state.filters.searchTerm;
    selectedType = state.filters.selectedType;
  });

  onMount(() => {
    pokemonStore.loadPokemon();
    return () => {
      unsubscribe();
    };
  });

  function handleSearch(term: string) {
    searchTerm = term;
    pokemonStore.setSearchTerm(term);
    pokemonStore.applyFilters();
  }

  function handleSelectType(type: string) {
    selectedType = type;
    pokemonStore.setSelectedType(type);
    pokemonStore.applyFilters();
  }
</script>

<main>
  <h1>Pokédex</h1>
  <section>
    {#if loading.initial}
      <LoadingIndicator message="Cargando Pokémon..." />
    {:else}
      <Filters {searchTerm} {selectedType} {types} onSearch={handleSearch} onSelectType={handleSelectType} />

      {#if loading.filtering}
        <LoadingIndicator message="Filtrando Pokémon..." />
      {/if}

      <div class="pokedex-container">
        <PokemonList pokemonList={filteredList} />
      </div>
    {/if}
  </section>
</main>

<style>
  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  h1 {
    text-align: center;
    margin-bottom: 20px;
  }

  .pokedex-container {
    display: flex;
    gap: 20px;
  }
</style>
