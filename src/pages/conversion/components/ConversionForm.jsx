import { Button, Label, Input, SelectInput, Fieldset, ErrorMessage } from "../../../components";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { MdCurrencyExchange } from "react-icons/md";
import { useSupportedCodesContext } from "../hooks/useSupportedCodesContext";
import { useForm } from "react-hook-form";
import { getPairConversion } from "../../../services/exchageAPI";

export function ConversionForm({ onConversion }) {
    const { supportedCodes } = useSupportedCodesContext();
    const { 
        register, 
        handleSubmit, 
        getValues, 
        setValue,
        formState: { errors } } = useForm({
            defaultValues: {
                fromCurrencyFullName: '',
                toCurrencyFullName: '',
                amount: ''
            }
        });
    
    const onSubmit = (data) => {
        const formatedData = formatData(data);
        getPairConversion(formatedData.fromCurrencyFullName, formatedData.toCurrencyFullName, formatedData.amount)
            .then((response) => {
                onConversion({
                    ...response,
                    ...data
                });
            }
            // Adicionar catch com toast de erro de conversão.
        );
    };

    const handleInvertCoins = (event) => {
        event.preventDefault();
        const from = getValues("fromCurrencyFullName");
        const to = getValues("toCurrencyFullName");
        setValue("fromCurrencyFullName", to);
        setValue("toCurrencyFullName", from);
    };
    
    const formatData = (data) => {
        // Regex para extrair código ISO da string
        const formatRegex = (value) => value.match(/\(([^)]+)\)/)[1];
        return {
            ...data,
            fromCurrencyFullName: formatRegex(data.fromCurrencyFullName),
            toCurrencyFullName: formatRegex(data.toCurrencyFullName)
        }
    }
    return (
        <form className="flex flex-col items-start gap-4 p-8 w-full bg-gray-100 rounded-t-lg md:min-h-20 md:flex-row" onSubmit={handleSubmit(onSubmit)}>
            <Fieldset>
                <Label htmlFor="amount">Valor:</Label>
                <Input 
                    id="amount" 
                    className="w-full h-10" 
                    placeholder="0,00"
                    {...register("amount", { 
                        required: "Campo Obrigatorio", 
                        pattern: {
                            value: /^\d+([.,]\d{1,2})?$/,
                            message: "Digite um número válido",
                    }})}/>
                {errors.amount && <ErrorMessage>{errors.amount.message}</ErrorMessage>}
            </Fieldset>
            <Fieldset>
                <Label htmlFor="fromCurrencyFullName">Converter de:</Label>
                <SelectInput 
                    id="fromCurrencyFullName" 
                    className="w-full h-10" 
                    placeholder="Selecione uma moeda"
                    data={supportedCodes} 
                    {...register("fromCurrencyFullName", { required: "Campo Obrigatorio" })}/>
                {errors.from && <ErrorMessage>{errors.from.message}</ErrorMessage>}
            </Fieldset>
            <Button 
                className="flex justify-center items-center h-10 w-full md:mt-9 md:max-w-20" 
                title="Inverter moedas"
                type="button"
                onClick={handleInvertCoins}>
                    <CgArrowsExchangeAltV 
                        className="text-2xl rotate-90 text-white lg:text-3xl"/>
            </Button>
            <Fieldset>
                <Label htmlFor="toCurrencyFullName">Para:</Label>
                <SelectInput 
                    id="toCurrencyFullName" 
                    className="w-full h-10" 
                    placeholder="Selecione uma moeda"
                    data={supportedCodes} 
                    {...register("toCurrencyFullName", { required: "Campo Obrigatorio" })}/>
                {errors.to && <ErrorMessage>{errors.to.message}</ErrorMessage>}
            </Fieldset>
            <Button 
                className="flex justify-center items-center h-10 w-full md:mt-9 md:max-w-20" 
                title="Converter moedas" 
                type="submit">
                    <MdCurrencyExchange 
                        className="text-lg text-white md:text-xl"/>
            </Button>
        </form>
    )
} 