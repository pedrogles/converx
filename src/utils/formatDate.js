export const formatDate = (date) => {
    return new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'long',
        timeStyle: 'short',
        timeZone: 'UTC',
    }).format(new Date(date));
}