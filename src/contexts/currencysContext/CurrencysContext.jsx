import axios from "axios";
import { createContext, useEffect, useRef, useState } from "react";
import { enviroments } from "../../../enviroments/enviroments";

export const CurrencysContext = createContext();

export function CurrencysProvider({ children }) {
    const baseUrl = enviroments.baseUrl;
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
    const loadMoreButtonRef = useRef();
    
    // API request
    useEffect(() => {
        axios
        .get(`${baseUrl}/latest/${baseCode}`)
        .then(response => {
        setCurrencyState(prevState => ({...prevState, currencys: response.data}));
        })
        .catch(error => {
            console.error("Erro ao buscar dados da API:", error);
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
        if(searchCoin != '') {
            if(loadMoreButtonRef.current) {
                loadMoreButtonRef.current.style.display = "none";
            };
        } else {
            if(loadMoreButtonRef.current) {
                loadMoreButtonRef.current.style.display = "block";
            };
        }
        return coin[0].includes(upperSearch)
    }, [searchCoin]);
    return (
        <CurrencysContext.Provider value={{ 
            currencyState, 
            filteredCoins, 
            newBaseCodeRef, 
            searchValueRef, 
            loadMoreButtonRef, 
            handleChangeBaseCode, 
            handleSetBaseCode, 
            handleChangeSearchValue, 
            handleLoadMore }}>
            {children}
        </CurrencysContext.Provider>
    )
};