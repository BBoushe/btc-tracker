import {getDataSource} from "@/db/data-source";
import {Investment} from "@/db/entity/Investment";

export async function getTotals(asset_code: string) {
    const ds = await getDataSource();
    const qb = ds
        .getRepository(Investment)
        .createQueryBuilder('inv')
        .select('SUM(amountEuros)', 'sumEuros')
        .addSelect('SUM(quantity)', 'sumQuantity')
        .where(`inv.asset_code = :asset_code`, {asset_code: asset_code});

    const { sumEuros, sumQuantity } = await qb.getRawOne();

    return {
        totalInvestments: Number(sumEuros ?? 0),
        totalQuantity:    Number(sumQuantity ?? 0),
    };
}