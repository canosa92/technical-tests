<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { getPokemonById } from '../../lib/api/pokemon'; 
    import {Pokemon} from '../../stores/pokemonStores'
  
    let pokemon: Pokemon | null = null;
  
    $: {
      const id = $page.params.id;
      if (id) {
        fetchPokemon(id);
      }
    }
  
    async function fetchPokemon(id: string) {
      try {
        pokemon = await getPokemonById(id);
      } catch (error) {
        console.error("Error al obtener Pokémon:", error);
      }
    }
  </script>
  
  {#if pokemon}
    <div class="pokemon-detail">
      <h2>#{pokemon.id} {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
  
      <div class="pokemon-images">
        <img src={pokemon.sprites.front_default} alt={`${pokemon.name} frente`} />
        <img src={pokemon.sprites.back_default} alt={`${pokemon.name} atrás`} />
      </div>
  
      <div class="pokemon-info">
        <div class="info-section">
          <h3>Tipos</h3>
          <p>
            {pokemon.types.map(type => 
              type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)
            ).join(', ')}
          </p>
        </div>
  
        <div class="info-section">
          <h3>Estadísticas</h3>
          {#each pokemon.stats as stat}
            <div class="stat-bar">
              <span>{stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}:</span>
              <progress value={stat.base_stat} max="255"></progress>
              <span>{stat.base_stat}</span>
            </div>
          {/each}
        </div>
  
        <div class="info-section">
          <h3>Habilidades</h3>
          <p>
            {pokemon.abilities.map(ability => 
              ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)
            ).join(', ')}
          </p>
        </div>
      </div>
    </div>
  {:else}
    <p>Cargando...</p>
  {/if}
  
  <style>
  </style>
  