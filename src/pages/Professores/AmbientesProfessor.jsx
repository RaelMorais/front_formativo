import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function ReservasProfessor() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/ambientes/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = Array.isArray(response.data) ? response.data : response.data.results;
        setReservas(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar reservas');
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Reservas de Ambiente</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reservas.map((r) => (
          <div
            key={r.id}
            className="bg-white shadow-md rounded-2xl p-4 border hover:shadow-lg transition-shadow"
          >
            <p className="text-gray-600"><span className="font-medium">Sala:</span> {r.sala_reservada}</p>
            <p className="text-gray-600"><span className="font-medium">Período:</span> {r.periodo}</p>
            <p className="text-gray-600"><span className="font-medium">Data de Alocação:</span> {r.data_ini}</p>
            <p className="text-gray-600"><span className="font-medium">Data de Devolução:</span> {r.data_fim}</p>
            <p className="text-gray-600"><span className="font-medium">Professor:</span> {r.professor_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
