import { Routes, Route } from "react-router-dom";

import { CurrencysPage, ConversionPage } from "./pages/index";

export default function Routers() {
    return (
        <Routes>
            <Route 
                path="/" 
                element={ <CurrencysPage /> }
            />
            <Route 
                path="/conversao" 
                element={ <ConversionPage />}
            />
            <Route path="*" element={ <CurrencysPage/> }/>
            {/* Criar página 404 */}
        </Routes>
    )
}