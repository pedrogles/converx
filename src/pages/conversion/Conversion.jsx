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
        <main className="h-screen flex flex-col items-center pt-16 md:pt-24">
            <h1 className="text-black text-2xl font-semibold mt-6 md:mt-10 md:text-3xl">Conversor</h1>
            <div className="flex flex-col mt-12 mb-10 gap-8 justify-center items-center">
                {/* First coin */}
                <label htmlFor="first-coin" className="flex flex-col gap-2 items-start w-full">
                    Conversão de:
                    <select 
                        id="first-coin" 
                        className="bg-blue-900 text-white w-full border-2 rounded-md p-2" 
                        onChange={handle_change_first_coin}>
                            {isosBrl.map((iso) => {
                                return (
                                    <option key={iso} value={iso}>{iso}</option>
                                )
                            })}
                    </select>
                </label>
                {/* Replace coins */}
                <CgArrowsExchange className="text-xl" onClick={handle_replace_coins} />
                {/* Second coin */}
                <label htmlFor="second-coin" className="flex flex-col gap-2 items-start w-full">
                    Para:
                    <select 
                        id="second-coin" 
                        className="bg-blue-900 text-white w-full border-2 rounded-md p-2" 
                        onChange={handle_change_second_coin}>
                            {isosUsd.map((iso) => {
                                return (
                                    <option key={iso} value={iso}>{iso}</option>
                                )
                            })}
                    </select>
                </label>
                {/* Value */}
                <label className="flex gap-2 items-center" htmlFor="value">
                    Valor:
                    <input id="value" 
                        className="border-2 rounded-md p-2 max-w-24"   
                        type="text" 
                        placeholder="0.00" 
                        onChange={e => setAmount(e.target.value)} 
                    />
                </label>
            </div>
            {/* Result */}
            <p className="text-center">Resultado da conversão: <span className="text-red-700">{result?.toFixed(2)}</span></p>
        </main>
    )
}