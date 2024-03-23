import axios from "axios";
import { useEffect, useState } from "react";
import { CgArrowsExchange } from "react-icons/cg";
import { isosBrl, isosUsd } from "../../utils";

export default function Conversion () {
    // API Request State
    const [request, setRequest] = useState();
    // First coin State
    const [firstCoin, setFirstCoin] = useState("BRL");
    // Second coin State
    const [secondCoin, setSecondCoin] = useState("USD");
    // Conversion value State
    const [amount, setAmount] = useState(0.00);
    // Result conversion State
    const [result, setResult] = useState();
    // API Request
    useEffect(() => {
        axios.get(`https://v6.exchangerate-api.com/v6/2d51d0608b6946a7b1c805f7/pair/${firstCoin}/${secondCoin}/${amount}`)
        .then(response => {
        setRequest(response.data);
        })
    }, [amount, firstCoin, secondCoin]);
    // Result conversion validation
    useEffect(() => {
        if(request) {
        setResult(request.conversion_result)
        };
    }, [request]);
    const handle_replace_coins = () => {
        const first_coin = document.getElementById("first-coin");
        const second_coin = document.getElementById("second-coin");
        const first_coin_value = firstCoin;
        const second_coin_value = secondCoin;
        first_coin.value = second_coin_value;
        second_coin.value = first_coin_value;
        setFirstCoin(second_coin_value);
        setSecondCoin(first_coin_value);
    }
    const handle_change_first_coin = () => {
        const first_coin = document.getElementById("first-coin");
        if(first_coin) {
            setFirstCoin(first_coin.value);
        }
    };
    const handle_change_second_coin = () => {
        const second_coin = document.getElementById("second-coin");
        if(second_coin) {
            setSecondCoin(second_coin.value)
        }
    };
    return(
        <main className="flex flex-col items-center py-16 md:py-24">
            <h1 className="text-black text-2xl font-semibold mt-6 md:mt-10 md:text-3xl">Conversor</h1>
            <div className="flex flex-col w-1/2 mt-12 mb-2 gap-6 justify-center items-center md:w-72 md:gap-10 md:mt-16 md:mb-6 lg:flex-row lg:w-2/3 lg:mb-10">
                {/* First coin */}
                <label htmlFor="first-coin" className="text-base flex flex-col gap-2 items-start w-full md:text-xl md:gap-4">
                    Conversão de:
                    <select 
                        id="first-coin" 
                        className="bg-blue-900 text-white h-11 w-full border-2 rounded-md p-2 md:h-14" 
                        onChange={handle_change_first_coin}>
                            {isosBrl.map((iso) => {
                                return (
                                    <option key={iso} value={iso}>{iso}</option>
                                )
                            })}
                    </select>
                </label>
                {/* Replace coins */}
                <CgArrowsExchange className="text-xl cursor-pointer hover:text-blue-800 md:text-2xl lg:text-3xl lg:w-32" onClick={handle_replace_coins} />
                {/* Second coin */}
                <label htmlFor="second-coin" className="text-base flex flex-col gap-2 items-start w-full md:text-xl md:gap-4">
                    Para:
                    <select 
                        id="second-coin" 
                        className="bg-blue-900 text-white h-11 w-full border-2 rounded-md p-2 md:h-14" 
                        onChange={handle_change_second_coin}>
                            {isosUsd.map((iso) => {
                                return (
                                    <option key={iso} value={iso}>{iso}</option>
                                )
                            })}
                    </select>
                </label>
                {/* Value */}
                <label className="text-base w-full flex flex-col gap-2 items-start md:text-xl" htmlFor="value">
                    Valor:
                    <input id="value" 
                        className="border-2 border-gray-400 h-11 w-full rounded-md p-2 md:px-4 md:h-14"   
                        type="number" 
                        placeholder="0.00" 
                        onChange={e => setAmount(e.target.value)} 
                    />
                </label>
            </div>
            {/* Result */}
            <p className="text-base text-center m-6 md:text-2xl">Resultado da conversão: <span className="text-base text-red-700 md:text-2xl">{result?.toFixed(2)}</span></p>
        </main>
    )
}