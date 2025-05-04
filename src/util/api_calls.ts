export async function getPrice(asset_code: string): Promise<number> {
    const res = await fetch(
        `https://api.coinbase.com/v2/prices/${asset_code}-EUR/spot`,
        { cache: "no-store" }
    );

    if(!res.ok) throw new Error(res.statusText);

    const json = await res.json();
    const price = json.data.amount;

    console.log(`Price is, ${price}`);

    return price;
}

export async function getTotalInvested() : Promise<number> {
    const res = await fetch('/api/investments/totalInvested',
        { next: { revalidate: 300 }
    });

    if(!res.ok) throw new Error("Failed to fetch total investments");

    const { total } = await res.json() as { total : number };
    return total;
}

export async function getBtcQuantity() : Promise<number> {
    const res = await fetch('/api/investments/btcQuantity',
        { next: { revalidate: 300 }
    });

    if(!res.ok) throw new Error("Failed to fetch total BTC quantity");

    const { total } = await res.json() as { total : number };
    return total;
}

export async function addInvestment(amount: number, btc_q: number, asset_code: string) {
    await fetch("/api/investments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amount, asset_quantity: btc_q, asset_code: asset_code }),
    });
}
