import { Loading } from "../../components/loading/Loading";

export default function Currencys ({ baseCode, currencys, coins }) {
    // function coinsFilter(item, length) {
    //     const filteredCoins = [];
    //     for(let i = 0; i <= length; i++) {
    //         filteredCoins.push(item[i]);
    //     }
    //     return filteredCoins;
    // };
    // const filteredCoins = coinsFilter(coins, 10);
    // console.log(filteredCoins)
    return (
        <main className="flex flex-col justify-center items-center pt-24">
            <h1 className="text-black text-2xl font-semibold mb-4">Moedas</h1>
            <p className="text-black font-normal">Moeda Base: {baseCode}</p>
            <p className="text-xs text-center font-light p-2">Caso necessário acesse o menu para alterar a moeda base.</p>
            {
                currencys ? 
                <table className="table-auto w-full border-separate border-spacing-2">
                    <thead>
                        <tr>
                            <th className="bg-gray-700 text-white p-2">Codigo Iso</th>
                            <th className="bg-gray-700 text-white p-2">Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                    {coins.map((coin) => {
                        return (
                            <tr key={coin[0]}>
                                <td className="bg-gray-500 text-white p-2 text-center">{coin[0]}</td>
                                <td className="bg-gray-500 text-white p-2 text-center">{coin[1]}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                 : 
                <h2><Loading /></h2>
            }    
        </main>
    )
}