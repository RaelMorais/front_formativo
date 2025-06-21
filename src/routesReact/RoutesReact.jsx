// src/RoutesPath/AppRoutes.jsx
import { Home } from '../pages/home';
import { LoginReact } from '../pages/LoginReact';
import { Routes, Route } from 'react-router-dom'; // Importando o correto 'Routes'

import { PencilLoader } from '../components/pagesComponents/componets/PencilLoader'
import { Diretores } from '../pages/Diretores';
import { Erro } from '../components/pagesComponents/Erro';
import { Layout } from '../pages/Layout';

import { About } from '../components/pagesComponents/About';
import { Salas } from '../pages/Salas';
import { PrivateRoute } from './PrivateRoute';
import { DisciplineProfessor } from '../pages/DisciplinasProfessores';
import { Disciplina } from '../pages/DisciplinaPrincipal';
import { Professores } from '../pages/Professores';

import { CriarProfessor } from '../pages/CrudProfessores/CriarProfessor';
import { EditarProfessor } from '../pages/CrudProfessores/EditarProfessor';
import { DisciplinaCadastro } from '../pages/CrudDisciplinas/CadastroDisciplina';
import { EditarDisciplina } from '../pages/CrudDisciplinas/EditarDisciplina';
import { CriarDiretor } from '../pages/CrudDiretores/CriarDiretor';
import { EditarDiretor } from '../pages/CrudDiretores/EditarDiretores';
import { Reservas } from '../pages/Reservas';
import { CriarReserva } from '../pages/CrudReserva/CriarReserva';
import { EditarReserva } from '../pages/CrudReserva/EditarReserva';
export function RoutesReact() {
  return (
      <Routes>
        {/* Página de login fora do layout */}
        <Route path="/" element={<LoginReact />} />

        {/* Rotas protegidas com layout */}
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
          {/* Navegação do sistema */}
            <Route path="/home" element={<Home />} />
            <Route path="/sobre-nos" element={<About />} />
            <Route path='/erro' element={<Erro />} />
            <Route path='/loading' element={<PencilLoader />}/>

          {/* Para CRUD de salas, com diferenciação pelo cargo do usuario*/}
            <Route path="/salas" element={<Salas />} />
          
          {/* Para CRUD de disciplina, com diferenciação pelo cargo do usuario */}
            <Route path='/disciplina-professor' element={<DisciplineProfessor/>}/>
            <Route path='/disciplina-diretor' element={<Disciplina />}/>
            <Route path='/disciplina-cadastro' element={<DisciplinaCadastro/>}/>
            <Route path='/disciplina-editar/:id' element={<EditarDisciplina/>}/>



            {/* Para usuarios: Cargo diretor e Professor */}
            <Route path='/professores' element={<Professores/>}/>
            <Route path='/criar-professor' element={<CriarProfessor/>}/>
            <Route path='/editar-professor/:id' element={<EditarProfessor />}/>
            <Route path='/diretores' element={<Diretores />}/>
            <Route path='/criar-diretor' element={<CriarDiretor/>}/>
            <Route path='/editar-diretor/:id' element={<EditarDiretor/>}/>

            {/* Para reservas, onde somente cargos ADM e D, podem realizar operações além do GET */}
            <Route path='/exibir-reserva' element={<Reservas/>}/>
            <Route path='/criar-reserva' element={<CriarReserva/>}/>
            <Route path='/editar-reserva/:id' element={<EditarReserva/>}/>
          </Route>
        </Route>
      </Routes>
  );
}