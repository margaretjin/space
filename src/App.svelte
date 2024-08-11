<script lang="ts">
  import { selectedAddress } from './stores';
  import { Router, Route, Link } from 'svelte-routing';
  import BuildingInfoPage from './pages/BuildingInfoPage.svelte';
  import CalculatorPage from './pages/CalculatorPage.svelte';
  import CustomerPage from './pages/CustomerPage.svelte';
  import PropertyInfoPage from './pages/PropertyInfoPage.svelte';
  import LoginPage from './pages/LoginPage.svelte';
  import SearchAddress from './components/SearchAddress/SearchAddress.svelte';
  import AddressList from './components/SearchAddress/AddressList.svelte';
  import Home from './pages/Home.svelte';
  import './static/global.css';

  let currentPage = 'Home';
  let showLoginPage = false;

  function navigateTo(page: string) {
    currentPage = page;
    showLoginPage = false; // 로그인 페이지 숨기기
  }

  function toggleLoginPage() {
    showLoginPage = !showLoginPage;
  }

  type Result = {
    juso: string;
    njuso: string;
    nameFull: string;
  };

  let searchResults: Result[] = [];

  function handleSelectAddress(event: CustomEvent<{ juso: string; njuso: string; nameFull: string }>) {
    selectedAddress.set(event.detail);
    navigateTo('building-info');
  }

  function handleResultsUpdated(event: CustomEvent<{ results: Result[] }>) {
    searchResults = event.detail.results;
    navigateTo('address-list');
  }
</script>

<Router>
  <main>
    <nav>
      <div class="nav-left">
        <SearchAddress on:resultsUpdated={handleResultsUpdated} />
      </div>
      <div class="nav-right">
        <button class="nav-button" on:click={toggleLoginPage}>로그인</button>
        <button class="nav-button" on:click={() => navigateTo('Home')}>Home</button>
      </div>
    </nav>

    {#if showLoginPage}
      <LoginPage on:close={toggleLoginPage} />
    {:else if currentPage === 'address-list'}
      <AddressList {searchResults} on:selectAddress={handleSelectAddress} />
    {:else if currentPage === 'building-info'}
      <BuildingInfoPage />
    {:else if currentPage === 'calculator'}
      <CalculatorPage />
    {:else if currentPage === 'customer'}
      <CustomerPage />
    {:else if currentPage === 'property-info'}
      <PropertyInfoPage />
    {:else}
      <Home />
    {/if}

    <div class="bottom-tab-bar">
      <button class="tab-button" on:click={() => navigateTo('calculator')}>계산기</button>
      <button class="tab-button" on:click={() => navigateTo('property-info')}>매물정보</button>
      <button class="tab-button" on:click={() => navigateTo('customer')}>고객관리</button>
    </div>
  </main>
</Router>

<style>
  :global(html, body) {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  nav {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #ddd;
    box-sizing: border-box;
    padding: 10px;

    background-color: white;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  }

  .nav-left {
    display: flex;
    justify-content: center;
    width: 70%;
    margin-right: 0.5em;
    margin-bottom: 1.5em;
  }

  
  .nav-right {
    display: flex;
    gap: 10px; /* 버튼 사이의 간격을 늘립니다 */
    width: 30%;
    margin-right: 1em;
  }

  .nav-button {
    font-size: 1em;
    border: none;
    background-color: transparent;
    text-align: center;
    box-sizing: border-box;
    justify-content: center;
    white-space: nowrap; /* 텍스트가 줄바꿈되지 않도록 합니다 */
  
  }

  .bottom-tab-bar {
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    background-color: white;
    border-top: 1px solid #ddd;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }

  .tab-button {
    flex: 1;
    border: none;
    background-color: transparent;
    font-size: 1.1em;
    padding: 10px;
    text-align: center;
  }

  .tab-button:hover {
    background-color: #ddd;
  }

  @media (min-width: 375px) {
    main {
      width: 96%;
    }
  }

  @media (min-width: 450px) {
    main {
      max-width: 420px;
      width: 50%;
    }
  }

  @media (min-width: 900px) {
    main {
      max-width: 420px;
      width: 40%;
    }
  }
</style>
