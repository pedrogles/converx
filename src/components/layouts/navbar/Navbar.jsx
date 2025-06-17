import { Typography } from "../../ui/typography/Typography";

export function Navbar() { 
    return (
        <header className="fixed flex justify-start items-center h-16 w-full md:h-20 bg-[#011526]">
            <Typography as="h1" className="text-2xl text-white font-extrabold italic ml-4 md:text-3xl">
                Converx
            </Typography>
        </header>
    );
};