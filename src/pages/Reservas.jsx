import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus } from 'lucide-react';



export function Reservas() {
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
        console.log(response.data)
        setReservas(response.data);
        setLoading(false);

      } catch (err) {
        console.error(err);
        setError('Erro ao carregar reservas');
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleDelete = (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta reserva?')) return;

    axios
      .delete(`http://127.0.0.1:8000/ambiente/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setReservas((prev) => prev.filter((r) => r.id !== id));
        alert('Reserva excluída com sucesso!');
      })
      .catch((err) => {
        console.error(err);
        alert('Erro ao excluir reserva.');
      });
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Reservas de Ambiente</h2>

        <Link to="/criar-reserva">
          <Plus className="w-10 h-10 text-black-500 hover:text-blue-700 transition" />
        </Link>

        <br />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reservas.map((r) => (
            <div
              key={r.id}
              className="bg-white shadow-md rounded-2xl p-4 border hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between mb-2">
                <Trash2
                  className="w-7 h-7 text-red-500 hover:text-red-700 transition cursor-pointer"
                  onClick={() => handleDelete(r.id)}
                />
                <Link to={`/editar-reserva/${r.id}`}>
                  <Edit className="w-7 h-7 text-blue-500 hover:text-blue-700 transition cursor-pointer" />
                </Link>
              </div>

              <p className="text-gray-600"><span className="font-medium">Sala:</span> {r.sala_reservada}</p>
              <p className="text-gray-600"><span className="font-medium">Período:</span> {r.periodo}</p>
              <p className="text-gray-600"><span className="font-medium">Data de Alocação:</span> {r.data_ini}</p>
              <p className="text-gray-600"><span className="font-medium">Data de Devolução:</span> {r.data_fim}</p>
              <p className="text-gray-600"><span className="font-medium">Professor:</span> {r.professor_name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}