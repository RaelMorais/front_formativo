import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // ícones do Lucide (você pode usar Heroicons ou outro também)

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white/90 text-black shadow-lg">
      <div className="container mx-auto flex items-center justify-between h-24 px-4">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <img
            className="h-16"
            src="https://i.ibb.co/6Yxs70d/2021-10-26-23h27-03.png"
            alt="Logo"
          />
          <span className="ml-4 uppercase font-black leading-tight">
            educar
            <br />
            tecnologia
          </span>
        </a>

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
              <Link to="/about" className="hover:text-blue-400 transition-colors">Sobre</Link>
            </li>
            <li>
              <Link to="/suport" className="hover:text-blue-400 transition-colors">Professores</Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-blue-400 transition-colors">Disciplinas</Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-blue-400 transition-colors">Reservas</Link>
            </li>
          </ul>
        </nav>

        {/* Botão Logout - desktop */}
        <div className="hidden md:block">
          <button className="rounded-full font-bold px-8 py-2 hover:bg-red-700 hover:text-white transition">
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
              <Link to="/suport" onClick={() => setIsOpen(false)}>Professores</Link>
            </li>
            <li>
              <Link to="/products" onClick={() => setIsOpen(false)}>Disciplinas</Link>
            </li>
            <li>
              <Link to="/blog" onClick={() => setIsOpen(false)}>Reservas</Link>
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
