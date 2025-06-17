import { forwardRef } from "react";

export const SelectInput = forwardRef(({ className, placeholder, data, ...rest }, ref) => {
    return(
        <select 
            ref={ref}
            className={`border-2 border-gray-400 rounded-md text-md p-2  ${className}`}
            {...rest} >
                {placeholder && (
                    <option value="" disabled hidden>
                        { placeholder }
                    </option>
                )}
                {data.map((item, key) => (
                    <option key={key} value={item}>
                        { item }
                    </option>
                ))}
        </select>
    );
});