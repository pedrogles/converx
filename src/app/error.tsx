"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-5 py-16 text-center">
      <h1 className="text-3xl font-black text-slate-950">Algo não saiu como esperado</h1>
      <p className="mt-4 leading-7 text-slate-600">
        Não foi possível carregar a página. Tente novamente em alguns instantes.
      </p>
      <button
        className="mx-auto mt-6 min-h-12 rounded-xl bg-cyan-700 px-5 py-3 font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700"
        onClick={reset}
        type="button"
      >
        Tentar novamente
      </button>
    </main>
  );
}
