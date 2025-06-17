import { useContext } from "react";
import { SupportedCodesContext } from "../contexts/SupportedCodesContext";

export function useSupportedCodesContext() {
    return useContext(SupportedCodesContext)
}