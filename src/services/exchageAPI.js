import axios from "axios"

const baseUrl =  import.meta.env.VITE_BASE_URL;

export const getPairConversion = (base, target, amount) => {
    return axios.get(`${baseUrl}/pair/${base}/${target}/${amount}`)
        .then((response) => {
            const data = response.data;
            return {
                lastUpdate: data.time_next_update_utc,
                fromCurrencyCode: data.base_code,
                toCurrencyCode: data.target_code,
                conversionRate: data.conversion_rate,
                conversionResult: data.conversion_result
            };
            
        })
        .catch((error) => {
            console.error("Falha ao realizar a conversão: ", error);
            throw error;
        })
}

export const getSupportedCodes = () => {
    return axios.get(`${baseUrl}/codes`)
        .then((response) => {
            const data = response.data;
            return data.supported_codes;
        })
        .catch((error) => {
            console.error("Falha ao realizar a requisição: ", error);
            throw error;
        })
}