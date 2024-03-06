import { Menu } from "./menu/Menu";
import { Link } from "react-router-dom";
import { RiCoinsLine } from "react-icons/ri";
import { MdCurrencyExchange } from "react-icons/md";
import { MdMenu, MdClose } from "react-icons/md";

export function Navbar({ baseCode, setBaseCode, newBaseCode, setNewBaseCode, isoCode }) { 
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
    const change_base_code = () => {
        if(isoCode.includes(newBaseCode.toUpperCase())) {
            setBaseCode(newBaseCode)
            handle_close_menu();
        } else ( 
            window.alert("Escolha uma moeda válida")
        )
    };
    return (
        <>
            {/* Mobile/Tablet */}
            <header className="fixed w-full h-16 md:h-24 lg:hidden">
                <div className="bg-blue-900 h-full z-0 flex justify-between items-center">
                    <h2 className="text-2xl text-white font-extrabold ml-6 md:text-3xl">Converx</h2>
                    <MdMenu id="openIcon" className="text-3xl text-white mr-6 md:text-4xl lg:hidden" onClick={handle_open_menu}/>
                    <MdClose id="closeIcon" className="text-3xl text-white mr-6 md:text-4xl hidden" onClick={handle_close_menu}/>
                    <Menu 
                        baseCode={baseCode} 
                        newBaseCode={newBaseCode} 
                        setNewBaseCode={setNewBaseCode} 
                        change_base_code={change_base_code} 
                        handle_close_menu={handle_close_menu}
                    />
                </div>
            </header>
            {/* Desktop */}
            <header className="fixed w-full h-24 hidden lg:block">
                <div className="bg-blue-900 h-full flex justify-between items-center">
                    <h2 className="text-3xl text-white font-extrabold ml-10">Converx</h2>
                    <div className="flex justify-center items-center gap-4">
                        <p className="text-lg text-white" >{baseCode.toUpperCase()}</p>
                        <input 
                            className="w-40 rounded-sm text-md p-2 focus:outline-rose-600"
                            type="search" 
                            name="search" 
                            placeholder="Moeda base" 
                            onChange={e => setNewBaseCode(e.target.value)}
                        />
                        <button 
                            className="bg-white text-sm py-2 px-6 rounded-sm"
                            onClick={() => change_base_code(newBaseCode)}>
                            Alterar
                        </button>
                    </div>
                    <nav>
                        <ul className="flex items-center gap-10 mr-10">
                            <li>
                                <Link to="/" 
                                    className="flex items-center gap-2 text-2xl text-white" 
                                    onClick={handle_close_menu}> 
                                    <RiCoinsLine /> Moedas 
                                </Link>
                            </li>
                            <li>
                                <Link to="/conversao" 
                                    className="flex items-center gap-2 text-2xl text-white" 
                                    onClick={handle_close_menu}> 
                                <MdCurrencyExchange /> Conversão 
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
}