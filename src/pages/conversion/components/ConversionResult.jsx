import { useConversionContext } from "../../../contexts";

export function ConversionResult() {
    const { conversionState } = useConversionContext();
    const { secondCoin, result } = conversionState;
    return(
        <p className="flex flex-col bg-[#012E40] rounded-md px-4 py-2 w-full">
            <span className="text-base text-center text-white underline md:text-lg">
                {`${result?.toFixed(2)} ${secondCoin}`}
            </span>
        </p>
    );
};