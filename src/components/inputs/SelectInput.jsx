import { forwardRef } from "react";

export const SelectInput = forwardRef(({ id, label, labelColor, selectBgColor, selectTextColor, display, data, onChange, value, borderColor }, ref) => {
    return(
        <div className={display}>
            <label htmlFor={id} className={`${labelColor} text-base md:text-xl md:gap-4`}>
                {label}
            </label>
            <select 
                ref={ref}
                id={id} 
                className={`${selectBgColor} ${selectTextColor} ${borderColor} p-2 w-full border-2 rounded-md"`} 
                onChange={onChange}
                value={value} >
                    {data.map((item, key) => {
                        return (
                            <option key={key} value={item}>{item}</option>
                        )
                    })}
            </select>
        </div>
    );
});