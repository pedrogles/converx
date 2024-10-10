import { Button, Table } from "../../../components";
import { useCurrencysContext } from "../../../contexts";

export function FilteredCoinsTable () {
    const { currencyState, loadMoreButtonRef, filteredCoins, handleLoadMore } = useCurrencysContext();
    const { baseCode, filterIndexCoins } = currencyState;
    return (
        <div className="w-full flex flex-col items-center gap-3 mb-12">
            <Table
                colums={["Codigo ISO", "Valor"]}
                data={filteredCoins}
                indexToShow={filterIndexCoins}
                baseCode={baseCode}
            />
            <Button
                ref={loadMoreButtonRef}
                text="Carregar mais"
                className={"text-sm py-2 px-6 rounded-md duration-500 w-full max-w-64 text-white bg-[#012E40] hover:bg-[#013552]"}
                onClick={handleLoadMore}
            />
        </div> 
    );
};