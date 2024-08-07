<script lang="ts">
  import type { LandInfoItem } from '../types';

  export let landInfo: LandInfoItem | null;
</script>

{#if landInfo}
  <h3>토지 정보</h3>
  <ul>
    <li class="info-box">
      <span class="label">토지이용상황:</span>
      <span class="value">{landInfo.ladUseSittnNm}</span>
    </li>
    <li class="info-box">
      <span class="label">주요용도지역:</span>
      <span class="value">{landInfo.prposArea1Nm}</span>
    </li>
    <li class="info-box">
      <span class="label">공시지가:</span>
      <span class="value">{landInfo.pblntfPclnd}</span>
    </li>
    <li class="info-box">
      <span class="label">면적:</span>
      <span class="value">{landInfo.lndpclAr}㎡</span>
    </li>
  </ul>
{/if}

<style>




  
</style>
