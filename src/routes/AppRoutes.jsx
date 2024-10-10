import { Routes, Route } from "react-router-dom";
import { Conversion, Currencys } from "../pages";

export function AppRoutes() {
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
    );
};