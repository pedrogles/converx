import { Loading } from "../../components";
import { useCurrencysContext } from "../../contexts";
import { BaseCodeSelector, CurrencyInfo, CurrencySearch, FilteredCoinsTable } from "./components";

export function Currencys () {
    const { currencyState } = useCurrencysContext();
    const { currencys } = currencyState;
    return (
        <main className="min-h-screen bg-slate-200 flex flex-col items-center gap-5 pt-16 md:pt-24">
            <h1 className="text-black text-2xl font-semibold mt-6 md:mt-10 md:text-3xl">Moedas</h1>
            <BaseCodeSelector />
            <CurrencySearch />
            <CurrencyInfo />
            { currencys && <FilteredCoinsTable /> }    
            { !currencys && <Loading /> }  
        </main>
    )
}