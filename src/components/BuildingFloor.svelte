<!--층별정보 BuildingFloor.svelte-->
<script lang="ts">
  export let floorInfo: any;

  function isArray(items: any): boolean {
    return Array.isArray(items);
  }
</script>

{#if floorInfo?.response?.body?.items?.item}
  {#if isArray(floorInfo.response.body.items.item)}
    <ul>
      {#each floorInfo.response.body.items.item as item}
        <li class="info-box">
          <span class="label">{item.flrNoNm}</span>       
          <span class="value">{item.etcStrct}</span>
          <span class="value">{item.etcPurps}</span>
          <span class="value">{item.area}m²</span>
        </li>
      {/each}
    </ul>
  {:else}
    <ul>
      <li class="info-box">
        <span class="label">{floorInfo.response.body.items.item.item.flrNoNm}</span>       
        <span class="value">{floorInfo.response.body.items.item.item.etcStrct}</span>
        <span class="value">{floorInfo.response.body.items.item.item.etcPurps}</span>
        <span class="value">{floorInfo.response.body.items.item.item.area}m²</span>
      </li>
    </ul>
  {/if}
{:else}
  <p>층 정보가 없습니다.</p>
{/if}

<style>

</style>
