import { Link } from "react-router-dom";
import "./navbar.scss";

export function Navbar({ baseCode, setBaseCode, newBaseCode, setNewBaseCode, isoCode }) { 
    const change_base_code = () => {
        if(isoCode.includes(newBaseCode.toUpperCase())) {
            setBaseCode(newBaseCode)
        } else ( 
            window.alert("Escolha uma moeda válida")
        )
    }
    return (
        <nav id="navbar">
            <h1 id="brand">Converx</h1>
            <div className="base-code-container">
                <p className="base-code">{baseCode.toUpperCase()}</p>
                <input 
                    className="base-code-input" 
                    type="search" 
                    name="search" 
                    id="search" 
                    placeholder="Digite a moeda base..." 
                    onChange={e => setNewBaseCode(e.target.value)}/>
                <button 
                    className="base-code-button"
                    onClick={() => change_base_code(newBaseCode)}>
                    Alterar
                </button>
            </div>
            <ul className="nav-items">
                <li className="item">
                    <Link to="/" className="link" > 
                        Moedas 
                    </Link>
                </li>
                <li className="item">
                    <Link to="/conversao" className="link" > 
                        Conversão 
                    </Link>
                </li>
            </ul>
        </nav>
    )
}