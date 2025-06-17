import { forwardRef } from "react";

export const Input = forwardRef(({ className, ...rest }, ref) => {
    return(
       <input 
            className={`border-2 border-gray-400 rounded-md text-md p-2 ${className}`}   
            ref={ref}
            {...rest} 
        />
    );
});