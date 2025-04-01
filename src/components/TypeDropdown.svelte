<script lang="ts">
  import { 
    DropdownMenu, 
    DropdownMenuTrigger, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuSeparator 
  } from '../shadcn/dropdown-menu/index';

  export let types: string[];
  export let selectedType: string;
  export let onSelectType: (type: string) => void;
</script>

<DropdownMenu>
  <DropdownMenuTrigger class="type-select">
    {selectedType ? selectedType.charAt(0).toUpperCase() + selectedType.slice(1) : "Todos los tipos"}
  </DropdownMenuTrigger>

  <DropdownMenuContent class="dropdown-content" portalProps={{}}>
    <DropdownMenuItem class="dropdown-item" inset={false} on:click={() => onSelectType("")}>
      Todos los tipos
    </DropdownMenuItem>
    <DropdownMenuSeparator class="dropdown-separator" />

    {#each types as type}
      <DropdownMenuItem class="dropdown-item" inset={false} on:click={() => onSelectType(type)}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </DropdownMenuItem>
    {/each}
  </DropdownMenuContent>
</DropdownMenu>

<style>
 
</style>
