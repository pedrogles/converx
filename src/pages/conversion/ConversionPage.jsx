import { useState } from "react";
import { Typography } from "../../components";
import { ConversionForm } from "./components/ConversionForm";
import { ConversionResult } from "./components/ConversionResult";
import { ConversionDisclaimer } from "./components/ConversionDisclaimer";

export default function ConversionPage() {
    const [conversionResult, setConversionResult] = useState({});
    return(
        <>
            <Typography as="h2" className="text-2xl md:text-3xl">Conversor de Moedas</Typography>
            <div className="flex flex-col">
                <ConversionForm onConversion={setConversionResult}/>
                <ConversionResult conversionResult={conversionResult}/>
                <ConversionDisclaimer />
            </div>
        </>
    )
}