import { Link } from "react-router-dom";
import "./menu.scss";

export function Menu() {
    return (
        <nav id="menu">
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
            <div className="base-code">
                <input className="base-code-input" type="search" name="search" id="search" />
                <button className="base-code-button">send</button>
            </div>
        </nav>
    )
}