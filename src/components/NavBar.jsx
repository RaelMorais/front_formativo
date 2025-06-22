import { Link, useNavigate } from 'react-router-dom';
import { useState, } from 'react';
import { Menu, X } from 'lucide-react'; // ícones do Lucide (você pode usar Heroicons ou outro também)

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const tipo = localStorage.getItem('cargo'); 


    const linkDisciplina = tipo === 'P' ? '/disciplina-professor' : '/disciplina-diretor';   
    const linkSala = tipo === 'P' ? '/salas-professor' : '/salas'; 
    const linkReserva = tipo === 'P' ? '/reservas-professor' : '/exibir-reserva'
    const linkDiretor = tipo === 'P' ? '/usuarios-professor' : '/diretores'; 

  function Logout(){

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('nome');
    localStorage.removeItem('tipo');
    
    navigate('/');
  }
  return (
    // shadow-lg
    <header className="bg-white/90 text-black ">
      <div className="container mx-auto flex items-center justify-between h-24 px-4">
        {/* Logo */}
         <Link to='/home'>
        <a href="#" className="flex items-center">
          <img
            className="h-16"
            src="https://images.vexels.com/media/users/3/224234/isolated/preview/ff7c525c1c3e1bef640644542001e1fd-logotipo-da-escola-online.png"
            alt="Logo"
          />
          <span className="ml-4 uppercase font-black leading-tight">
            educar
            <br />
            tecnologia
          </span>
        </a>
        </Link>

        {/* Botão do menu mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Menu de navegação */}
        <nav className="hidden md:block font-semibold text-base lg:text-lg">
          <ul className="flex items-center space-x-6">
            <li>
              <Link to="/home" className="hover:text-blue-400 transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/sobre-nos" className="hover:text-blue-400 transition-colors">Sobre</Link>
            </li>
            <li>
              <Link to={linkSala} className="hover:text-blue-400 transition-colors">Salas</Link>
            </li>
            <li>
              <Link to={linkDisciplina} className="hover:text-blue-400 transition-colors">Disciplinas</Link>
            </li>
            <li>
              <Link to={linkReserva} className="hover:text-blue-400 transition-colors">Reservas</Link>
            </li>
          </ul>
        </nav>

        {/* Botão Logout - desktop */}
        <div className="hidden md:block">
          <button 
          className="rounded-md font-bold px-8 py-2 hover:bg-red-700 hover:text-white transition"
          onClick={Logout}>
            Logout
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden bg-white/95 shadow-md px-4 py-6">
          <ul className="space-y-4 font-medium">
            <li>
              <Link to="/home" onClick={() => setIsOpen(false)}>Home</Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setIsOpen(false)}>Sobre</Link>
            </li>
            <li>
              <Link to={linkSala} onClick={() => setIsOpen(false)}>Salas</Link>
            </li>
            <li>
              <Link to={linkDisciplina} onClick={() => setIsOpen(false)}>Disciplinas</Link>
            </li>
            <li>
              <Link to={linkReserva} onClick={() => setIsOpen(false)}>Reservas</Link>
            </li>
            <li>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full text-left font-bold px-4 py-2 rounded-full bg-red-600 text-white"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
