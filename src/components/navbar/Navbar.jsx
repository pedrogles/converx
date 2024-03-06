import { Menu } from "./menu/Menu";

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
        <header className="fixed w-full h-16">
            <div className="bg-blue-900 h-full z-0 flex justify-between items-center">
                <h1 className="text-2xl text-white font-extrabold ml-6">Converx</h1>
                <MdMenu id="openIcon" className="text-3xl text-white mr-6 lg:hidden" onClick={handle_open_menu}/>
                <MdClose id="closeIcon" className="text-3xl text-white mr-6 hidden" onClick={handle_close_menu}/>
                <Menu 
                    baseCode={baseCode} 
                    newBaseCode={newBaseCode} 
                    setNewBaseCode={setNewBaseCode} 
                    change_base_code={change_base_code} 
                    handle_close_menu={handle_close_menu}
                />
            </div>
        </header>
    )
}