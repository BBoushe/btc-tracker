import RefreshButton from "@/components/RefreshButton";
import {getPriceEUR} from "@/util/api_calls";
import {toCurrency} from "@/components/Info";

export default async function Price() {
    const price: string = toCurrency(await getPriceEUR());

    return (
        <div className="mb-5">
            <h1 id="price" className="display-1 mb-3">{price}</h1>
            <RefreshButton/>
        </div>
    );
}

