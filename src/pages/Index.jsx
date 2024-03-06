import Currencys from "./currencys/Currencys";
import Conversion from "./conversion/Conversion";

export function CurrencysPage({ baseCode, currencys, coins }) {
    return <Currencys baseCode={baseCode} currencys={currencys} coins={coins}  />
};

export function ConversionPage({ data }) {
    return <Conversion data={data} />
};