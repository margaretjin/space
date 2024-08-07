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
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    }
  
    function handleKeyPress(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        searchAddress();
      }
    }
  
    function handleSelectAddress(result: Result) {
      dispatch('selectAddress', { juso: result.juso, njuso: result.njuso, nameFull: result.nameFull });
      results = []; // Clear results to hide the list
    }
  </script>
  
  <div class="search-container">
    <input type="text" bind:value={query} on:keypress={handleKeyPress} placeholder="주소를 입력하세요" />
  
    <div class="address-list-container">
      {#each results as result}
        <li>
          <button class="address-list" type="button" on:click={() => handleSelectAddress(result)}>
            {result.juso}<br>{result.njuso}<br>{result.nameFull}
          </button>
        </li>
      {/each}
    </div>
  </div>
  
  <style>
  .search-container {
    position: relative;
    width: 100%;
  }
  
  .address-list-container {
    position: absolute;
    top: 60px; /* input 필드 아래에 위치하도록 조정 */
    left: 0;
    right: 0;
    z-index: 10;
    width: 100%;
    min-height: 100vh;
    overflow-y: auto; /* 스크롤바 추가 */
  }
  
  .address-list {
    width: 100%;
    text-align: left;
    padding: 10px;
    border: none;
    cursor: pointer;
    color: #504D3A;
    font-size: 1em;
  }
  
  .address-list:hover {
    background-color: #F0EFE4;
    color: #504D3A;
  }
  
  .address-list:last-child {
    border-bottom: none; /* 마지막 항목의 경계선 제거 */
  }
  </style>
  