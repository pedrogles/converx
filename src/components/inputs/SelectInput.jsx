import { forwardRef } from "react";

export const SelectInput = forwardRef(({ id, label, data, onChange, value }, ref) => {
    return(
        <div className="flex flex-col gap-2 items-start w-full">
            <label htmlFor={id} className="text-white text-base md:text-xl md:gap-4">
                {label}
            </label>
            <select 
                ref={ref}
                id={id} 
                className="bg-[#012E40] text-white border-[#012E40] p-2 w-full border-2 rounded-md"
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