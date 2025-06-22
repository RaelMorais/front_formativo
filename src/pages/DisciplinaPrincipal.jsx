import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus } from 'lucide-react';

export function Disciplina() {
  // Estado para armazenar as disciplinas obtidas da API
  const [disciplinas, setDisciplina] = useState([]);

  // Hook que executa o efeito colateral de buscar os dados da API ao montar o componente
  useEffect(() => {
    // Recupera o token de autenticação do localStorage
    const token = localStorage.getItem('access_token');

    // Requisição GET para buscar a lista de disciplinas
    axios.get('http://127.0.0.1:8000/disciplinas/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        // Atualiza o estado com os dados recebidos
        setDisciplina(response.data);
      })
      .catch(error => {
        // Caso ocorra erro, mostra no console
        console.error('error', error);
      });

    // Essa segunda chamada axios.get está vazia (sem URL), parece não ser necessária
    axios.get('', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }, []) // O array vazio garante que o efeito rode apenas uma vez, no carregamento inicial

  // Função para excluir uma disciplina após confirmação do usuário
  const handleDelete = (id) => {
    // Confirmação do usuário antes de excluir
    const confirmar = window.confirm('Tem certeza que deseja excluir esta disciplina?');
    if (!confirmar) return; // Se não confirmar, sai da função

    // Pega novamente o token do localStorage
    const token = localStorage.getItem('access_token');

    // Requisição DELETE para excluir a disciplina com o id especificado
    axios.delete(`http://127.0.0.1:8000/disciplina/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(() => {
        // Exibe alerta de sucesso e atualiza o estado removendo a disciplina excluída da lista
        alert('Disciplina excluída com sucesso!');
        setDisciplina(prev => prev.filter(dis => dis.id !== id));
      })
      .catch(error => {
        // Exibe erro no console e alerta o usuário em caso de falha
        console.error('Erro ao excluir disciplina:', error);
        alert('Erro ao excluir a disciplina.');
      });
  };

  return (
    <>
      <div className="p-6">
        {/* Título da página */}
        <h2 className="text-2xl font-bold mb-6">Disciplinas</h2>

        {/* Link para a página de cadastro de nova disciplina */}
        <Link to="/disciplina-cadastro">
          <Plus className="w-10 h-10 text-black-500 hover:text-blue-700 transition" />
        </Link>

        <br />

        {/* Grid que mostra cada disciplina como um cartão */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {disciplinas.map((disciplina) => (
            <div
              key={disciplina.id}
              className="bg-white shadow-md rounded-2xl p-4 border hover:shadow-lg transition-shadow"
            >
              {/* Ícones de excluir e editar no topo do cartão */}
              <div className="flex justify-between mb-2">
                {/* Ícone de excluir chama handleDelete */}
                <Trash2
                  className="w-7 h-7 text-red-500 hover:text-red-700 transition cursor-pointer"
                  onClick={() => handleDelete(disciplina.id)}
                />

                {/* Link para editar a disciplina */}
                <Link to={`/disciplina-editar/${disciplina.id}`}>
                  <Edit className="w-7 h-7 text-blue-500 hover:text-blue-700 transition cursor-pointer" />
                </Link>
              </div>

              {/* Informações da disciplina */}
              <h3 className="text-lg font-semibold text-indigo-700">{disciplina.nome}</h3>
              <p className="text-gray-600">Curso: {disciplina.curso}</p>
              <p className="text-gray-600">Carga Horária: {disciplina.carga_horaria}h</p>
              <p className="text-gray-600">Descrição: {disciplina.desc}</p>
              <p className="text-gray-600">Professor: {disciplina.professor_name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
