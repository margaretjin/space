<script lang="ts">
    export let personName: string;
    export let inputMessage: string;
    export let amountLabel: string;
    export let amountFormatted: string;
    export let transactionKind: string;
    export let rentInfo: string;
    export let monthlyRentFormatted: string;
    export let commission: number;
    export let vatIncluded: number;
    export let includeTaxMessage: boolean;
    export let includeTax2Message: boolean;
    export let displayMessage: string = '';
    
  
  
    export function handleInput(event: Event) {
      const target = event.target as HTMLInputElement;
      inputMessage = target.value;
    }
  
    export function handleNameInput(event: Event) {
      const target = event.target as HTMLInputElement;
      personName = target.value;
    }
  
    export function handleCheckboxChange(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.id === 'taxCheckbox') {
        includeTaxMessage = target.checked;
      } else if (target.id === 'tax2Checkbox') {
        includeTax2Message = target.checked;
      }
    }
  
    export function copyToClipboard() {
      let taxMessage = '';
  
      if (includeTaxMessage && includeTax2Message) {
        taxMessage = '* 세금계산서 또는 현금영수증 발행 가능합니다.';
      } else if (includeTaxMessage) {
        taxMessage = '* 세금계산서 발행 가능합니다.';
      } else if (includeTax2Message) {
        taxMessage = '* 현금영수증 발행 가능합니다.';
      }
  
      const textToCopy = `
•${inputMessage}
${amountLabel} ${amountFormatted} ${transactionKind === '월세' ? `/ ${rentInfo} ${monthlyRentFormatted}` : ''}
중개수수료 안내 드립니다.

중개 수수료 : ${new Intl.NumberFormat().format(commission)}원
부가세 포함 금액 : ${new Intl.NumberFormat().format(vatIncluded)}원
입금가 ${new Intl.NumberFormat().format(vatIncluded)}원 입니다.
${taxMessage}`;
  
      navigator.clipboard.writeText(textToCopy.trim()).then(() => {
        alert('텍스트가 클립보드에 복사되었습니다.');
      }).catch(err => {
        console.error('클립보드에 복사할 수 없습니다.', err);
      });
    }
  </script>
   <div class="checkbox">
    <label for="taxCheckbox">세금계산서</label>
    <input type="checkbox" id="taxCheckbox" on:change={handleCheckboxChange}>
    <label for="taxCheckbox">현금영수증</label>
    <input type="checkbox" id="tax2Checkbox" on:change={handleCheckboxChange}>
  </div>
  <div class="who-text-copy">
    <div class="text-copy">
        {#if displayMessage}
        •{displayMessage} <br>
        {/if}
      {amountLabel} {amountFormatted} {transactionKind === '월세' ? `/ ${rentInfo} ${monthlyRentFormatted}` : ''} 
      <br>중개수수료 안내 드립니다.<br>
      <p> </p>
      중개 수수료 : {new Intl.NumberFormat().format(commission)}원<br>
      부가세 포함 금액 : {new Intl.NumberFormat().format(vatIncluded)}원<br>
      입금가 {new Intl.NumberFormat().format(vatIncluded)}원 입니다.<br>
  
      {#if includeTaxMessage && includeTax2Message}
      <br>  * 세금계산서 또는 현금영수증 발행 가능합니다.<br>
      {:else if includeTaxMessage}
      <br>  * 세금계산서 발행 가능합니다.<br>
      {:else if includeTax2Message}
      <br>  * 현금영수증 발행 가능합니다.<br>
      {/if}
    </div>
  </div>
  <button class="button2" style="margin-top: 1em;" on:click={copyToClipboard}>텍스트 복사</button>
  
  <style>
    .who-text-copy {
      margin-top: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
      background-color: #fafafa;
      padding: 10px;
    }
    
    .checkbox {
    width: 100%;
    display: flex;
    flex-direction: row; /* 가로로 요소들을 정렬 */
    align-items: center; /* 체크박스와 라벨을 수직 중앙 정렬 */
    border: solid 1px #0056b3;
    border-radius: 8px;
    margin-top: 1em;
    padding: 1em; /* padding 추가하여 여백 확보 */
    box-sizing: border-box;
}

.checkbox label {
    font-size: 1em;
    font-weight: bold;
    white-space: nowrap; /* 텍스트 줄바꿈 방지 */
}

.checkbox input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    margin: 0px auto;
    vertical-align: middle; /* 체크박스와 라벨의 텍스트를 동일한 수직 위치에 맞춤 */
}


    .text-copy {
      width: 100%;
      font-size: 1.1em;
      resize: none; /* 사용자가 크기를 조정하지 못하도록 설정 */
      text-align: left;
    }
  
  </style>
  