import {getBtcQuantity, getPriceEUR, getTotalInvested} from "@/util/api_calls";

export const toCurrency : (num : number) => string = function(num) {
    return num.toLocaleString('de-DE', {
        style: 'currency',
        currency: 'EUR',
    });
};

export default async function Info() {
    const [ totalInvested, totalBTC, price ] = await Promise.all([
        getTotalInvested(),
        getBtcQuantity(),
        getPriceEUR(),
    ]);

    const currentValue = totalBTC * price;
    const profitLoss = currentValue - totalInvested;
    const textColor = profitLoss > 0 ? "text-success" : "text-danger";
    const profitText = profitLoss >= 0 ? "Profit" : "Loss";

    return (
        <div className="mt-5 text-center">
            <h4>Total Invested: {toCurrency(totalInvested)}</h4>
            {/*<h4>Current BTC Wallet Value: {toCurrency(currentValue)}</h4>*/}
            <h4>{profitText}: <span className={textColor}>{(profitLoss >= 0 ? "+" : "-") +
                toCurrency(Math.abs(profitLoss))}</span>
            </h4>
            <button  className="btn btn-success btn-md">+</button>
        </div>
    );
}