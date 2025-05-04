import {getTotals} from "@/util/db_queries";
import {getPrice} from "@/util/api_calls";
import {toCurrency} from "@/util/formattingUtils";



export default async function Info({ code } : { code: string }) {
    const [ { totalInvestments, totalQuantity }, price ] = await Promise.all([
        getTotals(code),
        getPrice(code),
    ]);

    const currentWalletValue = totalQuantity * price;
    const profitLoss = currentWalletValue - totalInvestments;
    const textColor = profitLoss > 0 ? "text-success" : "text-danger";
    const profitText = profitLoss >= 0 ? "Profit" : "Loss";

    return (
        <div className="mt-5 text-center">
            <h4>Total Invested: {toCurrency(totalInvestments)}</h4>
            {/*{<h4>Current BTC Wallet Value: {toCurrency(currentWalletValue)}</h4>}*/}
            <h4>{profitText}: <span className={textColor}>{(profitLoss >= 0 ? "+" : "-") +
                toCurrency(Math.abs(profitLoss))}</span>
            </h4>
        </div>
    );
}