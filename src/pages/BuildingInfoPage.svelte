<script lang="ts">
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { selectedAddress } from '../stores';
  import type { BuildingInfoType, LandInfoItem, BuildingExposInfo } from '../types';
  import BuildingExpos from '../components/Building/BuildingExpos.svelte';
  import BuildingFloor from '../components/Building/BuildingFloor.svelte';
  import LandInfo from '../components/Building/LandInfo.svelte';

  let address = get(selectedAddress);
  let buildingInfo: BuildingInfoType | null = null;
  let landInfo: LandInfoItem | null = null;
  let isLoading: boolean = true;
  let activeSection: string = 'total';
  let exposInfo: BuildingExposInfo | null = null;
  let activeFloor: string | null = null;

  async function fetchBuildingInfo(juso: string) {
    try {
      console.log('Fetching building info for:', juso);
      const response = await fetch('http://localhost:8000/get_building_main_info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ juso }),
      });
      const data = await response.json();
      buildingInfo = data as BuildingInfoType; // Explicitly cast the type
      if (data.grouped_expos_data) {
        exposInfo = data.grouped_expos_data as BuildingExposInfo;
      }
      console.log('Building info:', buildingInfo);
    } catch (error) {
      console.error('Error fetching building info:', error);
    } finally {
      isLoading = false;
    }
  }

  async function fetchLandInfo(juso: string) {
    try {
      const response = await fetch('http://localhost:8000/land_info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ juso }),
      });
      const data = await response.json();
      landInfo = data.land_info;
      console.log('Land info:', landInfo);
    } catch (error) {
      console.error('Error fetching land info:', error);
    }
  }

  function updateAddress(newAddress: { juso: string; njuso: string; nameFull: string }) {
    address = newAddress;
    if (address.juso) {
      isLoading = true;
      fetchBuildingInfo(address.juso);
      fetchLandInfo(address.juso);
    }
  }

  onMount(() => {
    updateAddress(get(selectedAddress));
    const unsubscribe = selectedAddress.subscribe(updateAddress);
    return () => {
      unsubscribe();
    };
  });

  function showSection(section: string) {
    activeSection = section;
  }

  function showExposSection(section: string) {
    activeSection = section;
  }

  function isArray(items: any): items is any[] {
    return Array.isArray(items);
  }

  function isSingleItem(item: any): item is Record<string, any> {
    return item && typeof item === 'object' && !Array.isArray(item);
  }
</script>

{#if address.juso}
<div class="container">
  <div class="content">
    <div>
      <li>주소: {address.juso}</li>
      <li>도로명 주소: {address.njuso}</li>
      <li>건물명: {address.nameFull}</li>
    </div>

    {#if !isLoading && buildingInfo}
      <LandInfo {landInfo} />
      <div>
        <h3>건물 정보</h3>
        <div class="button-container">
          {#if buildingInfo.total_info && buildingInfo.total_info.response.body.items.item}
            <button class="button" on:click={() => showSection('total')}>
              총괄표제부
            </button>
          {/if}
          {#if buildingInfo.title_info}
            {#if isArray(buildingInfo.title_info.response.body.items.item)}
              {#each buildingInfo.title_info.response.body.items.item as item, index (item.dongNm)}
                <button class="button" on:click={() => showSection(`title-${index}`)}>
                  표제부 - {item.dongNm}
                </button>
              {/each}
            {:else if isSingleItem(buildingInfo.title_info.response.body.items.item)}
              <button class="button" on:click={() => showSection('title')}>
                표제부 - {buildingInfo.title_info.response.body.items.item.dongNm}
              </button>
            {/if}
          {/if}
        </div>

        <div class="info-content">
          {#if activeSection === 'total' && buildingInfo.total_info && buildingInfo.total_info.response.body.items.item}
            <div>
              <h4>총괄표제부</h4>
              <p>종류: {buildingInfo.total_info.response.body.items.item.regstrKindCdNm}</p>
              <p>주용도: {buildingInfo.total_info.response.body.items.item.mainPurpsCdNm}</p>
            </div>
          {:else if activeSection.startsWith('title')}
            {#if isArray(buildingInfo.title_info.response.body.items.item)}
              {#each buildingInfo.title_info.response.body.items.item as item, index}
                {#if activeSection === `title-${index}`}
                  <div>
                    <h4>표제부 - {item.dongNm}</h4>
                    <p>주용도: {item.mainPurpsCdNm}</p>
                  </div>
                {/if}
              {/each}
            {:else if isSingleItem(buildingInfo.title_info.response.body.items.item)}
              {#if activeSection === 'title'}
                <div>
                  <h4>표제부 - {buildingInfo.title_info.response.body.items.item.dongNm}</h4>
                  <p>주용도: {buildingInfo.title_info.response.body.items.item.mainPurpsCdNm}</p>
                </div>
              {/if}
            {/if}
          {/if}
        </div>
        
        <BuildingExpos {exposInfo} {activeFloor} />
        <button class="button" on:click={() => showExposSection('floor')}>층별 정보</button>
        <BuildingFloor floorInfo={buildingInfo.floor_info} />
      </div>
    {/if}
  </div>
</div>
{/if}

<style>
  .button-container {
    margin-bottom: 10px;
  }

  .button {
    margin-right: 10px;
    background-color: white;
    color: white;
    border-radius: 5px;
    padding: 8px 12px;
    cursor: pointer;
  }

  .button:hover {
    background-color: #40392f;
  }

  .info-content {
    margin-top: 20px;
  }

  h3 {
    margin-bottom: 10px;
    font-size: 1.2em;
    color: #333;
  }

  h4 {
    font-size: 1.1em;
    margin-bottom: 8px;
    color: #666;
  }
</style>
