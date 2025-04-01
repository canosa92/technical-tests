<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type { Pokemon } from '../lib/api/pokemon';
  
    import { 
      Root as Card, 
      Content as CardContent, 
      Description as CardDescription, 
      Footer as CardFooter, 
      Header as CardHeader, 
      Title as CardTitle 
    } from '../shadcn/card/index';
  
    export let pokemon: Pokemon;
  
    const dispatch = createEventDispatcher<{ select: Pokemon }>();
  
    function selectPokemon() {
      dispatch('select', pokemon);
    }
  </script>
  
  <Card class="pokemon-item">
    <CardHeader>
      <CardTitle>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</CardTitle>
    </CardHeader>
  
    <CardContent>
      <img 
        src={pokemon.sprites.front_default} 
        alt={pokemon.name}
        class="pokemon-image"
      />
    </CardContent>
  
    <CardDescription>
      <p>#{pokemon.id}</p>
      <div class="pokemon-types">
        {#each pokemon.types as type}
          {#if type.type}
            <span class="type-tag">
              {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
            </span>
          {/if}
        {/each}
      </div>
    </CardDescription>
  
    <CardFooter>
      <a href={`/pokemon/${pokemon.id}`} class="detail-button">Ver detalles</a>
    </CardFooter>
  </Card>
  
  <style>
    .detail-button {
      display: inline-block;
      padding: 8px 12px;
      background-color: #007bff;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      text-align: center;
      transition: background 0.3s;
    }
    
    .detail-button:hover {
      background-color: #0056b3;
    }
  </style>
  