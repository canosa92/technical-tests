<script lang="ts">
  import './app.pcss'
  import { onMount } from 'svelte';
  import { pokemonStore } from './stores/pokemonStores';
  import PokemonList from './components/PokemonList.svelte';
  import { Progress } from './shadcn/progress/index.js';
  import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from './shadcn/dropdown-menu/index';
  import { Input } from './shadcn/input/index.js';

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

  // 🚀 Detectar cambios en searchTerm y aplicar filtros automáticamente
  $: {
    if (searchTerm !== undefined) {
      pokemonStore.setSearchTerm(searchTerm);
      pokemonStore.applyFilters();
    }
  }

  // 🚀 Detectar cambios en selectedType y aplicar filtros automáticamente
  $: {
    if (selectedType !== undefined) {
      pokemonStore.setSelectedType(selectedType);
      pokemonStore.applyFilters();
    }
  }

  function resetFilters() {
    pokemonStore.resetFilters();
  }
</script>

<main>
  <h1>Pokédex</h1>
  <section>
    {#if loading.initial}
  <div class="loading-container">
    <p></p>
    <div class="bg-gray-300 w-1/2 h-4 rounded-md overflow-hidden">
      <div class="bg-blue-500 h-full w-1/2"></div>
    </div>
    
  </div>

    {:else if error}
      <div class="error-container">
        <p>Error al cargar los Pokémon: {error.message}</p>
      </div>
    {:else}
      <div class="filters">
        <!-- 🔍 Input para buscar Pokémon por nombre -->
        <Input 
          bind:value={searchTerm} 
          placeholder="Buscar Pokémon..." 
          class="search-input"
          type="text"
        />

        <!-- 🏷 Dropdown para seleccionar tipo de Pokémon -->
        <DropdownMenu>
          <DropdownMenuTrigger class="type-select">
            {selectedType ? selectedType.charAt(0).toUpperCase() + selectedType.slice(1) : "Todos los tipos"}
          </DropdownMenuTrigger>
        
          <!-- 🛠 Se agregan `portalProps` y `class` en `DropdownMenuContent` -->
          <DropdownMenuContent portalProps={{}} class="dropdown-content">
            <!-- 🛠 Se agregan `class` e `inset={false}` en `DropdownMenuItem` -->
            <DropdownMenuItem class="dropdown-item" inset={false} on:click={() => selectedType = ""}>
              Todos los tipos
            </DropdownMenuItem>
            <DropdownMenuSeparator class="dropdown-separator" />
        
            {#each types as type}
              <DropdownMenuItem class="dropdown-item" inset={false} on:click={() => selectedType = type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </DropdownMenuItem>
            {/each}
          </DropdownMenuContent>
        </DropdownMenu>
        
      </div>

      {#if loading.filtering}
        <div class="loading-filter-container">
          <p>Filtrando Pokémon...</p>
        </div>
      {/if}

      <!-- 📜 Lista de Pokémon filtrados -->
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

  .filters {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
  }

  .search-input, 
  .type-select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .loading-container, 
  .error-container,
  .loading-filter-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 300px;
    text-align: center;
  }

  .pokedex-container {
    display: flex;
    gap: 20px;
  }
</style>
