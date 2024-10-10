import { useRef, useState } from "react";

export function useNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef();

    const handleOpenMenu = () => {
        if (menuRef.current) {
            menuRef.current.style.top = "4rem";
        };
    };

    const handleCloseMenu = () => {
        if (menuRef.current) {
            menuRef.current.style.top = "-100vh";
        };
    };

    const handleToggleMenu = () => {
        if (isOpen) {
            handleCloseMenu();
        } else {
            handleOpenMenu();
        };
        setIsOpen((prev) => !prev);
    };

    return {
        isOpen,
        menuRef,
        handleToggleMenu,
        handleCloseMenu
    };
};