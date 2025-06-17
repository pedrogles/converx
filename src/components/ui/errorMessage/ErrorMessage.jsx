export function ErrorMessage({ className, children, ...rest }) {
    return(
        <span className={`text-sm text-red-600 ${className}`} {...rest}>
            { children }
        </span>
    )
}