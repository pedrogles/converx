import axios from "axios";
import { useEffect, useState } from "react";
import { Loading } from "../../components/loading/Loading";
import { isosBrl } from "../../utils";
import DataListInput from "../../components/inputs/DataListInput";
import Button from "../../components/buttons/Button";
import Input from "../../components/inputs/Input";
import Table from "../../components/table/Table";

export default function Currencys () {
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
    return (
        <main className="h-screen overflow-scroll bg-slate-200 flex flex-col items-center pt-16 md:pt-24">
            <h1 className="text-black text-2xl font-semibold mt-6 md:mt-10 md:text-3xl">Moedas</h1>
            {/* Change Basecode */}
            <div className="flex flex-col justify-center items-center gap-4 my-8 w-full max-w-sm px-6">
                <DataListInput
                    id="basecode"
                    display="flex gap-4 items-center w-full"
                    label={baseCode.toUpperCase()}
                    labelColor="text-black"
                    type="search"
                    placeholder="Moeda base" 
                    list="isos"
                    data={isosBrl}
                    onChange={e => setCurrencyState(prevState => ({...prevState, newBaseCode: e.target.value}))}
                />
                <Button
                    text="Alterar"
                    className={"text-sm py-2 px-6 rounded-md duration-500 w-full text-white bg-[#012E40] hover:bg-[#025959]"}
                    onClick={() => handleChangeBaseCode(newBaseCode)}
                />
            </div>
            {/* Search */}
            <div className="flex flex-col items-center gap-4 w-full max-w-sm px-6">
                <Input 
                    id="searchCoin"
                    display="flex flex-row items-center gap-4 w-full"
                    label="Busca:"
                    labelColor="text-black"
                    valueColor="text-black"
                    placeholder="Digite o código ISO"
                    type="search"
                    onChange={e => setCurrencyState(prevState => ({...prevState, searchCoin: e.target.value}))}
                />
                <p className="flex flex-col gap-0.5 text-xs text-center font-light px-4 py-2 md:text-base">
                    Moeda base atual: {baseCode}
                    <span>Valores de acordo com a moeda base definida.</span>
                </p>
            </div>
            {/* Conditiona Rendering: Table Coins / Loading */}
            { currencys ? 
            <div className="w-full flex flex-col items-center gap-3 mb-20">
                <Table
                    colums={["Codigo ISO", "Valor"]}
                    data={filteredCoins}
                    indexToShow={filterIndexCoins}
                />
                <Button
                    id="load-more-button" 
                    text="Carregar mais"
                    className={"text-sm py-2 px-6 rounded-md duration-500 w-full max-w-64 text-white bg-[#012E40] hover:bg-[#025959]"}
                    onClick={handleLoadMore}
                />
            </div> : 
            <Loading /> }    
        </main>
    )
}