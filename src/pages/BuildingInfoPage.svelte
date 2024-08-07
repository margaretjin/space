<script lang="ts">
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import { selectedAddress } from '../stores';
    import type { BuildingInfoType, LandInfoItem, BuildingTitleItem } from '../types';
    import BuildingExpos from '../components/BuildingExpos.svelte';
    import BuildingFloor from '../components/BuildingFloor.svelte';
    import LandInfo from '../components/LandInfo.svelte';
  
    let address = get(selectedAddress);
  
    let buildingInfo: BuildingInfoType | null = null;
    let landInfo: LandInfoItem | null = null;
    let isLoading = true;
    let activeSection: string = 'total'; // 기본 값 설정
    let exposInfo: any = null;
    let activeFloor: string | null = null; // activeFloor 변수 추가
    let activeExposSection: string = 'expos'; // 전유부 기본 값 설정
  
    async function fetchBuildingInfo(juso: string) {
      try {
        const response = await fetch('http://localhost:8000/get_building_main_info', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ juso }),
        });
        const data = await response.json();
        buildingInfo = data;
        if (data.grouped_expos_data) {
          exposInfo = data.grouped_expos_data;
        }
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
      } catch (error) {
        console.error('Error fetching land info:', error);
      }
    }
  
    onMount(() => {
      fetchBuildingInfo(address.juso);
      fetchLandInfo(address.juso);
    });
  
    function showSection(section: string) {
      activeSection = section;
    }
  
    function showExposSection(section: string) {
      activeExposSection = section;
    }
  
    function isArray(items: any): items is BuildingTitleItem[] {
      return Array.isArray(items);
    }
  
    function isSingleItem(item: any): item is BuildingTitleItem {
      return item && typeof item === 'object' && !Array.isArray(item);
    }
  </script>
  
  <div class="info-container">
    <ul>
      <li>주소: {address.juso}</li>
      <li>도로명 주소: {address.njuso}</li>
      <li>건물명: {address.nameFull}</li>
    </ul>
  
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
  
  <style>
    .info-container {
      padding: 20px;
    }
  
    .button-container {
      margin-bottom: 10px;
    }
  
    .button {
      margin-right: 10px;
    }
  
    .info-content {
      margin-top: 20px;
    }
  </style>
  