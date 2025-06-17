import { Typography } from "../../../components"

export function ConversionDisclaimer() {
    const infos = [
        "As conversões de moeda exibidas têm caráter informativo e são baseadas em dados fornecidos por terceiros.",
        "As taxas de câmbio são atualizadas regularmente, mas podem não refletir a cotação exata em tempo real de instituições financeiras ou casas de câmbio.",
        "Para fins comerciais, legais ou financeiros, recomenda-se a consulta direta à instituição responsável pela operação de câmbio.",
        "A API utilizada fornece valores médios de mercado, podendo haver variações em taxas aplicadas na prática.",
        "A precisão dos dados depende da disponibilidade dos serviços da ExchangeRate-API, e o sistema não se responsabiliza por atrasos ou falhas técnicas.",
        "Em dias não úteis, a taxa exibida pode se referir à última cotação válida disponível.",
        "Nenhuma responsabilidade é assumida por perdas ou danos decorrentes do uso das informações apresentadas."
    ]
    return(
        <section className="px-16 py-8 bg-gray-100 rounded-b-lg">
            <ul className="flex flex-col gap-1">
                {infos.map((info, index) => (
                    <li key={index} className="list-disc">
                        <Typography as="p" className="text-base">
                            {info}
                        </Typography>
                    </li>
                ))}
            </ul>
        </section>
    )
}