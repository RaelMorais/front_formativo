import React, { useState, useEffect } from 'react';
import axios from 'axios';


export function Diretores(){

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('access_token')
    useEffect(() => {
    const getData = async () => {
        try{
        const response = await axios.get('http://127.0.0.1:8000/usuarios/', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
            setPosts(response.data);  // Define os dados obtidos da API
            setLoading(false);  
            console.log(response.data)// Finaliza o carregamento
        } catch (err){
            setError('Erro com o token');
            setLoading(false); 
            console.log(err)
        }
    };

    getData();
}, [token]); 

    if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
     
    return(
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <h1 className="text-3xl font-bold text-center mb-8">Diretores</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {posts
                .filter((item) => item.cargo === 'D') 
                .map((item) => (
                    <div
                        key={item.id}
                        className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-shadow"
                    >
                        <h2 className="text-xl font-semibold mb-2 text-gray-800">{item.username}</h2>
                        <p><span className="font-medium text-gray-600">NI:</span> {item.ni}</p>
                        <p><span className="font-medium text-gray-600">Telefone:</span> {item.telefone}</p>
                        <p><span className="font-medium text-gray-600">Gênero:</span> {item.genero}</p>
                        <p><span className="font-medium text-gray-600">Nascimento:</span> {item.data_nasc}</p>
                        <p><span className="font-medium text-gray-600">Data de contratação:</span> {item.data_contra}</p>
                    </div>
                ))}
            </div>
        </div>
        )
}