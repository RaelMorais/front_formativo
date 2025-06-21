import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const schemaDisciplina = z.object({
    nome: z.string().min(1, 'Informe ao menos um caractere').max(100),
    curso: z.string().min(1).max(100),
    carga_horaria: z.number({
        invalid_type_error: 'Informe a carga horária'
    }).int("Deve ser um número inteiro").min(1).max(260),
    desc: z.string().min(1).max(300),
    professor: z.number({
        invalid_type_error: 'Selecione um professor'
    }).min(1, 'Selecione um professor')
});

export function EditarDisciplina() {
    const [professores, setProfessores] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schemaDisciplina)
    });

    useEffect(() => {
        console.log('ID da disciplina:', id);  // <-- aqui
        async function carregarDados() {
            try {
                const token = localStorage.getItem('access_token');

                const resProfessores = await axios.get('http://127.0.0.1:8000/usuario/', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // Apenas professores (cargo 'P')
                const apenasProfessores = resProfessores.data.filter(user => user.cargo === 'P');
                setProfessores(apenasProfessores);

                // Dados da disciplina
                const resDisciplina = await axios.get(`http://127.0.0.1:8000/disciplina/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                reset(resDisciplina.data);  // usa os nomes corretos do backend

            } catch (error) {
                console.error("Erro ao carregar dados", error);
                alert("Erro ao carregar dados");
            }
        }

        carregarDados();
    }, [id, reset]);

    async function obterDadosFormulario(data) {
        try {
            const token = localStorage.getItem('access_token');

            await axios.put(`http://127.0.0.1:8000/disciplina/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            alert('Disciplina atualizada com sucesso!');
            navigate('/disciplina-diretor');

        } catch (error) {
            console.error('Erro ao atualizar disciplina', error.response?.data || error);
            alert("Erro ao atualizar disciplina");
        }
    }

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
            <form className="space-y-4" onSubmit={handleSubmit(obterDadosFormulario)}>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Editar Disciplina</h2>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Nome da Disciplina</label>
                    <input
                        className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        {...register('nome')}
                        placeholder="Ex: Matemática"
                    />
                    {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Curso</label>
                    <input
                        className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        {...register('curso')}
                        placeholder="Ex: Informática"
                    />
                    {errors.curso && <p className="text-red-500 text-sm mt-1">{errors.curso.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Carga Horária</label>
                    <input
                        type="number"
                        className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        {...register('carga_horaria', { valueAsNumber: true })}
                        placeholder="Ex: 60"
                    />
                    {errors.carga_horaria && <p className="text-red-500 text-sm mt-1">{errors.carga_horaria.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Descrição</label>
                    <textarea
                        rows={4}
                        className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        {...register('desc')}
                        placeholder="Descreva a disciplina"
                    />
                    {errors.desc && <p className="text-red-500 text-sm mt-1">{errors.desc.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Professor</label>
                    <select
                        className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        {...register('professor', { valueAsNumber: true })}
                    >
                        <option value="">Selecione um professor</option>
                        {professores.map((prof) => (
                            <option key={prof.id} value={prof.id}>
                                {prof.username}
                            </option>
                        ))}
                    </select>
                    {errors.professor && <p className="text-red-500 text-sm mt-1">{errors.professor.message}</p>}
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                    >
                        Atualizar
                    </button>
                </div>
            </form>
        </div>

    );
}
