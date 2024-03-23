import axios from "axios";
import { useEffect, useState } from "react";
import { Loading } from "../../components/loading/Loading";
import { isosBrl } from "../../utils";

export default function Currencys () {
    // Request result
    const [currencys, setCurrencys] = useState(null);
    // Base code
    const [baseCode, setBaseCode] = useState("USD");
    const [newBaseCode, setNewBaseCode] = useState("");
    // Coins {key:value}
    const [coins, setCoins] = useState([]);
    // Search Coin
    const [searchCoin, setSearchCoin] = useState("");
    // Filter Index Coins
    const [filterIndexCoins, setFilterIndexCoins] = useState(8);
    // IsoCode
    const [isoCode, setIsoCode] = useState([]);
    // API request
    useEffect(() => {
        axios.get(`https://v6.exchangerate-api.com/v6/0f91c400679168f9cfae10f9/latest/${baseCode}`)
        .then(response => {
        setCurrencys(response.data);
        })
    }, [baseCode]);
    // Data Processing
    useEffect(() => {
        if(currencys) {
        setCoins(Object.entries(currencys.conversion_rates))
        setIsoCode(Object.keys(currencys.conversion_rates))
        }
    }, [currencys]);
    // Change base code
    const handle_change_base_code = () => {
        if(isoCode.includes(newBaseCode.toUpperCase())) {
            setBaseCode(newBaseCode);
        } else ( 
            window.alert("Escolha uma moeda válida")
        );
    };
    // Load more coins
    const handle_load_more = () => {
        const button = document.getElementById("load-more")
        setFilterIndexCoins(filterIndexCoins + 8);
        if(filterIndexCoins >= coins.length) {
            button.innerText = "Fim da lista"
        }
    };
    // Filter currency
    const filteredCoins = coins.filter((coin) => {
        const upperSearch = searchCoin.toUpperCase();
        return coin[0].includes(upperSearch)
    }, [searchCoin]);

    return (
        <main className="flex flex-col justify-center items-center pt-16 md:pt-24">
            <h1 className="text-black text-2xl font-semibold mt-6 md:mt-10 md:text-3xl">Moedas</h1>
            {/* Change Basecode */}
            <div className="flex flex-col justify-center items-center gap-4 my-8">
                <div className="flex justify-center items-center flex-wrap gap-4">
                    <label htmlFor="basecode" className="text-lg text-black" >{baseCode.toUpperCase()}</label>
                    <input 
                        className="max-w-40 border-2 rounded-md text-md p-2 focus:outline-rose-600 md:max-w-52"
                        id="basecode"
                        type="search" 
                        placeholder="Moeda base" 
                        list="isos"
                        onChange={e => setNewBaseCode(e.target.value)}
                    />
                    <datalist id="isos">
                        {isosBrl.map((iso, key) => {
                            return (
                                <option key={key} value={iso}>{iso}</option>
                            )
                        })}
                    </datalist>
                </div>
                <button 
                    className="text-white bg-blue-900 w-full text-sm py-2 px-6 rounded-md duration-500 hover:bg-blue-800"
                    onClick={() => handle_change_base_code(newBaseCode)}>
                    Alterar
                </button>
            </div>
            {/* Search */}
            <div className="flex justify-center items-center flex-wrap gap-4 mb-6">
                <label htmlFor="search-coin" className="text-lg text-black">Busca:</label>
                <input 
                    id="searc-coin"
                    className="max-w-40 border-2 rounded-md text-md p-2 focus:outline-rose-600 md:max-w-52"
                    type="search" 
                    onChange={e => setSearchCoin(e.target.value)}
                />
            </div>
            <p className="text-xs text-center font-light px-4 py-2 md:text-base">Valores de acordo com a moeda base definida.</p>
            {/* Conditiona Rendering: Coins/Loading */}
            {
                currencys ? 
                <>
                    <table className="table-auto w-full max-w-md border-separate border-spacing-2 md:max-w-lg">
                        <thead>
                            <tr className="bg-black hover:bg-slate-950">
                                <th className="text-base bg-gray-700 text-white p-3">Código ISO</th>
                                <th className="text-base bg-gray-700 text-white p-3">Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                        {filteredCoins.slice(0, filterIndexCoins).map((coin) => {
                            return (
                                <tr key={coin[0]}>
                                    <td className="text-base bg-gray-500 text-white p-2 text-center">{coin[0]}</td>
                                    <td className="text-base bg-gray-500 text-white p-2 text-center">{coin[1]}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    <button id="load-more" className="text-white bg-blue-900 w-52 text-sm py-3 mt-3 mb-12 rounded-md duration-500 hover:bg-blue-800 md:w-64" onClick={handle_load_more}>Carregar mais...</button>
                </>
                 : 
                <Loading />
            }    
        </main>
    )
}