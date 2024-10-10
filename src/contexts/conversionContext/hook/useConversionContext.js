import { useContext } from "react";
import { ConversionContext } from "../ConversionContext";

export function useConversionContext() {
    return useContext(ConversionContext);
};