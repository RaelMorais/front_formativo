// Importa os componentes Footer, Main e NavBar
import { Footer } from "../components/Footer";
import { Main } from "../components/Main";
import { NavBar } from "../components/NavBar";

// Componente funcional Home
export function Home() {
  return (
    <>
      {/* Renderiza o componente Main */}
      <Main />
      {/* Você poderia adicionar NavBar e Footer aqui se quiser */}
    </>
  );
}
