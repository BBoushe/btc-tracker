import {getTotals} from "@/util/db_queries";
import {getPriceEUR} from "@/util/api_calls";

export const toCurrency : (num : number) => string = function(num) {
    return num.toLocaleString('de-DE', {
        style: 'currency',
        currency: 'EUR',
    });
};

export default async function Info() {
    const [ { totalInvestments, totalBtc }, price ] = await Promise.all([
        getTotals(),
        getPriceEUR(),
    ]);

    const currentValue = totalBtc * price;
    const profitLoss = currentValue - totalInvestments;
    const textColor = profitLoss > 0 ? "text-success" : "text-danger";
    const profitText = profitLoss >= 0 ? "Profit" : "Loss";

    return (
        <div className="mt-5 text-center">
            <h4>Total Invested: {toCurrency(totalInvestments)}</h4>
            {/*<h4>Current BTC Wallet Value: {toCurrency(currentValue)}</h4>*/}
            <h4>{profitText}: <span className={textColor}>{(profitLoss >= 0 ? "+" : "-") +
                toCurrency(Math.abs(profitLoss))}</span>
            </h4>
        </div>
    );
}