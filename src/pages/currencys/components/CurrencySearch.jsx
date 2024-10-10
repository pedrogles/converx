import { Input } from "../../../components";
import { useCurrencysContext } from "../../../contexts";

export function CurrencySearch () {
    const { searchValueRef, handleChangeSearchValue } = useCurrencysContext();
    return (
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
        </div>
    );
};