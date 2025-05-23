// src/RoutesPath/AppRoutes.jsx
import { Home } from '../pages/home';
import { LoginReact } from '../pages/LoginReact';
import { Routes, Route } from 'react-router-dom'; // Importando o correto 'Routes'

import { Layout } from '../pages/Layout';

import { About } from '../components/pagesComponents/About';
import { Suport } from '../components/pagesComponents/Suport';
import { Salas } from '../components/pagesComponents/Salas';

export function RoutesReact() {
  return (
     <Routes>
      {/* Login fora do layout */}
      <Route path="/login" element={<LoginReact />} />

      {/* Rotas que usam o Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} /> {/* Sobre nós */}
        <Route path="/suport" element={<Suport />} /> {/* Disciplinas */}
        <Route path="/Salas" element={<Salas />} /> {/* Salas */}
      </Route>
    </Routes>
  );
}