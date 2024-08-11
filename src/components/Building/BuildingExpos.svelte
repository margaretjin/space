<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { ExposInfoItem, BuildingExposInfo } from '../../types';

  export let exposInfo: BuildingExposInfo | null = null;
  export let activeFloor: string | null = null;

  let activeDong: string | null = "";
  let activeHo: string | null = "";

  let availableDongs: string[] = [];
  let availableFloors: string[] = [];
  let availableHos: string[] = [];

  const dispatch = createEventDispatcher();
  const excludedPurposes = ['화장실', '어린이놀이터', '노인정', '경비실', '전기실'];

  $: {
    if (exposInfo) {
      availableDongs = Object.keys(exposInfo);
      if (!activeDong || !availableDongs.includes(activeDong)) {
        activeDong = availableDongs[0] || "";
      }
    } else {
      availableDongs = [];
      activeDong = "";
    }
  }

  $: {
    if (exposInfo && activeDong) {
      availableFloors = Object.keys(exposInfo[activeDong] || {});
      if (!activeFloor || !availableFloors.includes(activeFloor)) {
        activeFloor = availableFloors[0] || "";
      }
    } else {
      availableFloors = [];
      activeFloor = "";
    }
  }

  $: {
    if (exposInfo && activeDong && activeFloor) {
      availableHos = Object.keys(exposInfo[activeDong][activeFloor] || {});
      if (!activeHo || !availableHos.includes(activeHo)) {
        activeHo = availableHos[0] || "";
      }
    } else {
      availableHos = [];
      activeHo = "";
    }
  }

  function handleDongChange(event: Event) {
    activeDong = (event.target as HTMLSelectElement).value;
    activeFloor = null;
    activeHo = null;
  }

  function handleFloorChange(event: Event) {
    activeFloor = (event.target as HTMLSelectElement).value;
    activeHo = null;
  }

  function handleHoChange(event: Event) {
    activeHo = (event.target as HTMLSelectElement).value;
  }

  function getAllExposItems(): ExposInfoItem[] {
    if (!exposInfo) {
      return [];
    }

    return Object.values(exposInfo).flatMap((dong: any) =>
      Object.values(dong).flatMap((floor: any) =>
        Object.values(floor).flat()
      )
    ) as ExposInfoItem[];
  }
</script>

{#if exposInfo}
  <div>
    <h3>호별 정보</h3>
    <div class="button-container">
      {#if availableDongs.length > 0 && activeDong !== ""}
        <div>
          <select id="dong-select" on:change={handleDongChange} bind:value={activeDong}>
            <option value="">동 선택</option>
            {#each availableDongs as dong (dong)}
              <option value={dong}>{dong}</option>
            {/each}
          </select>
        </div>
      {/if}
      {#if availableFloors.length > 0}
        <div>
          <select id="floor-select" on:change={handleFloorChange} bind:value={activeFloor}>
            <option value="">층 선택</option>
            {#each availableFloors as floor (floor)}
              <option value={floor}>{floor}</option>
            {/each}
          </select>
        </div>
      {/if}
      {#if availableHos.length > 0}
        <div>
          <select id="ho-select" on:change={handleHoChange} bind:value={activeHo}>
            <option value="">호 선택</option>
            {#each availableHos as ho (ho)}
              <option value={ho}>{ho}</option>
            {/each}
          </select>
        </div>
      {/if}
    </div>

    <div class="info-content">
      <table>
        <thead>
          <tr>
            <th>구분</th>
            <th>층</th>
            <th>면적</th>
            <th>용도</th>
          </tr>
        </thead>
        <tbody>
          {#if activeHo && activeDong && activeFloor}
            {#each exposInfo[activeDong]?.[activeFloor]?.[activeHo] as item (item.exposPubuseGbCdNm + item.flrNoNm + item.hoNm + item.area)}
              <tr>
                <td>{item.exposPubuseGbCdNm}</td>
                <td>{item.flrNoNm}</td>
                <td>{item.area}㎡</td>
                <td>{item.etcPurps}</td>
              </tr>
            {/each}
          {:else if activeFloor}
            {#each availableDongs as dong (dong)}
              {#each getAllExposItems() as item (item.exposPubuseGbCdNm + item.flrNoNm + item.hoNm + item.area)}
                <tr>
                  <td>{item.exposPubuseGbCdNm}</td>
                  <td>{item.flrNoNm}</td>
                  <td>{item.area}㎡</td>
                  <td>{item.etcPurps}</td>
                </tr>
              {/each}
            {/each}
          {:else if activeDong}
            {#each getAllExposItems() as item (item.exposPubuseGbCdNm + item.flrNoNm + item.hoNm + item.area)}
              <tr>
                <td>{item.exposPubuseGbCdNm}</td>
                <td>{item.flrNoNm}</td>
                <td>{item.area}㎡</td>
                <td>{item.etcPurps}</td>
              </tr>
            {/each}
          {:else}
            {#each getAllExposItems() as item (item.exposPubuseGbCdNm + item.flrNoNm + item.hoNm + item.area)}
              <tr>
                <td>{item.exposPubuseGbCdNm}</td>
                <td>{item.flrNoNm}</td>
                <td>{item.area}㎡</td>
                <td>{item.etcPurps}</td>
              </tr>
            {/each}
          {/if}
        </tbody>
      </table>
      <div class="summary">
      </div>
    </div>
  </div>
{/if}

<style>
  .button-container {
    display: flex;
    gap: 10px;
    justify-content: space-between;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }

  select {
    margin: 0 10px;
    padding: 16px;
    font-size: 16px;
    background-color: #0056b3;
    color: white; /* 텍스트 색상 변경 */
    border: none;
    border-radius: 8px;
  }

  .info-content {
    margin-top: 20px;
  }

  /* 선택된 옵션의 배경색 변경 (웹킷 브라우저 전용) */
  select::-webkit-selection {
    background-color: white;
    color: black;
  }

  /* 선택된 옵션의 배경색 변경 (모질라 브라우저 전용) */
  select::-moz-selection {
    background-color: rgb(255, 255, 255);
    color: black;
  }
</style>
