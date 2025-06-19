import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus} from 'lucide-react';



export function Reservas(){
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
      .delete(`http://127.0.0.1:8000/ambientes/${id}/`, {
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

    return(
         <>
         <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Reservas de Ambiente</h2>

      <div className="flex justify-end mb-4">
        <Link to="/reserva/criar">
          <Plus className="w-10 h-10 text-gray-600 hover:text-blue-600 transition" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reservas.map((r) => (
          <div
            key={r.id}
            className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between mb-2">
              <Trash2
                className="w-6 h-6 text-red-500 hover:text-red-700 cursor-pointer"
                onClick={() => handleDelete(r.id)}
              />
              <Link to={`/reserva/editar/${r.id}`}>
                <Edit className="w-6 h-6 text-blue-500 hover:text-blue-700 cursor-pointer" />
              </Link>
            </div>

            <p className="text-gray-800 font-medium mb-1">
              Sala: <span className="font-normal">{r.sala_reservada}</span>
            </p>
            <p className="text-gray-800 font-medium mb-1">
              Período: <span className="font-normal">{r.get_periodo_display}</span>
            </p>
            <p className="text-gray-800 font-medium mb-1">
              Data: <span className="font-normal">{r.data_ini} a {r.data_fim}</span>
            </p>
            <p className="text-gray-800 font-medium mb-1">
              Professor: <span className="font-normal">{r.username}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
         </>
    )

}