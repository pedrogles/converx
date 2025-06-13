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
            <Button ref={loadMoreButtonRef} className="w-full max-w-64" onClick={handleLoadMore}>
                    Carregar mais
            </Button>
        </div> 
    );
};