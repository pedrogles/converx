export function Label({ children, className, ...rest }) {
    return(
        <label className={`text-base md:text-lg ${className}`} {...rest}>
            { children }
        </label>
    );
};