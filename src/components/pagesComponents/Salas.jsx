import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { data } from 'react-router-dom';

export function Salas(){
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('access_token')
    useEffect(() => {
    const getData = async () => {
        try{
        const response = await axios.get('http://127.0.0.1:8000/salas/', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
            setPosts(response.data);  // Define os dados obtidos da API
            setLoading(false);  // Finaliza o carregamento
        } catch (err){
            setError('Erro com o token');
            setLoading(false); 
        }
    };

    getData();
}, [token]); 

    if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
     
    return(

      <>
  <div className="min-h-screen bg-gray-100 py-10 px-4">
    <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Salas</h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
      {posts.map((item) => (
        <div
          key={item.id}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Sala {item.id}</h2>
          <p className="text-gray-700">
            <span className="font-medium text-gray-600">Nome:</span> {item.nome}
          </p>
          <p className="text-gray-700">
            <span className="font-medium text-gray-600">Capacidade:</span> {item.capacidade}
          </p>
        </div>
      ))}
    </div>
  </div>
</>

    )

}