<script lang="ts">
    import '../static/styles/calculator.css'
 
    export let transactionType: string = '';
    export let transactionKind: string = '';
    export let amount: number = 0;
    export let monthlyRent: number = 0;
    let commission: number = 0;
    let amountFormatted: string = '';
    let monthlyRentFormatted: string = '';
    let rate: number = 0;
    let vatIncluded: number = 0;
    let totalAmount: number = 0; // 여기에 totalAmount 추가
    let totalAmountFormatted: string = ''; // totalAmountFormatted 추가
    let calculationFormula: string;
    let rateMessage: string = '';  // 추가된 부분
    let transactionTypeWarning: boolean = false;
    let transactionKindWarning: boolean = false;
    let amountLabel: string = '금액(만원)';
    let personRole: string = '매수인'; // 추가
    let personName: string = ''; // 추가
    let showTextCopy: boolean = false; // 추가
    let includeTaxMessage: boolean = false;
    let includeTax2Message: boolean = false;





    // 체크박스 
    function handleCheckboxChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.id === 'taxCheckbox') {
        includeTaxMessage = target.checked;
    } else if (target.id === 'tax2Checkbox') {
        includeTax2Message = target.checked;
    }
}
    function selectRole(role: string) {
    personRole = role;
    }
    function handleNameInput(event: Event) {
    const target = event.target as HTMLInputElement;
    personName = target.value;
    }

    $: totalAmountFormatted = formatAmount(totalAmount); // totalAmountFormatted 반응형 선언

    $: {
        amountFormatted = formatAmount(amount * 10000);
        monthlyRentFormatted = formatAmount(monthlyRent * 10000);
        inputAmountInWonFormatted = formatAmount(amount * 10000);  // 억 단위로 포맷팅
    }

    function formatAmount(amount: number): string {
        const billion = Math.floor(amount / 100000000);
        const remainderAfterBillion = amount % 100000000;
        const million = Math.floor(remainderAfterBillion / 10000);
        const thousand = remainderAfterBillion % 10000;

        const formattedBillion = billion > 0 ? `${billion}억 ` : '';
        const formattedMillion = million > 0 ? `${new Intl.NumberFormat().format(million)}만원 ` : '';
        const formattedThousand = thousand > 0 ? new Intl.NumberFormat().format(thousand) : '';

        return `${formattedBillion}${formattedMillion}${formattedThousand}`;
    }

    function calculateCommission(transactionType: string, transactionKind: string, amount: number, monthlyRent: number = 0): { calculatedCommission: number; rateMessage: string } {
        let limit: number | null = null;
        let rateMessage = ''; // 상한 요율 메시지 변수 추가
        const amountInWon = amount * 10000; // 만원 단위로 입력받은 금액을 원 단위로 환산
        const monthlyRentInWon = monthlyRent * 10000; // 만원 단위로 입력받은 월세 금액을 원 단위로 환산

        if (transactionType === '주택') {
            if (transactionKind === '매매교환') {
                totalAmount = amountInWon;
                calculationFormula = `${formatAmount(amountInWon)}`;
                if (amountInWon < 50000000) {
                    rate = 0.006;
                    limit = 250000;
                    rateMessage = '5천만원 미만 매매<br>상한요율 0.6% <br> 상한금액 25만원'; // 메시지 추가
                } else if (amountInWon < 200000000) {
                    rate = 0.005;
                    limit = 800000;
                    rateMessage = '5천만원 이상~2억원 미만<br>매매 상한요율 0.5% <br> 상한금액 80만원'; // 메시지 추가
                } else if (amountInWon < 900000000) {
                    rate = 0.004;
                    limit = null;
                    rateMessage = '2억원 이상~9억원 미만 매매<br>상한요율 0.4%'; // 메시지 추가
                } else if (amountInWon < 1200000000) {
                    rate = 0.005;
                    limit = null;
                    rateMessage = '9억원 이상~12억원 미만 매매<br>상한요율 0.5%'; // 메시지 추가
                } else if (amountInWon < 1500000000) {
                    rate = 0.006;
                    limit = null;
                    rateMessage = '12억원 이상~15억원 미만 매매<br>상한요율 0.6%'; // 메시지 추가
                } else {
                    rate = 0.007;
                    limit = null;
                    rateMessage = '15억원 이상 매매<br>상한요율 0.7%'; // 메시지 추가
                }
            } else if (transactionKind === '전세') {
                totalAmount = amountInWon;
                calculationFormula = `${formatAmount(amountInWon)}`;
                if (amountInWon < 50000000) {
                    rate = 0.005;
                    limit = 200000;
                    rateMessage = '5천만원 미만 전세 <br> 상한요율 0.5%<br>상한금액 20만원'; // 메시지 추가
                } else if (amountInWon < 100000000) {
                    rate = 0.004;
                    limit = 300000;
                    rateMessage = '5천만원 이상~1억원 미만 전세<br>상한요율 0.4%<br>상한금액 30만원'; // 메시지 추가
                } else if (amountInWon < 600000000) {
                    rate = 0.003;
                    limit = null;
                    rateMessage = '1억원 이상~6억원 미만 전세<br>상한요율 0.3%'; // 메시지 추가
                } else if (amountInWon < 1200000000) {
                    rate = 0.004;
                    limit = null;
                    rateMessage = '6억원 이상~12억원 미만 전세<br>상한요율 0.4%'; // 메시지 추가
                } else if (amountInWon < 1500000000) {
                    rate = 0.005;
                    limit = null;
                    rateMessage = '12억원 이상~15억원 미만 전세<br>상한요율 0.5%'; // 메시지 추가
                } else {
                    rate = 0.006;
                    limit = null;
                    rateMessage = '15억원 이상 전세<br>상한요율 0.6%'; // 메시지 추가
                }
            } else if (transactionKind === '월세') {
                totalAmount = amountInWon + (monthlyRentInWon * 100);
                if (totalAmount < 50000000) {
                    totalAmount = amountInWon + (monthlyRentInWon * 70);
                    calculationFormula = `${formatAmount(amountInWon)} + (${formatAmount(monthlyRentInWon)} × 70)`;
                } else {
                    calculationFormula = `${formatAmount(amountInWon)} + (${formatAmount(monthlyRentInWon)} × 100)`;
                }

                if (totalAmount < 50000000) {
                    rate = 0.005;
                    limit = 200000;
                    rateMessage = '5천만원 미만 월세 상한요율 0.5%<br>상한금액 20만원'; // 메시지 추가
                } else if (totalAmount < 100000000) {
                    rate = 0.004;
                    limit = 300000;
                    rateMessage = '5천만원 이상~1억원 미만 월세 상한요율 0.4%<br>상한금액 30만원'; // 메시지 추가
                } else if (totalAmount < 600000000) {
                    rate = 0.003;
                    limit = null;
                    rateMessage = '1억원 이상~6억원 미만 월세 <br>상한요율 0.3%'; // 메시지 추가
                } else if (totalAmount < 1200000000) {
                    rate = 0.004;
                    limit = null;
                    rateMessage = '6억원 이상~12억원 미만 월세 <br>상한요율 0.4%'; // 메시지 추가
                } else if (totalAmount < 1500000000) {
                    rate = 0.005;
                    limit = null;
                    rateMessage = '12억원 이상~15억원 미만 월세<br> 상한요율 0.5%'; // 메시지 추가
                } else {
                    rate = 0.006;
                    limit = null;
                    rateMessage = '15억원 이상 월세 상한요율 0.6%'; // 메시지 추가
                }
            }
        } else if (transactionType === '오피스텔') {
            if (transactionKind === '매매교환') {
                totalAmount = amountInWon;
                calculationFormula = `${formatAmount(amountInWon)}`;
                rate = 0.005;
                limit = null;
                rateMessage = '오피스텔 매매교환은 상한요율 0.5%';
            } else if (transactionKind === '임대차 등') {
                totalAmount = amountInWon;
                calculationFormula = `${formatAmount(amountInWon)}`;
                rate = 0.004;
                limit = null;
                rateMessage = '오피스텔 임대차 등은 상한요율 0.4%';
            }
        } else if (transactionType === '주택 이외') {
            totalAmount = amountInWon;
            calculationFormula = `${formatAmount(amountInWon)}`;
            rate = 0.009;
            limit = null;
            rateMessage = '주택 이외 상한요율 0.9%';
        }

        let calculatedCommission = totalAmount * rate;
        if (limit && calculatedCommission > limit) {
            calculatedCommission = limit;
        }
        return { calculatedCommission, rateMessage }; // 메시지 반환
    }

    function selectTransactionType(type: string) {
        transactionType = type;
        updateLabels(); // 거래 유형이 변경될 때 라벨 업데이트
    }

    function selectTransactionKind(kind: string) {
        transactionKind = kind;
        updateLabels(); // 거래 종류가 변경될 때 라벨 업데이트
    }

    function handleCalculate() {
        transactionTypeWarning = !transactionType;
        transactionKindWarning = !transactionKind;

        if (transactionTypeWarning || transactionKindWarning) {
            return;
        }

        const result = calculateCommission(transactionType, transactionKind, amount, monthlyRent);
        commission = result.calculatedCommission;
        rateMessage = result.rateMessage;
        vatIncluded = commission * 1.1;  // 부가세 포함 계산
        showTextCopy = true; 
    }
     // Define updateLabels function
     function updateLabels() {
        if (transactionKind === '매매교환') {
            amountLabel = '매매가';
        } else if (transactionKind === '전세') {
            amountLabel = '전세가';
        } else if (transactionKind === '월세') {
            amountLabel = '보증금';
        } else {
            amountLabel = '금액 입력 후 계산버튼을 누르세요->';
        }
        amountFormatted = formatAmount(amount * 10000);
        monthlyRentFormatted = formatAmount(monthlyRent * 10000);
    }

    $: updateLabels(); // Call updateLabels whenever reactive context runs

    // 금액을 입력받을 때마다 포맷팅
    function handleAmountInput(event: Event) {
        const target = event.target as HTMLInputElement;
        amount = parseInt(target.value.replace(/[^0-9]/g, '')) || 0;
        updateLabels(); // 금액 입력 시 라벨 업데이트
    }
    // 월세 금액을 입력받을 때마다 포맷팅
    function handleMonthlyRentInput(event: Event) {
        const target = event.target as HTMLInputElement;
        monthlyRent = parseInt(target.value.replace(/[^0-9]/g, '')) || 0;
        updateLabels(); // 월세 입력 시 라벨 업데이트
    }

    // 엔터 키 이벤트 핸들러 추가
    function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
        handleCalculate();
        showTextCopy = true; // 추가
    }
    }

    let inputAmountInWonFormatted: string = '';

    $: inputAmountInWonFormatted = formatAmount(amount * 10000);  // 억 단위로 포맷팅

    // 주소 인풋창 

    let inputMessage: string = ''; // input 값 저장

    function handleInput(event: Event) {
        const target = event.target as HTMLInputElement;
        inputMessage = target.value;
    }
 
    $: rentInfo = transactionKind === '월세' ? '월세(차임)' : '';


    function copyToClipboard() {
    let taxMessage = '';

    if (includeTaxMessage && includeTax2Message) {
        taxMessage = '* 세금계산서 또는 현금영수증 발행 가능합니다.';
    } else if (includeTaxMessage) {
        taxMessage = '* 세금계산서 발행 가능합니다.';
    } else if (includeTax2Message) {
        taxMessage = '* 현금영수증 발행 가능합니다.';
    }

    const textToCopy = `
    ${personRole} ${personName} 님
    ${inputMessage} ${amountLabel} ${amountFormatted} ${transactionKind === '월세' ? `/ ${rentInfo} ${monthlyRentFormatted}` : ''} 중개수수료 안내 드립니다.
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
import html2canvas from 'html2canvas';



async function capture() {
    const element = document.getElementById('captureElement');
    if (element) {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      console.log(imgData);
    }
  }


</script>

<div class="container">
    <div class="form-group">
        <label for="transactionType" class="{transactionTypeWarning ? 'warning' : ''}">거래 유형을 선택하세요(파란색으로 선택됩니다)</label>
        <div class="button-group">
            <button class="button {transactionType === '주택' ? 'selected' : ''}" on:click={() => selectTransactionType('주택')}>주택</button>
            <button class="button {transactionType === '오피스텔' ? 'selected' : ''}" on:click={() => selectTransactionType('오피스텔')}>오피스텔</button>
            <button class="button {transactionType === '주택 이외' ? 'selected' : ''}" on:click={() => selectTransactionType('주택 이외')}>주택 이외</button>
        </div>
    </div>
    <div class="form-group">
        <label for="transactionKind" class="{transactionKindWarning ? 'warning' : ''}">거래 종류를 선택하세요</label>
        <div class="button-group">
            <button class="button {transactionKind === '매매교환' ? 'selected' : ''}" on:click={() => selectTransactionKind('매매교환')}>매매교환</button>
            <button class="button {transactionKind === '전세' ? 'selected' : ''}" on:click={() => selectTransactionKind('전세')}>전세</button>
            <button class="button {transactionKind === '월세' ? 'selected' : ''}" on:click={() => selectTransactionKind('월세')}>월세</button>
        </div>
    </div>
    <div class="container-2" role="button" tabindex="0" on:keypress={handleKeyPress}>
        <div class="input-group">
            <label for="amount">{amountLabel}<span class="labelM"> {amountFormatted}</span></label>
            <input type="text" id="amount" bind:value={amount} on:input={handleAmountInput} />
        </div>
        <div class="input-group">
            {#if transactionKind === '월세'}
                <label for="monthlyRent">{rentInfo}:<span class="labelM"> {monthlyRentFormatted}</span></label>   
                <input type="text" id="monthlyRent" bind:value={monthlyRent} on:input={handleMonthlyRentInput} />
            {/if}
        </div>
        <button class="calculate-button" on:click={handleCalculate}>계산</button>
        <div class="commission">
            <!--  <span id="commission" style="font-size: 1.3em;">중개수수료: {new Intl.NumberFormat().format(commission)} 원</span>--> 
        </div>
    </div>
    <table>
        <thead>
            <tr>
                <th style="width: 8px;">#</th>
                <th style="width: 80px;">구분</th>
                <th style="width: 140px;">금액</th>
                <th>비고</th>
            </tr>
        </thead>
        <tbody>
            {#if transactionKind !== '월세'}
                <tr>
                    <td>1</td>
                    <td>거래금액</td>
                    <td>{new Intl.NumberFormat().format(amount * 10000)} 원</td>
                    <td>{inputAmountInWonFormatted}</td>
                </tr>
            {/if}
            {#if transactionKind === '월세'}
                <tr>
                    <td>1</td>
                    <td>보증금</td>
                    <td>{new Intl.NumberFormat().format(amount * 10000)} 원</td>
                    <td>{inputAmountInWonFormatted}</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>월세 차임</td>
                    <td>{new Intl.NumberFormat().format(monthlyRent * 10000)} 원</td>
                    <td>{monthlyRentFormatted}</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>수수료 기준금액</td>
                    <td>{new Intl.NumberFormat().format(totalAmount)} 원</td>
                    <td>{calculationFormula}</td>
                </tr>
            {/if}
            <tr>
                <td>{transactionKind === '월세' ? 4 : 2}</td>
                <td>상한 요율</td>
                <td>{(rate * 100).toFixed(1)}%</td>
                <td>{@html rateMessage}</td>
            </tr>
            <tr>
                <td>{transactionKind === '월세' ? 5 : 3}</td>
                <td>중개 수수료</td>
                <td style="font-size:18px;">{new Intl.NumberFormat().format(commission)} 원</td>
                <td>기준금액 × 요율</td>
            </tr>
            <tr>
                <td>{transactionKind === '월세' ? 6 : 4}</td>
                <td>부가세 포함</td>
                <td style="font-size:18px;">{new Intl.NumberFormat().format(vatIncluded)} 원</td>
                <td>VAT 10%({new Intl.NumberFormat().format(commission * 0.1)}) 포함</td>
            </tr>
        </tbody>
    </table>
    <button on:click={copyToClipboard}>테이블 이미지 복사</button>
    
    {#if showTextCopy}
    <div class="who-text-copy">
        <div class="who">
            <div class="inputs">
                <input type="text" bind:value={inputMessage} on:input={handleInput} placeholder="거래매물명을 입력하세요 ex: 마이플레이스빌 1004호" />
                <input type="text" bind:value={personName} on:input={handleNameInput} placeholder="성함 입력(000님)" />
            </div>
            <div class="buttons">
                <button on:click={() => selectRole('매수인')}>매수인</button>
                <button on:click={() => selectRole('매도인')}>매도인</button>
                <button on:click={() => selectRole('임대인')}>임대인</button>
                <button on:click={() => selectRole('임차인')}>임차인</button>
            </div>
            <div class="checkbox">
                <label for="taxCheckbox">세금계산서</label>
                <input type="checkbox" id="taxCheckbox" on:change={handleCheckboxChange}>
                <label for="taxCheckbox">현금영수증</label>
                <input type="checkbox" id="tax2Checkbox" on:change={handleCheckboxChange}>
            </div>
        </div>
        <div class="text-copy">
            {personRole} {personName} 님 <br>
            {inputMessage} {amountLabel} {amountFormatted} {transactionKind === '월세' ? `/ ${rentInfo} ${monthlyRentFormatted}` : ''} 중개수수료 안내 드립니다.<br>
            중개 수수료 : {new Intl.NumberFormat().format(commission)}원<br>
            부가세 포함 금액 : {new Intl.NumberFormat().format(vatIncluded)}원<br>
            입금가 {new Intl.NumberFormat().format(vatIncluded)}원 입니다.<br>

            {#if includeTaxMessage && includeTax2Message}
            * 세금계산서 또는 현금영수증 발행 가능합니다.
             {:else if includeTaxMessage}
            * 세금계산서 발행 가능합니다.
            {:else if includeTax2Message}
            * 현금영수증 발행 가능합니다.
             {/if}
          
            <button on:click={copyToClipboard}>텍스트 복사</button> <!-- 카피 버튼 추가 -->
        </div>
    </div>
    {/if}
    
</div>

<style>
  
</style>
