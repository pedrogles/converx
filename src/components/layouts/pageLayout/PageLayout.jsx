import { Navbar, Footer } from "../..";

export function PageLayout({ children }) {
    return (
        <>
            <Navbar />
            <main className="min-h-screen p-4 pt-20 pb-10 flex flex-col gap-6 bg-stone-50 md:pt-28 md:pb-14 md:gap-8">
                { children }
            </main>
            <Footer />
        </>
    )
}