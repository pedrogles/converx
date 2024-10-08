import { Routes, Route } from "react-router-dom";

import Conversion from "./pages/conversion/Conversion";
import Currencys from "./pages/currencys/Currencys";

export default function Routers() {
    return (
        <Routes>
            <Route 
                path="/" 
                element={ <Conversion /> }
            />
            <Route 
                path="/moedas" 
                element={ <Currencys /> }
            />
            <Route path="*" element={ <Conversion /> }/>
            {/* Criar página 404 */}
        </Routes>
    )
}