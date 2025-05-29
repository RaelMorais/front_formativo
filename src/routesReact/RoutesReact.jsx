// src/RoutesPath/AppRoutes.jsx
import { Home } from '../pages/home';
import { LoginReact } from '../pages/LoginReact';
import { Routes, Route } from 'react-router-dom'; // Importando o correto 'Routes'

import { Layout } from '../pages/Layout';

import { About } from '../components/pagesComponents/About';
import { Suport } from '../components/pagesComponents/Suport';
import { Salas } from '../components/pagesComponents/Salas';
import { PrivateRoute } from './PrivateRoute';
import { DisciplineProfessor } from '../pages/DisciplineDirector';
export function RoutesReact() {
  return (
      <Routes>
        {/* Página de login fora do layout */}
        <Route path="/" element={<LoginReact />} />

        {/* Rotas protegidas com layout */}
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/suport" element={<Suport />} />
            <Route path="/salas" element={<Salas />} />
            <Route path='/disciplina' element={<DisciplineProfessor/>}/>
          </Route>
        </Route>
      </Routes>
  );
}