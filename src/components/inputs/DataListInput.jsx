import { forwardRef } from "react";

export const DataListInput = forwardRef(({ id, label, labelColor, type, placeholder, list, onChange, data, display }, ref) => {
    return(
        <div className={`${display}`} >
            <label htmlFor={id} className={`text-lg ${labelColor}`}>
                {label}
            </label>
            <input 
                className={`w-full border-2 border-gray-400 rounded-md text-md p-2 focus:outline-[#038C65]`}
                ref={ref}
                id={id}
                type={type}
                placeholder={placeholder} 
                list={list}
                onChange={onChange}
            />
            <datalist id={list}>
                {data.map((item, key) => {
                    return (
                        <option key={key} value={item}>{item}</option>
                    )
                })}
            </datalist>
        </div>
    );
});