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
        <main className="flex flex-col justify-center items-center pt-16 md:pt-24">
            <h1 className="text-black text-2xl font-semibold my-6 md:my-10 md:text-3xl">Moedas</h1>
            <p className="text-base text-black font-normal md:text-lg">Moeda Base: {baseCode.toUpperCase()}</p>
            <p className="text-xs text-center font-light px-4 py-2 md:text-base">Caso necessário acesse o menu para alterar a moeda base.</p>
            {
                currencys ? 
                <table className="table-auto w-full max-w-md border-separate border-spacing-2 md:max-w-lg">
                    <thead>
                        <tr className="bg-black hover:bg-slate-950">
                            <th className="text-base bg-gray-700 text-white p-3">Codigo ISO</th>
                            <th className="text-base bg-gray-700 text-white p-3">Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                    {coins.map((coin) => {
                        return (
                            <tr key={coin[0]}>
                                <td className="text-base bg-gray-500 text-white p-2 text-center">{coin[0]}</td>
                                <td className="text-base bg-gray-500 text-white p-2 text-center">{coin[1]}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                 : 
                <Loading />
            }    
        </main>
    )
}