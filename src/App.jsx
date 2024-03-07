import { BrowserRouter } from "react-router-dom";
import Routers from "./Routers";
import { Navbar } from "./components/navbar/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routers />
    </BrowserRouter>
  )
};