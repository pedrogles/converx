export function Spinner() {
    return (
        <div 
            className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"
            role="status" 
            aria-label="Carregando...">
        </div>
    )
}