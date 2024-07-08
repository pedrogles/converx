export default function Input({ id, label, labelColor, value, valueColor, placeholder, type, onChange, display = "block"}) {
    return(
       <div className={display}>
            <label htmlFor={id} className={`${labelColor} text-lg`}>
                {label}
            </label>
            <input 
                id={id}
                className={`${valueColor} w-full border-2 border-gray-400 rounded-md text-md p-2`}   
                type={type}
                placeholder={placeholder} 
                value={value}
                onChange={onChange} 
            />
       </div>
    )
}