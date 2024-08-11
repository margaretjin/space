<script lang="ts">
    export let displayMessage: string = '';
    export let transactionKind: string = '';
    export let amount: number = 0;
    export let monthlyRent: number = 0;
    export let totalAmount: number = 0;
    export let calculationFormula: string = '';
    export let rate: number = 0;
    export let rateMessage: string = '';
    export let commission: number = 0;
    export let vatIncluded: number = 0;
    export let inputAmountInWonFormatted: string = '';
    export let monthlyRentFormatted: string = '';


    export const amountFormatted: string = ''; 
</script>

<table>
    <thead>
        {#if displayMessage}
            <tr>
                <th colspan="4">주소: {displayMessage}</th>
            </tr>
        {/if}
        <tr>
            <th style="width: 4px; font-size:0.9em;">#</th>
            <th style="width: 40px;">구분</th>
            <th style="width: 130px;">금액</th>
            <th>비고</th>
        </tr>
    </thead>
    <tbody>
        {#if transactionKind !== '월세'}
            <tr>
                <td class="td09">1</td>
                <td>거래<br>금액</td>
                <td class="td1em">{new Intl.NumberFormat().format(amount * 10000)} 원</td>
                <td>{inputAmountInWonFormatted}</td>
            </tr>
        {/if}
        {#if transactionKind === '월세'}
            <tr>
                <td>1</td>
                <td>보증금</td>
                <td class="td1em">{new Intl.NumberFormat().format(amount * 10000)} 원</td>
                <td style="font-size: 0.9em ">{inputAmountInWonFormatted}</td>
            </tr>
            <tr>
                <td>2</td>
                <td>월세<br>차임</td>
                <td class="td1em">{new Intl.NumberFormat().format(monthlyRent * 10000)} 원</td>
                <td>{monthlyRentFormatted}</td>
            </tr>
            <tr>
                <td>3</td>
                <td>수수료<br>기준금액</td>
                <td class="td1em">{new Intl.NumberFormat().format(totalAmount)} 원</td>
                <td>{calculationFormula}</td>
            </tr>
        {/if}
        <tr>
            <td>{transactionKind === '월세' ? 4 : 2}</td>
            <td>상한<br>요율</td>
            <td class="td1em">{(rate * 100).toFixed(1)}%</td>
            <td>{@html rateMessage}</td>
        </tr>
        <tr>
            <td>{transactionKind === '월세' ? 5 : 3}</td>
            <td>중개<br>수수료</td>
            <td class="td1em">{new Intl.NumberFormat().format(commission)} 원</td>
            <td>기준금액 × 요율</td>
        </tr>
        <tr>
            <td>{transactionKind === '월세' ? 6 : 4}</td>
            <td>부가세<br>포함</td>
            <td class="td1em">{new Intl.NumberFormat().format(vatIncluded)} 원</td>
            <td>VAT 10%({new Intl.NumberFormat().format(commission * 0.1)}) 포함</td>
        </tr>
    </tbody>
</table>

<style>
    .td1em {
        font-size: 1em;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        margin: 1em 0 1em 0;
        font-size: 1em;
    }
  
    th, td {
        border: 1px solid #ccc;
        padding: 12px 6px 12px 6px;
        text-align: left;
        font-size: 0.9em;
        color: #444;
    }
  
    th {
        background-color: #f2f2f2;
    }
  
    tr:nth-child(even) {
        background-color: #f9f9f9;
    }
  
    tr:hover {
        background-color: #f1f1f1;
    }
</style>
