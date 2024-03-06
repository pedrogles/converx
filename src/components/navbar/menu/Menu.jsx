import { Link } from "react-router-dom";
import { RiCoinsLine } from "react-icons/ri";
import { MdCurrencyExchange } from "react-icons/md";

export function Menu({ baseCode, newBaseCode, setNewBaseCode, change_base_code, handle_close_menu }) {
    return (
        <div id="menu" className="absolute bg-blue-900 w-full flex items-center flex-col-reverse gap-12 -z-10 top-0 vh-negative-top duration-700 ease-in-out px-6 pt-8 pb-12 md:pt-20 md:pb-20 md:gap-14">
            <div className="flex flex-col justify-center gap-4 flex-wrap md:gap-6">
                <div className="flex justify-center items-center flex-wrap gap-2 md:gap-4">
                    <p className="text-base text-white md:text-xl" >{baseCode.toUpperCase()}</p>
                    <input 
                        className="w-28 rounded-sm text-sm p-2 focus:outline-rose-600 md:w-36 md:text-lg"
                        type="search" 
                        name="search" 
                        id="search" 
                        placeholder="Moeda base" 
                        onChange={e => setNewBaseCode(e.target.value)}
                    />
                </div>
                <button 
                    className="bg-white w-full text-sm py-2 rounded-sm md:text-lg"
                    onClick={() => change_base_code(newBaseCode)}>
                    Alterar
                </button>
            </div>
            <nav>
                <ul className="flex flex-col items-center gap-6 md:gap-10">
                    <li>
                        <Link to="/" className="flex items-center gap-2 text-2xl text-white md:text-3xl" onClick={handle_close_menu} > 
                            <RiCoinsLine /> Moedas 
                        </Link>
                    </li>
                    <li >
                        <Link to="/conversao" className="flex items-center gap-2 text-2xl text-white md:text-3xl" onClick={handle_close_menu} > 
                           <MdCurrencyExchange /> Conversão 
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}