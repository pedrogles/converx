import { Routes, Route } from "react-router-dom";

import { CurrencysPage, ConversionPage } from "./pages/Index";

export default function Routers({ baseCode, currencys, coins }) {
    return (
        <Routes>
            <Route 
                path="/" 
                element={ <CurrencysPage baseCode={baseCode} currencys={currencys} coins={coins} /> }
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