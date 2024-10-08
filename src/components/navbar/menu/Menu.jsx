import { Link } from "react-router-dom";
import { RiCoinsLine } from "react-icons/ri";
import { MdCurrencyExchange } from "react-icons/md";

export function Menu({ handle_close_menu }) {
    return (
        <div id="menu" className="absolute bg-[#011526] w-full flex items-center flex-col gap-12 -z-10 top-0 vh-negative-top duration-700 ease-in-out px-6 pt-8 pb-12 shadow-md md:pt-20 md:pb-20 md:gap-14">
            <nav>
                <ul className="flex flex-col items-center gap-6 md:gap-10">
                    <li>
                        <Link to="/" className="flex items-center gap-2 text-2xl text-white md:text-3xl" onClick={handle_close_menu} > 
                            <RiCoinsLine className="text-lg md:text-2xl"/> Conversão 
                        </Link>
                    </li>
                    <li >
                        <Link to="/moedas" className="flex items-center gap-2 text-2xl text-white md:text-3xl" onClick={handle_close_menu} > 
                           <MdCurrencyExchange className="text-lg md:text-2xl" />  Moedas
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}