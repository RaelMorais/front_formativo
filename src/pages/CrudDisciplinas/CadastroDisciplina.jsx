import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

const schemaDisciplinas = z.object({
    nome: z.string().min(1, 'Informe um nome').max(100, 'Máximo 100 caracteres'),
    curso: z.string().min(1, 'Informe o curso').max(100),
    carga_horaria: z.number({ invalid_type_error: 'Informe uma carga horária' })
        .int('Digite um número inteiro')
        .min(1, 'Mínimo de 1 hora').max(100, 'Máximo de 100 horas'),
    desc: z.string().min(1, 'Informe a descrição').max(600, 'Máximo 100 caracteres'),
    professor: z.number({ invalid_type_error: 'Informe o professor' }).min(1, 'Selecione um professor')
});

export function DisciplinaCadastro() {
    const [professores, setProfessores] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schemaDisciplinas)
    });

    useEffect(() => {
        async function buscarProfessores() {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/usuario/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const apenasProfessores = response.data.filter(user => user.cargo === 'P');
                setProfessores(apenasProfessores);
            } catch (error) {
                console.error('Erro ao buscar professores:', error);
            }
        }

        buscarProfessores();
    }, []);

    async function obterDadosFormulario(data) {
        console.log('dados do formulário', data);

        try {
            const token = localStorage.getItem('access_token');

            const response = await axios.post(
                'http://127.0.0.1:8000/disciplina/',
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('Disciplina cadastrada:', response.data);
            alert('Disciplina cadastrada com sucesso!');
            navigate('/disciplina'); 
        } catch (error) {
            console.error('Erro ao cadastrar disciplina:', error.response?.data || error.message);
            alert('Erro ao cadastrar disciplina.');
        }
    }
    return (

        <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
            <form className="space-y-4" onSubmit={handleSubmit(obterDadosFormulario)}>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Cadastro de Disciplina</h2>

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
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                    >
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>

    );
}
