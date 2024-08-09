<script lang="ts">
  import { selectedAddress } from './stores'; // stores.ts에서 가져오기
  import { Router, Route, Link } from 'svelte-routing';
  import BuildingInfoPage from './pages/BuildingInfoPage.svelte';
  import CalculatorPage from './pages/CalculatorPage.svelte';
  import CustomerPage from './pages/CustomerPage.svelte';
  import PropertyInfoPage from './pages/PropertyInfoPage.svelte';
  import LoginPage from './pages/LoginPage.svelte';
  import SearchAddress from './components/SearchAddress.svelte';
  import AddressList from './components/AddressList.svelte';
  import './static/global.css';

  type Result = {
    juso: string;
    njuso: string;
    nameFull: string;
  };

  let searchResults: Result[] = [];
  let showPage = 'login'; // 현재 보여지는 페이지를 추적하는 변수

  function handleSelectAddress(event: CustomEvent<{ juso: string; njuso: string; nameFull: string }>) {
    selectedAddress.set(event.detail);
    showPage = 'building-info'; // 빌딩 정보 페이지로 전환
  }

  function handleResultsUpdated(event: CustomEvent<{ results: Result[] }>) {
    searchResults = event.detail.results;
    showPage = 'address-list'; // 주소 리스트 페이지로 전환
  }
</script>

<main>
  <nav>
    <div class="nav-left">
      <SearchAddress on:resultsUpdated={handleResultsUpdated} />
    </div>
    <div class="nav-right">
      <button class="top-login" on:click={() => showPage = 'login'}>로그인</button>
    </div>
  </nav>

  {#if showPage === 'login'}
    <LoginPage />
  {:else if showPage === 'address-list'}
    <AddressList {searchResults} on:selectAddress={handleSelectAddress} />
  {:else if showPage === 'building-info'}
    <BuildingInfoPage />
  {:else if showPage === 'calculator'}
    <CalculatorPage />
  {:else if showPage === 'customer'}
    <CustomerPage />
  {:else if showPage === 'property-info'}
    <PropertyInfoPage />
  {/if}

  <div class="bottom-tab-bar">
    <button class="tab-button" on:click={() => showPage = 'calculator'}>계산기</button>
    <button class="tab-button" on:click={() => showPage = 'property-info'}>매물정보</button>
    <button class="tab-button" on:click={() => showPage = 'customer'}>고객관리</button>
  </div>
</main>

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
    justify-content: flex-start;
    width: 80%;
  }

  .nav-right {
    display: flex;
    justify-content: flex-end;
    width: 20%;
    margin-left: 2em;
  }

  .top-login {
    width: 80px;
    max-width: 80px;
    font-size: 1em;
    border: none;
    background-color: transparent;
    text-align: center;
    
    
  }

  .top-login:hover {
    font-size: 1.2em;
  }

  .bottom-tab-bar {
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    background-color: white;
    border-top: 1px solid #ddd;
    box-shadow: 0 -2px 5px rgba(0,0,0,0.1);
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
/* 작은 화면 크기부터 큰 화면 크기로 설정 순서를 정합니다. */
@media (min-width: 375px) {
  main {
    width: 96%;
  }
}

@media (min-width: 900px) {
  main {
    width: 36%;
  }
}
</style>
