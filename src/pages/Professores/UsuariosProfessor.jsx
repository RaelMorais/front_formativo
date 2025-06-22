import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function UsuariosProfessor() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/usuarios/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = Array.isArray(response.data) ? response.data : response.data.results;
        setUsuarios(data);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar usuários:', err);
        setError('Erro ao carregar os usuários.');
        setLoading(false);
      }
    };

    getData();
  }, [token]);

  if (loading) return <p>Carregando usuários...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Lista de Usuários</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {usuarios.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition-shadow"
          >
            <h2 className="text-lg font-semibold text-indigo-700 mb-1">{user.username}</h2>
            <p className="text-gray-600"><strong>NI:</strong> {user.ni}</p>
            <p className="text-gray-600"><strong>Telefone:</strong> {user.telefone}</p>
            <p className="text-gray-600"><strong>Gênero:</strong> {user.genero}</p>
            <p className="text-gray-600"><strong>Data de Nascimento:</strong> {user.data_nasc}</p>
            <p className="text-gray-600"><strong>Data de Contratação:</strong> {user.data_contra}</p>
            <p className="text-gray-600"><strong>Cargo:</strong> {user.cargo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
