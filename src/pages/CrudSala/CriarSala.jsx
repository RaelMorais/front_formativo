import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const schemaSala = z.object({
  nome: z.string().min(1, 'Informe o nome da sala'),
  capacidade: z.coerce.number().min(1, 'Capacidade deve ser pelo menos 1'),
});

export function CriarSala() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemaSala),
  });

  async function onSubmit(data) {
    try {
      const token = localStorage.getItem('access_token');

      const response = await axios.post('http://127.0.0.1:8000/sala/', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Sala cadastrada:', response.data);
      alert('Sala cadastrada com sucesso!');
      navigate('/salas');
    } catch (error) {
      console.error('Erro ao cadastrar sala:', error.response?.data || error.message);
      alert('Erro ao cadastrar sala.');
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Cadastro de Sala</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700">Nome da Sala</label>
          <input
            {...register('nome')}
            className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Digite o nome da sala"
          />
          {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Capacidade</label>
          <input
            type="number"
            {...register('capacidade')}
            className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ex: 30"
          />
          {errors.capacidade && <p className="text-red-500 text-sm mt-1">{errors.capacidade.message}</p>}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Cadastrar Sala
          </button>
        </div>
      </form>
    </div>
  );
}
