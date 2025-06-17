import { createContext, useEffect, useState } from "react";
import { getSupportedCodes } from "../../../services/exchageAPI";

export const SupportedCodesContext = createContext();

export function SupportedCodesProvider({ children }) {
    const [supportedCodes, setSupportedCodes] = useState([]);

    useEffect(() => {
        getSupportedCodes().then((codes) => {
            let formatedCodes = [];
            codes.forEach(code => {
                formatedCodes.push(`${code[1]} (${code[0]})`)
            });
            setSupportedCodes(formatedCodes);
        })
    }, [])
    return (
        <SupportedCodesContext.Provider value={{ supportedCodes }}>
            { children }
        </SupportedCodesContext.Provider>
    )
}