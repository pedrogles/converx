export function Footer() {
    const currentDate = new Date().getFullYear();
    return (
        <footer className="w-full bg-[#011526] py-10">
            <div className="container mx-auto flex flex-col items-center justify-center text-center text-white gap-1">
                <h3 className="text-sm md:text-base">
                    &copy; {currentDate} Converx. Todos os direitos reservados.
                </h3>
                <p className="text-xs md:text-sm">
                    Dados fornecidos pela <a href="https://www.exchangerate-api.com" className="underline text-red-500" target="_blank" rel="noopener noreferrer">Exchange Rate API</a>.
                </p>
            </div>
        </footer>
    );
}