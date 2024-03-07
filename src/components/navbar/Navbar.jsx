import { Menu } from "./menu/Menu";
import { Link } from "react-router-dom";
import { RiCoinsLine } from "react-icons/ri";
import { MdCurrencyExchange } from "react-icons/md";
import { MdMenu, MdClose } from "react-icons/md";

export function Navbar() { 
    const handle_open_menu = () => {
        const menu = document.getElementById("menu");
        const closeIcon = document.getElementById("closeIcon");
        const openIcon = document.getElementById("openIcon");
        openIcon.classList.add("hidden");
        closeIcon.classList.remove("hidden");
        menu.style.top = "4rem";
    };
    const handle_close_menu = () => {
        const menu = document.getElementById("menu");
        const closeIcon = document.getElementById("closeIcon");
        const openIcon = document.getElementById("openIcon");
        openIcon.classList.remove("hidden");
        closeIcon.classList.add("hidden");
        menu.style.top = "-100vh"
    };
    return (
        <>
            {/* Mobile/Tablet */}
            <header className="fixed w-full h-16 md:h-24 lg:hidden">
                <div className="bg-blue-900 h-full z-0 flex justify-between items-center">
                    <h2 className="text-2xl text-white font-extrabold ml-6 md:text-3xl">Converx</h2>
                    <MdMenu id="openIcon" className="text-3xl text-white mr-6 md:text-4xl lg:hidden" onClick={handle_open_menu}/>
                    <MdClose id="closeIcon" className="text-3xl text-white mr-6 md:text-4xl hidden" onClick={handle_close_menu}/>
                    <Menu handle_close_menu={handle_close_menu}/>
                </div>
            </header>
            {/* Desktop */}
            <header className="fixed w-full h-24 hidden lg:block">
                <div className="bg-blue-900 h-full flex justify-between items-center">
                    <h2 className="text-3xl text-white font-extrabold ml-10">Converx</h2>
                    <nav>
                        <ul className="flex items-center gap-10 mr-10">
                            <li>
                                <Link to="/" className="flex items-center gap-2 text-2xl text-white" onClick={handle_close_menu}> 
                                    <RiCoinsLine className="text-xl" /> Moedas 
                                </Link>
                            </li>
                            <li>
                                <Link to="/conversao" className="flex items-center gap-2 text-2xl text-white" onClick={handle_close_menu}> 
                                    <MdCurrencyExchange className="text-xl" /> Conversão 
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
}