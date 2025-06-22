// Importa o componente NavBar e Footer
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

// Importa Outlet para renderizar rotas filhas e useLocation para pegar o caminho atual
import { Outlet, useLocation } from "react-router-dom";

export function Layout() {
  // Obtém o caminho atual da URL
  const location = useLocation();

  // Verifica se o caminho atual não é '/login'
  // Se não for '/login', mostra NavBar e Footer
  const showLayout = location.pathname !== '/login';

  return (
    <>
      {/* Exibe NavBar somente se showLayout for true */}
      {showLayout && <NavBar />}

      {/* Renderiza o componente filho da rota */}
      <Outlet />

      {/* Exibe Footer somente se showLayout for true */}
      {showLayout && <Footer />}
    </>
  );
}
