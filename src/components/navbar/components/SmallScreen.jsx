import { Link } from "react-router-dom";
import { useNavbar } from "../../../hooks";
import { MdMenu, MdClose } from "react-icons/md";
import { sections } from "../../../utils/pageSections";

export function SmallScreen() { 
    const { isOpen, menuRef, handleToggleMenu, handleCloseMenu } = useNavbar();
    return (
        <header className="fixed w-screen h-16 md:h-24 lg:hidden">
            <div className="bg-[#011526] h-full flex justify-between items-center">
                <h2 className="text-2xl text-white font-extrabold ml-6 md:text-3xl">Converx</h2>
                {isOpen && 
                <MdClose 
                    id="closeIcon" 
                    className="text-3xl text-white mr-6 md:text-4xl" 
                    onClick={handleToggleMenu} 
                />}
                {!isOpen && 
                <MdMenu 
                    id="openIcon" 
                    className="text-3xl text-white mr-6 md:text-4xl" 
                    onClick={handleToggleMenu} 
                />}
            </div>
            {/* Menu */}
            <div ref={menuRef} className="absolute bg-[#011526] w-full flex items-center -z-10 flex-col gap-12 top-0 vh-negative-top duration-700 ease-in-out px-6 pt-8 pb-12 shadow-md md:pt-20 md:pb-20 md:gap-14">
                <nav>
                    <ul className="flex flex-col items-center gap-6 md:gap-10">
                        {sections.map((section) => {
                            return (
                                <li key={section.id}>
                                    <Link to={section.path} className="flex items-center gap-2 text-2xl text-white md:text-3xl" onClick={handleCloseMenu} > 
                                        <span className="text-lg md:text-2xl">{section.symbol}</span> 
                                        {section.name} 
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </div>
        </header>
    );
};