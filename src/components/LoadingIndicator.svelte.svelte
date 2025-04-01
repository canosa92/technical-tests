<script lang="ts">
    export let message: string = "Cargando...";
  </script>
  
  <div class="loading-container">
    <p>{message}</p>
    <div class="bg-gray-300 w-1/2 h-4 rounded-md overflow-hidden">
      <div class="bg-blue-500 h-full w-1/2"></div>
    </div>
  </div>
  
  <style>
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 300px;
      text-align: center;
    }
  </style>
  