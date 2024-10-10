import axios from "axios";
import { createContext, useEffect, useRef, useState } from "react";

export const ConversionContext = createContext();

export function ConversionProvider({ children }) {
    const [conversionState, setConversionState] = useState({
        request: undefined,
        firstCoin: "BRL",
        secondCoin: "USD",
        amount: 0.00,
        result: 0
    });

    const { request, firstCoin, secondCoin, amount } = conversionState;

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
            .catch(error => {
                console.error("Erro ao buscar dados de conversão:", error);
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
        };
    };

    const handleChangeSecondCoin = () => {
        if(secondCoinRef.current) {
            setConversionState(prevState => ({...prevState, secondCoin: secondCoinRef.current.value}));
        };
    };

    const handleValue = (e) => {
        if(e.target.value === "") {
            setConversionState(prevState => ({...prevState, amount: 0, result: 0}))
        } else { setConversionState(prevState => ({...prevState, amount: e.target.value})) };
    };
    return (
        <ConversionContext.Provider value={{ 
            conversionState, 
            firstCoinRef, 
            secondCoinRef, 
            handleReplaceCoins, 
            handleChangeFirstCoin, 
            handleChangeSecondCoin, 
            handleValue }}>
            {children}
        </ConversionContext.Provider>
    )
};