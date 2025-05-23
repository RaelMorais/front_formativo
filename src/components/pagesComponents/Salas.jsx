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
        const response = await axios.get('http://127.0.0.1:8000/listar/salas/', {
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
   <div>
      <h1>Salas</h1>
            {posts.map((item) => (
            <div key={item.id}>
            <h1>Sala {item.id}</h1>
                <p>Nome: {item.nome}</p>
                <p>Capacidade: {item.capacidade}</p>
            </div>
        ))}
    </div>
        </>
    )

}