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
    // IsoCode
    const [isoCode, setIsoCode] = useState([]);
    // API request
    useEffect(() => {
        axios.get(`https://v6.exchangerate-api.com/v6/2d51d0608b6946a7b1c805f7/latest/${baseCode}`)
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
    const change_base_code = () => {
        if(isoCode.includes(newBaseCode.toUpperCase())) {
            setBaseCode(newBaseCode);
        } else ( 
            window.alert("Escolha uma moeda válida")
        );
    };
    return (
        <main className="flex flex-col justify-center items-center pt-16 md:pt-24">
            <h1 className="text-black text-2xl font-semibold mt-6 md:mt-10 md:text-3xl">Moedas</h1>
            <div className="flex flex-col justify-center items-center gap-2 my-8">
                <div className="flex justify-center items-center flex-wrap gap-4">
                    <p className="text-lg text-black" >{baseCode.toUpperCase()}</p>
                    <input 
                        className="max-w-40 border-2 rounded-md text-md p-2 focus:outline-rose-600 md:max-w-52"
                        type="search" 
                        name="search" 
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
                    onClick={() => change_base_code(newBaseCode)}>
                    Alterar
                </button>
            </div>
            <p className="text-xs text-center font-light px-4 py-2 md:text-base">Valores de acordo com a moeda base definida.</p>
            {
                currencys ? 
                <table className="table-auto w-full max-w-md border-separate border-spacing-2 md:max-w-lg">
                    <thead>
                        <tr className="bg-black hover:bg-slate-950">
                            <th className="text-base bg-gray-700 text-white p-3">Código ISO</th>
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