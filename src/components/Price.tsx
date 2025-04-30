import RefreshButton from "@/components/RefreshButton";

async function getPrice(): Promise<number> {
    const result = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur', {
        cache: "no-store"  // fetch fresh price every time
    });

    if (!result.ok) {
        throw new Error("Failed to fetch price.\n" + result.statusText);
    }

    const data = await result.json();
    return data.bitcoin.eur;
}

async function getFixedPrice(): Promise<number> {
    return Promise.resolve(230000.123);
}

export default async function Price() {
    const price: number = await getFixedPrice();

    return (
        <div className="mb-5">
            <h1 id="price" className="display-1 mb-3">{price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</h1>
            <RefreshButton/>
        </div>
    );
}