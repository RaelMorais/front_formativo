import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus } from 'lucide-react';

export function Salas() {
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/salas/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSalas(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar salas');
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleDelete = (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta sala?')) return;

    axios
      .delete(`http://127.0.0.1:8000/sala/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setSalas((prev) => prev.filter((s) => s.id !== id));
        alert('Sala excluída com sucesso!');
      })
      .catch((err) => {
        console.error(err);
        alert('Erro ao excluir sala.');
      });
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Gerenciar Salas</h2>

      <Link to="/criar-sala">
        <Plus className="w-10 h-10 text-black-500 hover:text-blue-700 transition mb-4" />
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {salas.map((s) => (
          <div
            key={s.id}
            className="bg-white shadow-md rounded-2xl p-4 border hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between mb-2">
              <Trash2
                className="w-7 h-7 text-red-500 hover:text-red-700 transition cursor-pointer"
                onClick={() => handleDelete(s.id)}
              />
              <Link to={`/editar-sala/${s.id}`}>
                <Edit className="w-7 h-7 text-blue-500 hover:text-blue-700 transition cursor-pointer" />
              </Link>
            </div>

            <p className="text-gray-600"><span className="font-medium">Sala:</span> {s.id}</p>
            <p className="text-gray-600"><span className="font-medium">Nome:</span> {s.nome}</p>
            <p className="text-gray-600"><span className="font-medium">Capacidade:</span> {s.capacidade}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
