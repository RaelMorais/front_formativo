import React, { useState, useEffect } from 'react';
import axios from 'axios';


export function Suport(){
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('access_token')
    useEffect(() => {
    const getData = async () => {
        try{
        const response = await axios.get('http://127.0.0.1:8000/listar/disciplinas/', {
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
        }
    };

    getData();
}, [token]); 

    if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
     
    return(
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
               <div>
      <h1>Salas</h1>
            {posts.map((item) => (
            <div key={item.id}>
            <h1></h1>
                <p>Nome: {item.nome}</p>
                <p>Cursos: {item.curso}</p>
                <p>Carga Horaria: {item.desc}</p>
                <p>Professores: {item.professor}</p>
            </div>
        ))}
    </div>
        </div>
        )
}