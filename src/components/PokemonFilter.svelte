<script lang="ts">
    import SearchInput from './SearchInput.svelte';
    import TypeDropdown from './TypeDropdown.svelte';
  
    export let searchTerm: string;
    export let selectedType: string;
    export let types: string[];
  
    export let onSearch: (term: string) => void;
    export let onSelectType: (type: string) => void;
  </script>
  
  <div class="filters">
    <SearchInput {searchTerm} {onSearch} />
    <TypeDropdown {types} {selectedType} {onSelectType} />
  </div>
  
  <style>
    .filters {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-bottom: 20px;
    }
  </style>
  