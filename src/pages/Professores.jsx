import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus } from 'lucide-react';

export function Professores() {
  // Estado para armazenar a lista de professores
  const [posts, setPosts] = useState([]);
  // Estado para controle de loading
  const [loading, setLoading] = useState(true);
  // Estado para controle de erro na requisição
  const [error, setError] = useState(null);
  // Pega token do localStorage para autenticação
  const token = localStorage.getItem('access_token');

  // useEffect para carregar dados da API ao montar o componente ou quando o token mudar
  useEffect(() => {
    const getData = async () => {
      try {
        // Requisição GET para buscar usuários (professores)
        const response = await axios.get('http://127.0.0.1:8000/usuarios/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Atualiza o estado com os dados recebidos
        setPosts(response.data);
        // Desativa loading após obter dados
        setLoading(false);
        console.log(response.data);
      } catch (err) {
        // Em caso de erro, salva a mensagem de erro e desativa loading
        setError('Erro com o token');
        setLoading(false);
        console.log(err);
      }
    };

    getData();
  }, [token]);

  // Exibe loading enquanto a requisição está em andamento
  if (loading) return <p>Carregando...</p>;
  // Exibe mensagem de erro se houver falha na requisição
  if (error) return <p>{error}</p>;

  // Função para excluir professor pelo ID
  const handleDelete = (id) => {
    // Confirma exclusão com o usuário
    const confirmar = window.confirm('Tem certeza que deseja excluir esse professor?');
    if (!confirmar) return;

    const token = localStorage.getItem('access_token');

    // Requisição DELETE para apagar professor da API
    axios
      .delete(`http://127.0.0.1:8000/usuario/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        // Alerta sucesso e atualiza lista removendo o professor excluído
        alert('Professor excluído com sucesso!');
        setPosts((prev) => prev.filter((prof) => prof.id !== id));
      })
      .catch((error) => {
        // Em caso de erro na exclusão, exibe alerta
        console.error('Erro ao excluir professor:', error);
        alert('Erro ao excluir professor.');
      });
  };

  return (
    <>
      <div className="p-6">
        {/* Título da página */}
        <h2 className="text-2xl font-bold mb-6">Professores</h2>

        {/* Link para página de criação de professor */}
        <Link to="/criar-professor">
          <Plus className="w-10 h-10 text-black-500 hover:text-blue-700 transition" />
        </Link>

        <br />

        {/* Grid responsivo para exibir cartões dos professores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts
            .filter((item) => item.cargo === 'P') // Filtra apenas professores (cargo "P")
            .map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-2xl p-4 border hover:shadow-lg transition-shadow"
              >
                {/* Ícones para excluir e editar */}
                <div className="flex justify-between mb-2">
                  {/* Ícone de excluir com evento onClick */}
                  <Trash2
                    className="w-7 h-7 text-red-500 hover:text-red-700 transition cursor-pointer"
                    onClick={() => handleDelete(item.id)}
                  />
                  {/* Link para editar professor */}
                  <Link to={`/editar-professor/${item.id}`}>
                    <Edit className="w-7 h-7 text-blue-500 hover:text-blue-700 transition cursor-pointer" />
                  </Link>
                </div>

                {/* Dados do professor */}
                <h3 className="text-lg font-semibold text-black-700 mb-1">{item.username}</h3>
                <p className="text-gray-600">
                  <span className="font-medium">NI:</span> {item.ni}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Telefone:</span> {item.telefone}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Gênero:</span> {item.genero}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Nascimento:</span> {item.data_nasc}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Data de contratação:</span> {item.data_contra}
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
