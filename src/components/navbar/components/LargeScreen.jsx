import { Link } from "react-router-dom";
import { sections } from "../../../utils/pageSections";

export function LargeScreen() { 
    return (
        <header className="fixed w-full h-24 hidden lg:block">
            <div className="bg-[#011526] h-full flex justify-between items-center">
                <h2 className="text-3xl text-white font-extrabold ml-10">Converx</h2>
                <nav>
                    <ul className="flex items-center gap-10 mr-10">
                        {sections.map((section) => {
                            return (
                                <li key={section.id}>
                                    <Link to={section.path} className="flex items-center gap-2 text-2xl text-white"> 
                                        <span className="text-xl">{section.symbol}</span> 
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