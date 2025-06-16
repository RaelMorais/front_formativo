// src/RoutesPath/AppRoutes.jsx
import { Home } from '../pages/home';
import { LoginReact } from '../pages/LoginReact';
import { Routes, Route } from 'react-router-dom'; // Importando o correto 'Routes'

import { PencilLoader } from '../components/pagesComponents/componets/PencilLoader'
import { Diretores } from '../pages/Diretores';
import { Erro } from '../components/pagesComponents/Erro';
import { Layout } from '../pages/Layout';

import { About } from '../components/pagesComponents/About';
import { Salas } from '../components/pagesComponents/Salas';
import { PrivateRoute } from './PrivateRoute';
import { DisciplineProfessor } from '../pages/DisciplinasProfessores';
import { Disciplina } from '../pages/DisciplinaPrincipal';
import { Professores } from '../pages/Professores';

import { CriarProfessor } from '../pages/CrudProfessores/CriarProfessor';
import { DisciplinaCadastro } from '../pages/CrudDisciplinas/CadastroDisciplina';
import { EditarDisciplina } from '../pages/CrudDisciplinas/EditarDisciplina';
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
            <Route path="/salas" element={<Salas />} />
            <Route path='/disciplina' element={<DisciplineProfessor/>}/>
            <Route path='/disciplinas' element={<Disciplina />}/>
            <Route path='/prof' element={<Professores/>}/>
            <Route path='/erro' element={<Erro />} />
            <Route path='/adm' element={<Diretores />}/>
            <Route path='/loading' element={<PencilLoader />}/>
            <Route path='/cadastro' element={<DisciplinaCadastro/>}/>
            <Route path='/editar/:id' element={<EditarDisciplina/>}/>
            <Route path='/professor' element={<CriarProfessor/>}/>
          </Route>
        </Route>
      </Routes>
  );
}