export function Footer() {
    return (
        <footer className="w-full bg-[#011526] py-10">
            <div className="container mx-auto flex flex-col items-center justify-center text-center text-white space-y-4">
                {/* Copyright */}
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Converx. Todos os direitos reservados.
                </p>

                {/* Disclaimer about the API */}
                <p className="text-sm">
                    Dados fornecidos pela <a href="https://www.exchangerate-api.com" className="underline text-red-500" target="_blank" rel="noopener noreferrer">Exchange Rate API</a>.
                </p>
            </div>
        </footer>
    );
}