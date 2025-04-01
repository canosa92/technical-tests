<script lang="ts">
    export let message: string;
  </script>
  
  <div class="error-container">
    <p>Error: {message}</p>
  </div>
  
  <style>
    .error-container {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 300px;
      color: red;
    }
  </style>
  