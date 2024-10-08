import { Loading } from "../../components/loading/Loading";
import { isosBrl } from "../../utils";
import DataListInput from "../../components/inputs/DataListInput";
import Button from "../../components/buttons/Button";
import Input from "../../components/inputs/Input";
import Table from "../../components/table/Table";
import { useCurrencys } from "../../hooks/useCurrencys";

export default function Currencys () {
    const { currencyState, filteredCoins, 
            newBaseCodeRef, searchValueRef,
            handleChangeBaseCode, handleSetBaseCode, handleChangeSearchValue, handleLoadMore } = useCurrencys();

    const { currencys, baseCode, newBaseCode, filterIndexCoins } = currencyState;
    return (
        <main className="h-screen overflow-scroll bg-slate-200 flex flex-col items-center pt-16 md:pt-24">
            <h1 className="text-black text-2xl font-semibold mt-6 md:mt-10 md:text-3xl">Moedas</h1>
            {/* Change Basecode */}
            <div className="flex flex-col justify-center items-center gap-4 my-8 w-full max-w-md px-6">
                <DataListInput
                    ref={newBaseCodeRef}
                    id="basecode"
                    display="flex gap-4 items-center w-full"
                    label={baseCode.toUpperCase()}
                    labelColor="text-black"
                    type="search"
                    placeholder="Moeda base" 
                    list="isos"
                    data={isosBrl}
                    onChange={(e) => handleSetBaseCode(e)}
                />
                <Button
                    text="Alterar"
                    className={"text-sm py-2 px-6 rounded-md duration-500 w-full text-white bg-[#012E40] hover:bg-[#025959]"}
                    onClick={() => handleChangeBaseCode(newBaseCode)}
                />
            </div>
            {/* Search */}
            <div className="flex flex-col items-center gap-4 w-full max-w-md px-6">
                <Input 
                    ref={searchValueRef}
                    id="searchCoin"
                    display="flex flex-row items-center gap-4 w-full"
                    label="Busca:"
                    labelColor="text-black"
                    valueColor="text-black"
                    placeholder="Digite o código ISO"
                    type="search"
                    onChange={(e) => handleChangeSearchValue(e)}
                />
                <p className="flex flex-col gap-0.5 text-xs text-center font-light px-4 py-2 md:text-base">
                    <span>Valores de acordo com a moeda base definida.</span>
                    Moeda base atual: {baseCode}
                </p>
            </div>
            {/* Conditiona Rendering: Table Coins / Loading */}
            { currencys && 
                <div className="w-full flex flex-col items-center gap-3 mb-20">
                    <Table
                        colums={["Codigo ISO", "Valor"]}
                        data={filteredCoins}
                        indexToShow={filterIndexCoins}
                        baseCode={baseCode}
                    />
                    <Button
                        id="load-more-button" 
                        text="Carregar mais"
                        className={"text-sm py-2 px-6 rounded-md duration-500 w-full max-w-64 text-white bg-[#012E40] hover:bg-[#025959]"}
                        onClick={handleLoadMore}
                    />
                </div> 
            }    
            { !currencys && <Loading /> }   
        </main>
    )
}