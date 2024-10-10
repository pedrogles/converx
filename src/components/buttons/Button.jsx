import { forwardRef } from "react";

export const Button = forwardRef(({ id, className, text, onClick }, ref) => {
    return(
        <button 
            id={id}
            ref={ref}
            className={`${className}`}
            onClick={onClick}>
                {text}
        </button>
    );
});