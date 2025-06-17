import { Routes, Route } from "react-router-dom";
import ConversionPage from "../pages/conversion/ConversionPage";
import { Suspense } from "react";
import { LoadingPage } from "../pages/loading/LoadingPage";

export function AppRoutes() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <Routes>
                <Route 
                    path="/" 
                    element={ <ConversionPage /> }
                />
                <Route path="*" element={ <ConversionPage /> }/>
                {/* Criar página 404 */}
            </Routes>
        </Suspense>
    );
};