import {getDataSource} from "@/db/data-source";
import {Investment} from "@/db/entity/Investment";
import {NextRequest, NextResponse} from "next/server";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const amount = parseFloat(body.amount);
        const btc_q = parseFloat(body.btc_q);

        if(!amount || isNaN(amount) || amount <= 0) {
            return NextResponse.json({ error: "Invalid amount"} , { status: 400 });
        }

        if(!btc_q || isNaN(btc_q) || btc_q <= 0) {
            return NextResponse.json({ error: "Invalid BTC fraction" }, { status: 400 });
        }

        const ds = await getDataSource();
        const repo = ds.getRepository(Investment);

        const newInvestment = repo.create({
            amountEuros: amount,
            btc_q: btc_q,
            createdAt: new Date(),
        });

        const saved = await repo.save(newInvestment);

        return NextResponse.json({ id: saved.id }, { status: 201 });
    } catch (error) {
        console.error("POST /api/investments error", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}