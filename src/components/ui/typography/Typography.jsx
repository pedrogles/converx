export function Typography({ as: Tag = 'p', children, className = '', ...rest}) {
    const styleByTag = {
        h1: "font-bold text-black",
        h2: "font-semibold text-black",
        h3: "font-semibold text-black",
    };

    const styleTag = styleByTag[Tag] || " font-normal text-black";

    return(
        <Tag className={`${styleTag} ${className}`} {...rest}>
            { children }
        </Tag>
    )
}