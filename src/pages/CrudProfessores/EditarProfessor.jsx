import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';



const schemaProfessor = z.object({
    username: z.string().min(1, 'Informe o nome de usuário').max(150),
    telefone: z.string().optional(),
    genero: z.enum(['M', 'F', 'N'], { required_error: "Informe o gênero" }),
    situacao: z.enum(['Ef', 'Es', 'Mo', 'Ap'], { required_error: "Informe a situação" }),
    cargo: z.literal('P'),
    data_nasc: z.string().min(1, 'Informe a data de nascimento'),
    data_contra: z.string().min(1, 'Informe a data de contratação'),
    ni: z.string().min(1, 'Informe o número de identificação'),
});

export function EditarProfessor() {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schemaProfessor)
    });

    useEffect(() => {
        async function carregarDados() {
            try {
                const token = localStorage.getItem('access_token');

                const res = await axios.get(`http://127.0.0.1:8000/usuario/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                reset(res.data);
            } catch (error) {
                console.error('Erro ao carregar dados do professor:', error);
                alert('Erro ao carregar dados.');
            }
        }

        carregarDados();
    }, [id, reset]);

    async function onSubmit(data) {
        try {
            const token = localStorage.getItem('access_token');

            await axios.put(`http://127.0.0.1:8000/usuario/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            alert('Professor atualizado com sucesso!');
            navigate('/professores');
        } catch (error) {
            console.error('Erro ao atualizar professor:', error.response?.data || error);
            alert('Erro ao atualizar professor.');
        }
    }

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="text-2xl font-bold text-center mb-4">Editar Professor</h2>

        <div>
          <label className="block font-medium mb-1">Nome de Usuário</label>
          <input {...register('username')} className="w-full border p-2 rounded" />
          {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Telefone</label>
          <input {...register('telefone')} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block font-medium mb-1">Gênero</label>
          <select {...register('genero')} className="w-full border p-2 rounded">
            <option value="">Selecione</option>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
            <option value="N">Neutro</option>
          </select>
          {errors.genero && <p className="text-red-500 text-sm">{errors.genero.message}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Situação</label>
          <select {...register('situacao')} className="w-full border p-2 rounded">
            <option value="">Selecione</option>
            <option value="Ef">Efetivo</option>
            <option value="Es">Estágio</option>
            <option value="Mo">Meio-oficial</option>
            <option value="Ap">Aprendiz</option>
          </select>
          {errors.situacao && <p className="text-red-500 text-sm">{errors.situacao.message}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Data de Nascimento</label>
          <input type="date" {...register('data_nasc')} className="w-full border p-2 rounded" />
          {errors.data_nasc && <p className="text-red-500 text-sm">{errors.data_nasc.message}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Data de Contratação</label>
          <input type="date" {...register('data_contra')} className="w-full border p-2 rounded" />
          {errors.data_contra && <p className="text-red-500 text-sm">{errors.data_contra.message}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Número de Identificação (NI)</label>
          <input {...register('ni')} className="w-full border p-2 rounded" />
          {errors.ni && <p className="text-red-500 text-sm">{errors.ni.message}</p>}
        </div>

        {/* Campo oculto para garantir cargo "P" */}
        <input type="hidden" value="P" {...register('cargo')} />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Atualizar
        </button>
      </form>
    </div>
    );
}
