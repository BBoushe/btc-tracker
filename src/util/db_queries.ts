import {getDataSource} from "@/db/data-source";
import {Investment} from "@/db/entity/Investment";

export async function getTotals() {
    const ds = await getDataSource();
    const repo = ds.getRepository(Investment);

    const [ amount, btc ] = await Promise.all([
        repo.sum('amountEuros'),
        repo.sum('btc_q'),
    ]);

    return {
        totalInvestments: Number(amount ?? 0),
        totalBtc:         Number(btc ?? 0),
    };
}