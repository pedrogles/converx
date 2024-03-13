import { Routes, Route } from "react-router-dom";

import Conversion from "./pages/conversion/Conversion";
import Currencys from "./pages/currencys/Currencys";

export default function Routers() {
    return (
        <Routes>
            <Route 
                path="/" 
                element={ <Currencys /> }
            />
            <Route 
                path="/conversao" 
                element={ <Conversion />}
            />
            <Route path="*" element={ <Currencys/> }/>
            {/* Criar página 404 */}
        </Routes>
    )
}