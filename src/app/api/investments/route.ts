import {getDataSource} from "@/db/data-source";
import {Investment} from "@/db/entity/Investment";
import {NextRequest, NextResponse} from "next/server";


export async function POST(req: NextRequest) {
    try{
        const { amount, asset_quantity, asset_code = "BTC"} = await req.json();

        const euros = Number(amount);
        const quantity = Number(asset_quantity);

        if(!euros || isNaN(euros) || euros <= 0) {
            return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
        }

        if(!quantity || isNaN(euros) || quantity <= 0) {
            return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
        }

        if(typeof asset_code !== "string" || asset_code.length > 4) {
            return NextResponse.json({ error: "Invalid asset code" }, { status: 400 });
        }

        const ds = await getDataSource();
        const repo = ds.getRepository(Investment);

        const saved = await repo.save(
            repo.create({
                amountEuros: euros,
                quantity,
                asset_code: asset_code.toUpperCase(),
                createdAt: new Date(),
            }),
        );

        return NextResponse.json({ id: saved.id }, { status: 201 });
    } catch (error) {
        console.error("POST /api/investments error",error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}