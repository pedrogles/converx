import { RiCoinsLine } from "react-icons/ri";
import { MdCurrencyExchange } from "react-icons/md";

export const sections = [
    {
        id: 1,
        path: '/',
        name: 'Conversão',
        symbol: <MdCurrencyExchange />
    },
    {
        id: 2,
        path: '/moedas',
        name: 'Moedas',
        symbol: <RiCoinsLine />
    }
];