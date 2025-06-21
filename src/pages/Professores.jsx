import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
    <>
    <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Professores</h2>

        <Link to="/criar-professor">
            <Plus className="w-10 h-10 text-black-500 hover:text-blue-700 transition" />
        </Link>

        <br />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts
                .filter((item) => item.cargo === 'P') // Filtra apenas usuários com cargo "P"
                .map((item) => (
                    <div
                        key={item.id}
                        className="bg-white shadow-md rounded-2xl p-4 border hover:shadow-lg transition-shadow"
                    >
                        <div className="flex justify-between mb-2">
                            <Trash2
                                className="w-7 h-7 text-red-500 hover:text-red-700 transition cursor-pointer"
                                onClick={() => handleDelete(item.id)}
                            />
                            <Link to={`/editar-professor/${item.id}`}>
                                <Edit className="w-7 h-7 text-blue-500 hover:text-blue-700 transition cursor-pointer" />
                            </Link>
                        </div>
                        <h3 className="text-lg font-semibold text-black-700 mb-1">{item.username}</h3>
                        <p className="text-gray-600"><span className="font-medium">NI:</span> {item.ni}</p>
                        <p className="text-gray-600"><span className="font-medium">Telefone:</span> {item.telefone}</p>
                        <p className="text-gray-600"><span className="font-medium">Gênero:</span> {item.genero}</p>
                        <p className="text-gray-600"><span className="font-medium">Nascimento:</span> {item.data_nasc}</p>
                        <p className="text-gray-600"><span className="font-medium">Data de contratação:</span> {item.data_contra}</p>
                    </div>
                ))}
        </div>
    </div>
</>

        )
}