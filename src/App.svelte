<script lang="ts">
  import { Router, Route, Link } from 'svelte-routing';
  import BuildingInfoPage from './pages/BuildingInfoPage.svelte';
  import CalculatorPage from './pages/CalculatorPage.svelte';
  import CustomerPage from './pages/CustomerPage.svelte';
  import PropertyInfoPage from './pages/PropertyInfoPage.svelte';
  import LoginPage from './pages/LoginPage.svelte';
  import SearchAddress from './components/SearchAddress.svelte';
  import './static/global.css';
</script>
<main>
<Router>
  <nav>
    <div class="nav-right">
      <SearchAddress />
    </div>
    <div class="nav-left">
      <Link to="/"><button class="button-none">로그인</button></Link>
      <Link to="/building-info"><button class="button-none">건물정보</button></Link>
      <Link to="/calculator"><button class="button-none">계산기</button></Link>
      <Link to="/customer"><button class="button-none">고객관리</button></Link>
      <Link to="/property-info"><button class="button-none">매물정보</button></Link>
    </div>
  </nav>

  <Route path="/" component={LoginPage} />
  <Route path="/building-info" component={BuildingInfoPage} />
  <Route path="/calculator" component={CalculatorPage} />
  <Route path="/customer" component={CustomerPage} />
  <Route path="/property-info" component={PropertyInfoPage} />
</Router>
</main>
<style>
  :global(html, body) {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  nav {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
    box-sizing: border-box;
    padding: 10px;
    background-color: #E7E5D8;
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
  }

  .button-none {
    border: none;
    background-color: transparent;
    font-size: 1.1em;
    text-align: center;
    margin: 0 10px;
  }

  .button-none:hover {
    font-size: 1.2em;
  }

  main {
    width: 100%;
    margin: 0;
    padding: 0;
    overflow-y: auto;
    position: relative;
    top: 60px;
  }
</style>
