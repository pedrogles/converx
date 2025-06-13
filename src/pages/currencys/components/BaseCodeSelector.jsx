import { isosBrl } from "../../../utils/isos";
import { useCurrencysContext } from "../../../contexts";
import { Button, DataListInput } from "../../../components";

export function BaseCodeSelector () {
    const { currencyState, newBaseCodeRef, handleChangeBaseCode, handleSetBaseCode } = useCurrencysContext();
    const { baseCode, newBaseCode } = currencyState;
    return (
        <div className="flex flex-col justify-center items-center gap-4 w-full max-w-md px-6">
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
            <Button className="w-full" onClick={() => handleChangeBaseCode(newBaseCode)}>
                Alterar
            </Button>
        </div>
    );
};