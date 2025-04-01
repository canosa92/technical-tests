<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Pokemon } from '../lib/api/pokemon';
  
  // Importamos los componentes de la tarjeta
  import { 
    Root as Card, 
    Content as CardContent, 
    Description as CardDescription, 
    Footer as CardFooter, 
    Header as CardHeader, 
    Title as CardTitle 
  } from '../shadcn/card/index';

  export let pokemonList: Pokemon[] = [];

  const dispatch = createEventDispatcher<{ select: { detail: Pokemon } }>();

  function selectPokemon(pokemon: Pokemon) {
    dispatch('select', { detail: pokemon });
  }
</script>

<div class="pokemon-list">
  {#if pokemonList.length === 0}
    <div class="no-results">
      <p>No se encontraron Pokémon</p>
    </div>
  {:else}
    {#each pokemonList as pokemon (pokemon.id)}
    <Card class="pokemon-item" on:click={() => selectPokemon(pokemon)}>
      <CardHeader class="">
        <CardTitle class="">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</CardTitle>
      </CardHeader>
      
      <CardContent class="">
        <img 
          src={pokemon.sprites.front_default} 
          alt={pokemon.name}
          class="pokemon-image"
        />
      </CardContent>
    
      <CardDescription class="">
        <p>#{pokemon.id}</p>
        <div class="pokemon-types">
          {#each pokemon.types as type (type.slot)}
            {#if type.type}
              <span class="type-tag">
                {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
              </span>
            {/if}
          {/each}
        </div>
      </CardDescription>
    
      <CardFooter class="">
        <button on:click={() => selectPokemon(pokemon)}>Ver detalles</button>
      </CardFooter>
    </Card>
    
    {/each}
  {/if}
</div>

<style>
  
</style>
