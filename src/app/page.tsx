import Link from "next/link";

import { CurrencyConverter } from "@/components/currency-converter/currency-converter";
import { getSupportedCurrencies } from "@/lib/exchange-rate/provider.server";
import type { Currency } from "@/lib/exchange-rate/types";

export const dynamic = "force-dynamic";

async function loadCurrencies(): Promise<{
  currencies: Currency[];
  loadError?: string;
}> {
  try {
    return { currencies: await getSupportedCurrencies() };
  } catch {
    return {
      currencies: [],
      loadError:
        "As moedas estão temporariamente indisponíveis. Verifique a configuração do serviço e tente novamente.",
    };
  }
}

export default async function HomePage() {
  const { currencies, loadError } = await loadCurrencies();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#cffafe_0,_#f8fafc_38rem)]">
      <a
        className="sr-only z-50 rounded-lg bg-white px-4 py-3 font-bold text-slate-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        href="#conteudo"
      >
        Pular para o conteúdo
      </a>

      <header className="border-b border-slate-900/10 bg-slate-950 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link
            className="text-xl font-black tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
            href="/"
          >
            Conver<span className="text-cyan-300">x</span>
          </Link>
          <span className="text-sm text-slate-300">Conversão simples e segura</span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16" id="conteudo">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="pt-4 lg:sticky lg:top-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-800">
              Converx
            </p>
            <h1 className="mt-4 max-w-xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Conversor de moedas online
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              Compare valores entre reais, dólares, euros e outras moedas com
              uma experiência direta e acessível.
            </p>

            <div className="mt-8 grid gap-4 text-sm text-slate-700 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-2xl border border-white/80 bg-white/70 p-4 backdrop-blur">
                <strong className="block text-slate-950">Credencial protegida</strong>
                A consulta ao provedor acontece somente no servidor.
              </div>
              <div className="rounded-2xl border border-white/80 bg-white/70 p-4 backdrop-blur">
                <strong className="block text-slate-950">Valores estruturados</strong>
                As moedas são validadas antes de cada conversão.
              </div>
            </div>
          </div>

          <CurrencyConverter currencies={currencies} loadError={loadError} />
        </div>

        <section className="mt-16 border-t border-slate-200 pt-10" aria-labelledby="disclaimer-title">
          <h2 className="text-xl font-bold text-slate-950" id="disclaimer-title">
            Antes de usar a cotação
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            Os valores são estimativas informativas. Bancos, cartões, corretoras
            e outros serviços podem aplicar impostos, tarifas, spreads e horários
            de atualização diferentes.
          </p>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white/70">
        <div className="mx-auto max-w-6xl px-5 py-6 text-sm text-slate-600 sm:px-8">
          Converx · Ferramenta informativa de conversão de moedas
        </div>
      </footer>
    </div>
  );
}
