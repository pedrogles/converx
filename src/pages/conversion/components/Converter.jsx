import { ConversionResult } from "./ConversionResult";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { isosBrl, isosUsd } from "../../../utils/isos";
import { SelectInput, Input } from "../../../components";
import { useConversionContext } from "../../../contexts";

export function Converter() {
    const { firstCoinRef, secondCoinRef, 
        handleReplaceCoins, handleChangeFirstCoin, handleChangeSecondCoin, handleValue } = useConversionContext();
    return(
        <div className="flex flex-col justify-center items-center w-full max-w-md mt-20 mb-10 p-12 gap-8 bg-[#011526] rounded-md md:rounded-sm md:mt-32 md:mb-16">
            <h1 className="text-white text-2xl font-semibold md:text-3xl">
                Conversor
            </h1>
            <div className="flex flex-col items-center gap-3 w-full">
                {/* First coin */}
                <SelectInput
                    ref={firstCoinRef}
                    id="first-coin"
                    display="flex flex-col gap-2 items-start w-full"
                    label="Conversão de:"
                    labelColor="text-white"
                    selectBgColor="bg-[#012E40]"
                    selectTextColor="text-white"
                    borderColor="border-[#012E40]"
                    data={isosBrl}
                    onChange={handleChangeFirstCoin}
                />

                {/* Replace coins */}
                <CgArrowsExchangeAltV 
                    className="text-2xl cursor-pointer text-white mt-5 md:text-2xl lg:text-3xl" 
                    onClick={handleReplaceCoins}
                />

                {/* Second coin */}
                <SelectInput
                    ref={secondCoinRef}
                    id="second-coin"
                    display="flex flex-col gap-2 items-start w-full"
                    label="Para:"
                    labelColor="text-white"
                    selectBgColor="bg-[#012E40]"
                    selectTextColor="text-white"
                    borderColor="border-[#012E40]"
                    data={isosUsd}
                    onChange={handleChangeSecondCoin}
                />

                {/* Value */}
                <Input 
                    id="value"
                    display="flex flex-col gap-2 items-start w-full mt-4"
                    label="Valor:"
                    labelColor="text-white"
                    valueColor="text-black"
                    placeholder="0.00"
                    type="number"
                    onChange={e => handleValue(e)}
                />
            </div>
            
            <ConversionResult />
        </div>
    );
};