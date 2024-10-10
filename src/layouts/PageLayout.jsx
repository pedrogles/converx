import { Footer, Navbar } from "../components";

export function PageLayout({ children }) {
    return(
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
};