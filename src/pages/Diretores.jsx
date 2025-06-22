import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus } from 'lucide-react';

export function Diretores() {
  // Estado para armazenar os dados dos diretores
  const [posts, setPosts] = useState([]);
  // Estado para controlar o carregamento da requisição
  const [loading, setLoading] = useState(true);
  // Estado para armazenar mensagens de erro, se houver
  const [error, setError] = useState(null);
  // Token para autenticação, recuperado do localStorage
  const token = localStorage.getItem('access_token');

  // Hook para buscar os dados da API ao montar o componente ou quando o token mudar
  useEffect(() => {
    const getData = async () => {
      try {
        // Faz a requisição GET para listar usuários
        const response = await axios.get('http://127.0.0.1:8000/usuarios/', {
          headers: {
            Authorization: `Bearer ${token}`, // Cabeçalho com token para autenticação
          },
        });
        setPosts(response.data);  // Armazena os dados recebidos
        setLoading(false);        // Atualiza estado de carregamento
        console.log(response.data) // Log para depuração
      } catch (err) {
        setError('Erro com o token');  // Define mensagem de erro caso falhe
        setLoading(false);             // Atualiza estado de carregamento
        console.log(err)               // Log para depuração do erro
      }
    };

    getData(); // Chama a função que busca os dados
  }, [token]); // Executa quando o token mudar

  // Exibe mensagem enquanto os dados estão carregando
  if (loading) return <p>Carregando...</p>;
  // Exibe mensagem de erro caso exista algum problema na requisição
  if (error) return <p>{error}</p>;

  // Função para deletar um diretor após confirmação do usuário
  const handleDelete = (id) => {
    const confirmar = window.confirm('Tem certeza que deseja excluir esse professor?');
    if (!confirmar) return; // Sai se o usuário cancelar

    const token = localStorage.getItem('access_token'); // Busca token atualizado

    axios.delete(`http://127.0.0.1:8000/usuario/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}` // Cabeçalho de autenticação
      }
    })
    .then(() => {
      alert('Professor excluído com sucesso!'); // Confirma exclusão
      // Atualiza a lista removendo o diretor excluído
      setPosts(prev => prev.filter(prof => prof.id !== id));
    })
    .catch(error => {
      console.error('Erro ao excluir professor:', error); // Log do erro
      alert('Erro ao excluir professor.'); // Alerta de falha
    });
  };

  return (
    <>
      <div className="p-6">
        {/* Título da página */}
        <h2 className="text-2xl font-bold mb-6">Diretores</h2>

        {/* Link para a página de criação de novo diretor */}
        <Link to="/criar-diretor">
          <Plus className="w-10 h-10 text-black-500 hover:text-blue-700 transition" />
        </Link>

        <br />

        {/* Lista de cartões para cada diretor filtrado pelo cargo 'D' */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts
            .filter((item) => item.cargo === 'D') // Filtra apenas usuários com cargo 'D'
            .map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-2xl p-4 border hover:shadow-lg transition-shadow"
              >
                {/* Ícones de exclusão e edição */}
                <div className="flex justify-between mb-2">
                  <Trash2
                    className="w-7 h-7 text-red-500 hover:text-red-700 transition cursor-pointer"
                    onClick={() => handleDelete(item.id)} // Chama função de exclusão ao clicar
                  />
                  <Link to={`/editar-diretor/${item.id}`}>
                    <Edit className="w-7 h-7 text-blue-500 hover:text-blue-700 transition cursor-pointer" />
                  </Link>
                </div>

                {/* Informações do diretor */}
                <h2 className="text-lg font-semibold text-indigo-700 mb-1">{item.username}</h2>
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
  );
}
