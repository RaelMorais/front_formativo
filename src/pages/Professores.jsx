import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Edit, Trash2, Plus} from 'lucide-react';

export function Professores(){

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
      const handleDelete = (id) => {
        const confirmar = window.confirm('Tem certeza que deseja excluir esse professor?');
        if (!confirmar) return;
 
        const token = localStorage.getItem('access_token');
 
        axios.delete(`http://127.0.0.1:8000/usuario/${id}`, {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
            alert('Professor excluído com sucesso!');
            setPosts(prev => prev.filter(prof => prof.id !== id));
        })
        .catch(error => {
            console.error('Erro ao excluir professor:', error);
            alert('Erro ao excluir professor.');
        });
        };
    return(
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <h1 className="text-3xl font-bold text-center mb-8">Professores</h1>
            
            <Plus/>
            <br></br>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {posts
                .filter((item) => item.cargo === 'P') // Filtra apenas usuários com cargo "D"
                .map((item) => (
                    <div
                        key={item.id}
                        className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-shadow"
                    ><div className=" flex flex-direction: row;">
                         <Trash2 className="w-7 h-7 text-red-500 hover:text-red-700 transition" onClick={() => handleDelete(item.id)}/>
                                
                                                   
                        <Edit className="w-7 h-7 text-blue-500 hover:text-blue-700 transition" />
                        </div>
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