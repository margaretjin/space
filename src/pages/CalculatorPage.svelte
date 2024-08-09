<script lang="ts">
    import CopyTextSection from '../components/CopyTextSection.svelte';
    import html2canvas from 'html2canvas';
    import CommissionTable from '../components/CommissionTable.svelte';

    export let transactionType: string = '';
    export let transactionKind: string = '';
    export let amount: number = 0;
    export let monthlyRent: number = 0;

    let commission: number = 0;
    let amountFormatted: string = '';
    let monthlyRentFormatted: string = '';
    let rate: number = 0;
    let vatIncluded: number = 0;
    let totalAmount: number = 0;
    let calculationFormula: string = '';
    let rateMessage: string = '';
    let transactionTypeWarning: boolean = false;
    let transactionKindWarning: boolean = false;
    let amountLabel: string = '금액(만원)';
    let personName: string = '';
    let showTextCopy: boolean = false;
    let includeTaxMessage: boolean = false;
    let includeTax2Message: boolean = false;
    let displayMessage: string = '';
    let inputAmountInWonFormatted: string = '';

    $: rentInfo = transactionKind === '월세' ? '월세(차임)' : '';


    function handleCheckboxChange(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target.id === 'taxCheckbox') {
            includeTaxMessage = target.checked;
        } else if (target.id === 'tax2Checkbox') {
            includeTax2Message = target.checked;
        }
    }


    $: amountFormatted = formatAmount(amount * 10000);
    $: monthlyRentFormatted = formatAmount(monthlyRent * 10000);
    $: inputAmountInWonFormatted = formatAmount(amount * 10000);

    function formatAmount(amount: number): string {
        const billion = Math.floor(amount / 100000000);
        const remainderAfterBillion = amount % 100000000;
        const million = Math.floor(remainderAfterBillion / 10000);
        const thousand = remainderAfterBillion % 10000;
        const formattedBillion = billion > 0 ? `${billion}억 ` : '';
        const formattedMillion = million > 0 ? `${million}만원 ` : '';
        const formattedThousand = thousand > 0 ? thousand.toString() : '';
        return `${formattedBillion}${formattedMillion}${formattedThousand}`;
    }

    function calculateCommission(transactionType: string, transactionKind: string, amount: number, monthlyRent: number = 0): { calculatedCommission: number; rateMessage: string } {
        let limit: number | null = null;
        let rateMessage = '';
        const amountInWon = amount * 10000;
        const monthlyRentInWon = monthlyRent * 10000;

        if (transactionType === '주택') {
            if (transactionKind === '매매교환') {
                totalAmount = amountInWon;
                calculationFormula = `${formatAmount(amountInWon)}`;
                if (amountInWon < 50000000) {
                    rate = 0.006;
                    limit = 250000;
                    rateMessage = '5천만원 미만 매매<br>상한요율 0.6% <br> 상한금액 25만원';
                } else if (amountInWon < 200000000) {
                    rate = 0.005;
                    limit = 800000;
                    rateMessage = '5천만원 이상~2억원 미만<br>매매 상한요율 0.5% <br> 상한금액 80만원';
                } else if (amountInWon < 900000000) {
                    rate = 0.004;
                    limit = null;
                    rateMessage = '2억원 이상~9억원 미만 매매<br>상한요율 0.4%';
                } else if (amountInWon < 1200000000) {
                    rate = 0.005;
                    limit = null;
                    rateMessage = '9억원 이상~12억원 미만 매매<br>상한요율 0.5%';
                } else if (amountInWon < 1500000000) {
                    rate = 0.006;
                    limit = null;
                    rateMessage = '12억원 이상~15억원 미만 매매<br>상한요율 0.6%';
                } else {
                    rate = 0.007;
                    limit = null;
                    rateMessage = '15억원 이상 매매<br>상한요율 0.7%';
                }
            } else if (transactionKind === '전세') {
                totalAmount = amountInWon;
                calculationFormula = `${formatAmount(amountInWon)}`;
                if (amountInWon < 50000000) {
                    rate = 0.005;
                    limit = 200000;
                    rateMessage = '5천만원 미만 전세 <br> 상한요율 0.5%<br>상한금액 20만원';
                } else if (amountInWon < 100000000) {
                    rate = 0.004;
                    limit = 300000;
                    rateMessage = '5천만원 이상~1억원 미만 전세<br>상한요율 0.4%<br>상한금액 30만원';
                } else if (amountInWon < 600000000) {
                    rate = 0.003;
                    limit = null;
                    rateMessage = '1억원 이상~6억원 미만 전세<br>상한요율 0.3%';
                } else if (amountInWon < 1200000000) {
                    rate = 0.004;
                    limit = null;
                    rateMessage = '6억원 이상~12억원 미만 전세<br>상한요율 0.4%';
                } else if (amountInWon < 1500000000) {
                    rate = 0.005;
                    limit = null;
                    rateMessage = '12억원 이상~15억원 미만 전세<br>상한요율 0.5%';
                } else {
                    rate = 0.006;
                    limit = null;
                    rateMessage = '15억원 이상 전세<br>상한요율 0.6%';
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
                    rateMessage = '5천만원 미만 월세 상한요율 0.5%<br>상한금액 20만원';
                } else if (totalAmount < 100000000) {
                    rate = 0.004;
                    limit = 300000;
                    rateMessage = '5천만원 이상~1억원 미만 월세 상한요율 0.4%<br>상한금액 30만원';
                } else if (totalAmount < 600000000) {
                    rate = 0.003;
                    limit = null;
                    rateMessage = '1억원 이상~6억원 미만 월세 <br>상한요율 0.3%';
                } else if (totalAmount < 1200000000) {
                    rate = 0.004;
                    limit = null;
                    rateMessage = '6억원 이상~12억원 미만 월세 <br>상한요율 0.4%';
                } else if (totalAmount < 1500000000) {
                    rate = 0.005;
                    limit = null;
                    rateMessage = '12억원 이상~15억원 미만 월세<br> 상한요율 0.5%';
                } else {
                    rate = 0.006;
                    limit = null;
                    rateMessage = '15억원 이상 월세 상한요율 0.6%';
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
        return { calculatedCommission, rateMessage };
    }

    function selectTransactionType(type: string) {
        transactionType = type;
        updateLabels();
    }

    function selectTransactionKind(kind: string) {
        transactionKind = kind;
        updateLabels();
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
        vatIncluded = commission * 1.1;

        showTextCopy = true;
    }

    function updateLabels() {
        if (transactionKind === '매매교환') {
            amountLabel = '매매';
        } else if (transactionKind === '전세') {
            amountLabel = '전세';
        } else if (transactionKind === '월세') {
            amountLabel = '월세 보증금';
        } else {
            amountLabel = '금액';
        }
        amountFormatted = formatAmount(amount * 10000);
        monthlyRentFormatted = formatAmount(monthlyRent * 10000);
    }

    function handleAmountInput(event: Event) {
        const target = event.target as HTMLInputElement;
        amount = parseInt(target.value.replace(/[^0-9]/g, '')) || 0;
        updateLabels();
    }

    function handleMonthlyRentInput(event: Event) {
        const target = event.target as HTMLInputElement;
        monthlyRent = parseInt(target.value.replace(/[^0-9]/g, '')) || 0;
        updateLabels();
    }

    function handleKeyPress(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            handleCalculate();
            showTextCopy = true;
            displayMessage = inputMessage;
        }
    }

    let inputMessage: string = '';

    function handleInput(event: Event) {
        const target = event.target as HTMLInputElement;
        inputMessage = target.value;
    }

    async function copyTableAsImage() {
        const tableElement = document.querySelector('table');

        if (tableElement) {
            try {
                const canvas = await html2canvas(tableElement as HTMLElement);
                canvas.toBlob(async (blob) => {
                    if (blob) {
                        const item = new ClipboardItem({ 'image/png': blob });
                        await navigator.clipboard.write([item]);
                        alert('테이블 이미지가 클립보드에 복사되었습니다.');
                    }
                });
            } catch (error) {
                console.error('이미지 캡처 실패:', error);
                alert('테이블 이미지를 클립보드에 복사하는데 실패했습니다.');
            }
        } else {
            alert('테이블을 찾을 수 없습니다.');
        }
    }
</script>

<div class="container">
    <div class="content">
        <h3> 중개 수수료 계산기 </h3>
        <div class="flex-G">
            <input class="inline-box" type="text" bind:value={inputMessage} on:input={handleInput} on:keypress={handleKeyPress} placeholder="ex: 마이플레이스빌 1004호" />
        </div>
        <div class="flex-G10-M1">
            <div class="button-group">
                <button class="button3" class:warning={transactionTypeWarning}> {transactionTypeWarning ? '선택 ▶' : '유형'}</button>
                <button class="{transactionType === '주택' ? 'selected' : ''}" on:click={() => selectTransactionType('주택')}>주택</button>
                <button class="{transactionType === '오피스텔' ? 'selected' : ''}" on:click={() => selectTransactionType('오피스텔')}>오피스텔</button>
                <button class="{transactionType === '주택 이외' ? 'selected' : ''}" on:click={() => selectTransactionType('주택 이외')}>주택 이외</button>
            </div> 
        </div>
        <div class="flex-G10-M1">
            <div class="button-group">
                <button class="button3" class:warning={transactionTypeWarning}> {transactionTypeWarning ? '선택 ▶' : '종류'}</button>
                <button class="{transactionKind === '매매교환' ? 'selected' : ''}" on:click={() => selectTransactionKind('매매교환')}>매매교환</button>
                <button class="{transactionKind === '전세' ? 'selected' : ''}" on:click={() => selectTransactionKind('전세')}>전세</button>
                <button class="{transactionKind === '월세' ? 'selected' : ''}" on:click={() => selectTransactionKind('월세')}>월세</button>
            </div>
        </div>
        <div role="button" tabindex="0" on:keypress={handleKeyPress}>
            <div class="flex-G">
                <label for="amount">{amountLabel}<span class="labelM"> {amountFormatted}</span></label>
                <input type="text" id="amount" bind:value={amount} on:input={handleAmountInput} />
            </div>
            {#if transactionKind === '월세'}
                <div class="flex-G">
                    <label for="monthlyRent">{rentInfo}:<span class="labelM"> {monthlyRentFormatted}</span></label>
                    <input type="text" id="monthlyRent" bind:value={monthlyRent} on:input={handleMonthlyRentInput} />
                </div>
            {/if}
            <button class="button2" on:click={handleCalculate}>계산</button>
            <div class="commission"></div>
        </div>
        <CommissionTable
        {displayMessage}
        {transactionKind}
        {amount}
        {monthlyRent}
        {totalAmount}
        {calculationFormula}
        {rate}
        {rateMessage}
        {commission}
        {vatIncluded}
        {inputAmountInWonFormatted}
        {monthlyRentFormatted}
    />

        <button class="button2" on:click={copyTableAsImage}>테이블 이미지 복사</button>

        {#if showTextCopy}
            <CopyTextSection
                {inputMessage}
                {displayMessage}
                {personName}
                {amountLabel}
                {amountFormatted}
                {transactionKind}
                {rentInfo}
                {monthlyRentFormatted}
                {commission}
                {vatIncluded}
                {includeTaxMessage}
                {includeTax2Message}
                on:handleInput={handleInput}
                on:handleCheckboxChange={handleCheckboxChange}
            />
        {/if}
    </div>
</div>

<style>
    h3 {
        padding-top: 1em;
        margin-bottom: 0px;
        color: #333;
        font-weight: 600;
    }

    button {
        height: 3.2em;
        width: 6em;
        padding: 0.5em;
        border: none;
        border-radius: 24px;
        cursor: pointer;
        background-color: #ffffff;
        border: 1px solid #666;
        color: #333;
        font-size: 1em;
        flex-grow: 1;
    }

    button.selected {
        background-color: #ccddf0;
        border: 2px solid #007bfe;
    }

    .button2 {
        height: 2.5em;
        text-align: center;
        font-size: 18px;
        cursor: pointer;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 14px;
        width: 100%;
    }

    .button3 {
        width: 50px;
        max-width: 50px;
        height: 50px;
        padding: 0.5em;
        border-radius: 50%;
    }

    .button-group {
        padding-bottom: 1em;
        width: 100%;
    }

    .warning {
        color: red;
        border: 1px solid red;
        font-size: 0.8em;
    }

    .labelM {
        font-size: 0.9em;
        color: #666;
        margin-left: 10px;
    }

    .commission {
        margin: 20px;
    }

    .flex-G {
        display: flex;
        margin: 1.5em 0 1.5em 0;
    }

    .flex-G label {
        width: 46%;
        margin-right: 10px;
        font-size: 1em;
        padding-top: 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .labelM {
        margin-left: 8px;
        font-size: 1.1em;
        font-weight: 500;
    }

    .flex-G input {
        flex: 1;
    }

    .flex-G10-M1 {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
</style>
