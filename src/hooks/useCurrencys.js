import axios from "axios";
import { useEffect, useRef, useState } from "react";

export const useCurrencys = () => {
    // TypeScript
    const [currencyState, setCurrencyState] = useState({
        currencys: null,
        baseCode: "USD",
        newBaseCode: undefined,
        coins: [],
        searchCoin: "",
        filterIndexCoins: 8,
        isoCode: []
    });

    const { currencys, baseCode, newBaseCode, coins, searchCoin, filterIndexCoins, isoCode } = currencyState;
    
    const newBaseCodeRef = useRef();
    const searchValueRef = useRef();
    
    // Context API
    // API request
    useEffect(() => {
        axios.get(`https://v6.exchangerate-api.com/v6/0f91c400679168f9cfae10f9/latest/${baseCode}`)
        .then(response => {
        setCurrencyState(prevState => ({...prevState, currencys: response.data}));
        })
    }, [baseCode]);

    // Data Processing
    useEffect(() => {
        if(currencys) {
            setCurrencyState(prevState => (
                {
                    ...prevState, 
                    coins: Object.entries(currencys.conversion_rates), 
                    isoCode: Object.keys(currencys.conversion_rates)
                }
            ));
        }
    }, [currencys]);

    // Change base code
    const handleChangeBaseCode = () => {
        if(isoCode.includes(newBaseCode.toUpperCase())) {
            setCurrencyState(prevState => ({...prevState, baseCode: newBaseCode}));
        } else ( 
            window.alert("Escolha uma moeda válida")
        );
    };

    const handleSetBaseCode = (e) => {
        if(newBaseCodeRef.current) {
            setCurrencyState(prevState => ({...prevState, newBaseCode: e.target.value}));
        };
    };

    const handleChangeSearchValue = (e) => {
        if(searchValueRef.current) {
            setCurrencyState(prevState => ({...prevState, searchCoin: e.target.value}));
        };
    };

    // Load more coins
    const handleLoadMore = () => {
        const button = document.getElementById("load-more-button");
        setCurrencyState(prevState => ({...prevState, filterIndexCoins: filterIndexCoins + 8}));
        if(filterIndexCoins >= coins.length) {
            button.innerText = "Fim da lista"
        };
    };

    // Filter currency
    const filteredCoins = coins.filter((coin) => {
        const upperSearch = searchCoin.toUpperCase();
        const load_more_button = document.getElementById("load-more-button");
        if(searchCoin != '') {
            load_more_button.style.display = "none";
        } else {
            load_more_button.style.display = "block";
        }
        return coin[0].includes(upperSearch)
    }, [searchCoin]);
    return { 
        currencyState,
        filteredCoins,
        newBaseCodeRef,
        searchValueRef,
        handleChangeBaseCode,
        handleSetBaseCode,
        handleChangeSearchValue,
        handleLoadMore };
};