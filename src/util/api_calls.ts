export async function getPriceEUR(): Promise<number> {
    const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur",
        { cache: 'no-cache' }
    );

    if(!res.ok) throw new Error(res.statusText);

    const json = await res.json();

    return json.bitcoin.eur;
}

export async function getTotalInvested() : Promise<number> {
    const res = await fetch('http://localhost:3000/api/investments/totalInvested',
        { cache: 'no-store' });

    if(!res.ok) throw new Error("Failed to fetch total investments");

    const { total } = await res.json() as { total : number };
    return total;
}

export async function getBtcQuantity() : Promise<number> {
    const res = await fetch('http://localhost:3000/api/investments/btcQuantity',
        { cache: 'no-store' });

    if(!res.ok) throw new Error("Failed to fetch total BTC quantity");

    const { total } = await res.json() as { total : number };
    return total;
}

export async function addInvestment(amount: number, btc_q: number) {
    await fetch("http://localhost:3000/api/investments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amount, btc_q: btc_q }),
    })
}
