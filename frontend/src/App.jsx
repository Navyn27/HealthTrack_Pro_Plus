import "./App.css";
import ChartData from "./assets/pages/ChartData";
import TableData from "./assets/pages/TableData";
import Logo from "./assets/icons/Logo.svg";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRef } from "react";

const App = () => {
  const appBody = useRef(null);
  return (
    <div className="mt-10 grid place-items-center">
      <img className="w-[22rem] ml-72" src={Logo} alt="Logo" />
      <BrowserRouter>
        <div ref={appBody} className="ml-36 w-full">
          <Routes>
            <Route path="/" element={<ChartData />} />
            <Route path="/chart" element={<ChartData />} />
            <Route className="mt-72" path="/table" element={<TableData />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
