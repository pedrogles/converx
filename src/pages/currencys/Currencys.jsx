import { Loading } from "../../components/loading/Loading";

export default function Currencys ({ currencys, coins }) {
    return (
        <main className="">
            {
                currencys ? 
                coins.map((coin) => {
                return (
                    <p key={coin[0]}>
                        {/* IsoCode: Coin value */}
                        {coin[0]}:{coin[1]}
                    </p>
 
                )
                }): 
                <h2><Loading /></h2>
            }    
        </main>
    )
}