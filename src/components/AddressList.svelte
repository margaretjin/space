<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    type Result = {
      juso: string;
      njuso: string;
      nameFull: string;
    };
  
    export let searchResults: Result[] = [];  // 명시적으로 내보내기
    const dispatch = createEventDispatcher();
  
    function handleSelectAddress(result: Result) {
      dispatch('selectAddress', { juso: result.juso, njuso: result.njuso, nameFull: result.nameFull });
    }
  </script>
  
  <div class="container; address-list-container" style="margin-top:1em">

  
      {#each searchResults as result}
        <button class="address-item" on:click={() => handleSelectAddress(result)}>
          <h3>{result.juso}</h3>
          <p>{result.njuso}<br>{result.nameFull}</p>
        </button>
      {/each}
    </div>


  
  <style>
    h3 {
      margin: 0px;
      color: #555;
    }
    p {
      margin-top: 4px;
      margin-bottom: 0px;
      color: #777;

    }
    .address-list-container {
      display: flex;
      flex-direction: column;
      gap: 10px;

  
    }
  
    .address-item {
      border: none;
      cursor: pointer;
      background: none;
      text-align: left;
      font-size: 1em;
      background-color: white;
      border: 1px solid #e6e5dd;
      border-radius: 10px;
    }
  
    .address-item:hover {
      border: solid 1.5px #007bff;
      color: white;
    }
   
  </style>
  