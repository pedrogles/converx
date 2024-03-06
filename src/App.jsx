import { BrowserRouter } from "react-router-dom";
import Routers from "./Routers";
import { Navbar } from "./components/navbar/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {
  // API data
  const [currencys, setCurrencys] = useState(null);
  const [baseCode, setBaseCode] = useState("USD");
  const [newBaseCode, setNewBaseCode] = useState("");
  const [coins, setCoins] = useState([]);
  const [isoCode, setIsoCode] = useState([]);
  
  useEffect(() => {
    axios.get(`https://v6.exchangerate-api.com/v6/2d51d0608b6946a7b1c805f7/latest/${baseCode}`)
    .then(response => {
      setCurrencys(response.data);
    })
  }, [baseCode]);

  useEffect(() => {
    if(currencys) {
      setCoins(Object.entries(currencys.conversion_rates))
      setIsoCode(Object.keys(currencys.conversion_rates))
    }
  }, [currencys]);
  
  return (
    <BrowserRouter>
      <Navbar 
        baseCode={baseCode}
        setBaseCode={setBaseCode}
        newBaseCode={newBaseCode} 
        setNewBaseCode={setNewBaseCode}
        isoCode={isoCode}
      />
      <Routers currencys={currencys} coins={coins}/>
    </BrowserRouter>
  )
};