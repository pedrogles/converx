import { useContext } from "react";
import { CurrencysContext } from "../CurrencysContext";

export function useCurrencysContext() {
    return useContext(CurrencysContext);
};