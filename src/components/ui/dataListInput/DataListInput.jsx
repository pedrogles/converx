import { forwardRef } from "react";

export const DataListInput = forwardRef(({ className, list, data, ...rest }, ref) => {
    return(
        <>
            <input 
                className={`border-2 border-gray-400 rounded-md text-md p-2  ${className}`} 
                list={list}
                type="text" 
                ref={ref} 
                {...rest} />
            <datalist id={list}>
                {data.map((item, key) => (
                    <option key={key} value={item}>
                        { item }
                    </option>
                ))}
            </datalist>
        </>
    );
});