import { Typography } from "../../../components"
import { formatDate } from "../../../utils/formatDate"

export function ConversionResult({ conversionResult }) {
    console.log(conversionResult)
    return (
        <section className="flex flex-col gap-4 p-8 border-4 border-gray-100">
            <Typography as="h2" className="text-xl md:text-2xl">
                Resultado da conversão
            </Typography>
            <div className="flex flex-col gap-4 md:flex-row">
                <article className="flex-1 flex flex-col gap-1 border-2 border-gray-400 rounded-md p-4">
                    <Typography as="h3" className="text-base">
                        Conversão de: <Typography as="span" className="font-normal">{ conversionResult.fromCurrencyFullName }</Typography>
                    </Typography>
                    <Typography as="p" className="font-semibold text-base">
                        Valor a converter: <Typography as="span" className="font-normal">{ conversionResult.amount }</Typography>
                    </Typography>
                </article>
                <article className="flex-1 flex flex-col gap-1 border-2 border-gray-400 rounded-md p-4">
                    <Typography as="h3" className="text-base">
                        Para: <Typography as="span" className="font-normal">{ conversionResult.toCurrencyFullName }</Typography>
                    </Typography>
                    <Typography as="p" className="font-semibold text-base">
                        Valor da conversão: <Typography as="span" className="font-normal">{ conversionResult.conversionResult }</Typography>
                    </Typography>
                </article>
            </div>
            <article>
                <Typography as="h3" className="text-base">
                    Data da cotação utilizada: <Typography as="span" className="font-normal">{ conversionResult.lastUpdate && formatDate(conversionResult.lastUpdate)}</Typography>
                </Typography>
                <Typography as="h3" className="text-base">
                    Taxa de conversão: <Typography as="span" className="font-normal">{ conversionResult.conversionRate && `1 ${conversionResult.fromCurrencyFullName} = ${conversionResult.conversionRate} ${conversionResult.toCurrencyFullName}`}</Typography>
                </Typography>
            </article>
        </section>
    )
}