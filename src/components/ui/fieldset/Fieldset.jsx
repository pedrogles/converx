export function Fieldset({ children }) {
    return(
        <fieldset className="flex flex-col w-full gap-2 md:w-1/3">
            { children }
        </fieldset>
    )
}