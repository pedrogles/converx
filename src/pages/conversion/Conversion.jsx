import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { CgArrowsExchange } from "react-icons/cg";
import { isosBrl, isosUsd } from "../../utils";
import SelectInput from "../../components/inputs/SelectInput";
import Input from "../../components/inputs/Input";

export default function Conversion() {
    const [conversionState, setConversionState] = useState({
        request: undefined,
        firstCoin: "BRL",
        secondCoin: "USD",
        amount: 0.00,
        result: 0
    });

    const { request, firstCoin, secondCoin, amount, result } = conversionState;

    const firstCoinRef = useRef();
    const secondCoinRef = useRef();
    
    // API Request
    useEffect(() => {
        if(amount > 0) {
            axios
                .get(`https://v6.exchangerate-api.com/v6/0f91c400679168f9cfae10f9/pair/${firstCoin}/${secondCoin}/${amount}`)
                .then(response => {
                   setConversionState(prevState => ({...prevState, request: response.data}));
            })
        }
    }, [amount, firstCoin, secondCoin]);

    // Result conversion validation
    useEffect(() => {
        if(request) {
            setConversionState(prevState => ({...prevState, result: request.conversion_result}));
        };
    }, [request]);

    const handleReplaceCoins = () => {
        setConversionState(prevState => ({...prevState, firstCoin: secondCoin, secondCoin: firstCoin}));
        firstCoinRef.current.value = secondCoin;
        secondCoinRef.current.value = firstCoin;
    };

    const handleChangeFirstCoin = () => {
        if(firstCoinRef.current) {
            setConversionState(prevState => ({...prevState, firstCoin: firstCoinRef.current.value}));
        }
    };

    const handleChangeSecondCoin = () => {
        if(secondCoinRef.current) {
            setConversionState(prevState => ({...prevState, secondCoin: secondCoinRef.current.value}));
        }
    };

    const handleValue = (e) => {
        if(e.target.value === "") {
            setConversionState(prevState => ({...prevState, amount: 0, result: 0}))
        } else {setConversionState(prevState => ({...prevState, amount: e.target.value}))}
    }
    return(
        <main className="h-screen overflow-scroll flex flex-col items-center bg-slate-200 p-4">
            <div className="flex flex-col justify-center items-center w-full max-w-md my-20 p-12 gap-8 bg-[#011526] rounded-md z-0 md:rounded-sm md:my-32">
                <h1 className="text-white text-2xl font-semibold md:text-3xl">
                    Conversor
                </h1>
                <div className="flex flex-col items-center gap-3 w-full">
                    {/* First coin */}
                    <SelectInput
                        ref={firstCoinRef}
                        id="first-coin"
                        display="flex flex-col gap-2 items-start w-full"
                        label="Conversão de:"
                        labelColor="text-white"
                        selectBgColor="bg-[#012E40]"
                        selectTextColor="text-white"
                        borderColor="border-[#012E40]"
                        data={isosBrl}
                        onChange={handleChangeFirstCoin}
                    />

                    {/* Replace coins */}
                    <CgArrowsExchange 
                        className="rotate-90 text-2xl cursor-pointer text-white mt-4 md:text-2xl lg:text-3xl" 
                        onClick={handleReplaceCoins} 
                    />

                    {/* Second coin */}
                    <SelectInput
                        ref={secondCoinRef}
                        id="second-coin"
                        display="flex flex-col gap-2 items-start w-full"
                        label="Para:"
                        labelColor="text-white"
                        selectBgColor="bg-[#012E40]"
                        selectTextColor="text-white"
                        borderColor="border-[#012E40]"
                        data={isosUsd}
                        onChange={handleChangeSecondCoin}
                    />

                    {/* Value */}
                    <Input 
                        id="value"
                        display="flex flex-col gap-2 items-start w-full mt-4"
                        label="Valor:"
                        labelColor="text-white"
                        valueColor="text-black"
                        placeholder="0.00"
                        type="number"
                        onChange={e => handleValue(e)}
                    />
                </div>
                
                {/* Result */}
                <p className="flex flex-col bg-[#012E40] rounded-md px-4 py-2 w-full">
                    <span className="text-base text-center text-white underline md:text-lg">
                        {`${result?.toFixed(2)} ${secondCoin}`}
                    </span>
                </p>
            </div>
        </main>
    )
}