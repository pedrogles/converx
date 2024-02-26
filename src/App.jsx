import { useEffect, useState } from "react"
import { Loading } from "./components/loading/Loading";

function App() {
  const [baseCode, setBaseCode] = useState("USD");
  const [newBaseCode, setNewBaseCode] = useState("");
  const [currency, setCurrency] = useState(null);
  const [coins, setCoins] = useState([]);
  const [keyCoins, setKeyCoins] = useState([]);
  
  useEffect(() => {
    fetch(`https://v6.exchangerate-api.com/v6/2d51d0608b6946a7b1c805f7/latest/${baseCode}`)
    .then(response => response.json())
    .then(data => {
      setCurrency(data);
    })
  }, [baseCode]);

  useEffect(() => {
    if(currency) {
      setCoins(Object.entries(currency.conversion_rates))
      setKeyCoins(Object.keys(currency.conversion_rates))
    }
  }, [currency]);

  const change_base_code = (e) => {
    if(keyCoins.includes(newBaseCode.toUpperCase())) {
      setBaseCode(newBaseCode)
    } else ( 
      window.alert("Escolha uma moeda válida")
    )
  }
  console.log("render")

  return (
    <main>
      <input type="search" name="search" id="search" placeholder={baseCode} onChange={e => setNewBaseCode(e.target.value)}/>
      <button onClick={() => change_base_code(newBaseCode)}>send</button>
      
      {
        currency ? 
        <h2>Moeda base:{baseCode}</h2> : 
        <h2>Moeda base: <Loading /></h2>
      }
      
      {
        currency ? 
        coins.map((coin) => {
          return (
            <p key={coin[0]}>{coin[0]}:{coin[1]}</p>

          )
        }): 
        <h2><Loading /></h2>
      }
    </main>
  )
}

export default App
