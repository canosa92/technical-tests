<script lang="ts">
  import type { Pokemon } from '../lib/api/pokemon';
  import PokemonCard from './PokemonCard.svelte';

  export let pokemonList: Pokemon[] = [];
  export let onSelect: (pokemon: Pokemon) => void;
</script>

<div class="pokemon-list">
  {#if pokemonList.length === 0}
    <div class="no-results">
      <p>No se encontraron Pokémon</p>
    </div>
  {:else}
    {#each pokemonList as pokemon (pokemon.id)}
      <PokemonCard {pokemon} on:select={(event) => onSelect(event.detail)} />
    {/each}
  {/if}
</div>

<style>
  .pokemon-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .no-results {
    text-align: center;
    width: 100%;
  }
</style>
