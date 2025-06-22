import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function SalaProfessor() {
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
        const data = Array.isArray(response.data) ? response.data : response.data.results;
        setSalas(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar salas');
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <p>Carregando salas...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Salas Disponíveis</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {salas.map((sala) => (
          <div
            key={sala.id}
            className="bg-white shadow-md rounded-2xl p-4 border hover:shadow-lg transition-shadow"
          >
            <p className="text-gray-700 font-semibold text-lg mb-2">{sala.nome}</p>
            <p className="text-gray-600">
              <span className="font-medium">ID:</span> {sala.id}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Capacidade:</span> {sala.capacidade}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
