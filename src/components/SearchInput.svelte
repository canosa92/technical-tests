<script lang="ts">
    import { Input } from '../shadcn/input/index.js';
  
    export let searchTerm: string;
    export let onSearch: (term: string) => void;
  
    // Llamar a onSearch cada vez que searchTerm cambie
    $: onSearch(searchTerm);
  </script>
  
  <Input 
    bind:value={searchTerm} 
    placeholder="Buscar Pokémon..." 
    class="search-input"
    type="text"
  />
  
  <style>
    
  </style>
  