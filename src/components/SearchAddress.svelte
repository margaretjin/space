<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  type Result = {
    juso: string;
    njuso: string;
    nameFull: string;
  };

  let query = '';
  let results: Result[] = [];
  const dispatch = createEventDispatcher();

  async function searchAddress() {
    results = [];

    try {
      const response = await fetch('http://localhost:8000/search_address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      results = data.results;
      dispatch('resultsUpdated', { results });
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  }

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      searchAddress();
    }
  }
</script>

<div class="search-container">
  <input type="text" bind:value={query} on:keypress={handleKeyPress} placeholder="주소를 입력하세요" />
</div>

<style>
  .search-container {
    width: 100%;
  }


</style>
