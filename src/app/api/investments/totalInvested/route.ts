import {getDataSource} from "@/db/data-source";
import {Investment} from "@/db/entity/Investment";
import {NextResponse} from "next/server";

export async function GET() {
    const ds = await getDataSource();
    const repo = ds?.getRepository(Investment);

    const raw = await repo.sum('amountEuros');

    console.log("🔍 raw sum:", raw, "type:", typeof raw);

    const total : number = raw !== null ? Number(raw) : 0;

    return NextResponse.json({ total });
}