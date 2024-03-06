import Currencys from "./currencys/Currencys";
import Conversion from "./conversion/Conversion";

export function CurrencysPage({ currencys, coins }) {
    return <Currencys currencys={currencys} coins={coins}  />
};

export function ConversionPage({ data }) {
    return <Conversion data={data} />
};