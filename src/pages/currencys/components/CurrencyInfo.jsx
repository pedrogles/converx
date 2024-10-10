import { useCurrencysContext } from "../../../contexts";

export function CurrencyInfo () {
    const { currencyState } = useCurrencysContext();
    const { baseCode } = currencyState;
    return (
        <p className="flex flex-col gap-0.5 text-xs text-center font-light px-4 md:text-base">
            <span>Valores de acordo com a moeda base definida.</span>
            Moeda base atual: {baseCode}
        </p>
    );
};