import { forwardRef } from "react";

export const Button = forwardRef(({ children, className, ...rest }, ref) => {
    return(
        <button 
            ref={ref} 
            className={`text-sm py-2 px-6 rounded-md text-white bg-[#012E40] hover:bg-[#013552] md:text-base ${className}`} 
            {...rest}>
                { children }
        </button>
    );
});