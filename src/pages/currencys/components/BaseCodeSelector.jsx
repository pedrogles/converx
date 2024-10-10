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
            <Button
                className={"text-sm py-2 px-6 rounded-md duration-500 w-full text-white bg-[#012E40] hover:bg-[#013552]"}
                text="Alterar"
                onClick={() => handleChangeBaseCode(newBaseCode)}
            />
        </div>
    );
};