import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-5 py-16 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-800">Erro 404</p>
      <h1 className="mt-3 text-4xl font-black text-slate-950">Página não encontrada</h1>
      <p className="mt-4 leading-7 text-slate-600">
        O endereço informado não existe ou não está mais disponível.
      </p>
      <Link
        className="mx-auto mt-6 inline-flex min-h-12 items-center rounded-xl bg-cyan-700 px-5 py-3 font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700"
        href="/"
      >
        Voltar ao conversor
      </Link>
    </main>
  );
}
