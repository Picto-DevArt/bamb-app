import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import RegisterCompany from "./pages/RegisterCompany";
import RegisterClient from "./pages/RegisterClient";
import CompanyDashboard from "./pages/CompanyDashboard";
import NewOffer from "./pages/NewOffer";
import ClientDashboard from "./pages/ClientDashboard";

function App() {
  return (
    <BrowserRouter basename="/bamb-app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro/empresa" element={<RegisterCompany />} />
        <Route path="/registro/cliente" element={<RegisterClient />} />
        <Route path="/empresa/dashboard" element={<CompanyDashboard />} />
        <Route path="/empresa/ofertas/nueva" element={<NewOffer />} />
        <Route path="/cliente/dashboard" element={<ClientDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;