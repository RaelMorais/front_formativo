import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

const schemaDiretor = z.object({
    username: z.string().min(1, 'Informe o nome de usuário').max(150),
    password: z.string().min(6, 'Senha deve ter ao menos 6 caracteres'),
    telefone: z.string().optional(),
    genero: z.enum(['M', 'F']),
    situacao: z.enum(['Ef', 'Es', 'Mo', 'Ap']),
    cargo: z.literal('D'),
    data_nasc: z.string().min(1, 'Informe a data de nascimento'),
    data_contra: z.string().min(1, 'Informe a data de contratação'),
    ni: z.string().min(1, 'Informe o número de identificação'),
});

export function CriarDiretor() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schemaDiretor)
    });

    async function onSubmit(data) {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.post('http://127.0.0.1:8000/usuario/', data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('Professor cadastrado:', response.data);
            alert('Professor cadastrado com sucesso!');
            navigate('/professores'); // ou a rota que desejar
        } catch (error) {
            console.error('Erro ao cadastrar professor:', error.response?.data || error.message);
            alert('Erro ao cadastrar professor.');
        }
    }

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Cadastro de Diretor</h2>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Nome de usuário</label>
                    <input
                        {...register('username')}
                        className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Digite o nome de usuário"
                    />
                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Senha</label>
                    <input
                        type="password"
                        {...register('password')}
                        className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Digite a senha"
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Telefone</label>
                    <input
                        {...register('telefone')}
                        className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="(00) 00000-0000"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Gênero</label>
                    <select
                        {...register('genero')}
                        className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Selecione</option>
                        <option value="M">Masculino</option>
                        <option value="F">Feminino</option>
                    </select>
                    {errors.genero && <p className="text-red-500 text-sm mt-1">{errors.genero.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Situação</label>
                    <select
                        {...register('situacao')}
                        className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Selecione</option>
                        <option value="Ef">Efetivo</option>
                        <option value="Es">Estágio</option>
                        <option value="Mo">Meio-oficial</option>
                        <option value="Ap">Aprendiz</option>
                    </select>
                    {errors.situacao && <p className="text-red-500 text-sm mt-1">{errors.situacao.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Data de Nascimento</label>
                    <input
                        type="date"
                        {...register('data_nasc')}
                        className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.data_nasc && <p className="text-red-500 text-sm mt-1">{errors.data_nasc.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Data de Contratação</label>
                    <input
                        type="date"
                        {...register('data_contra')}
                        className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.data_contra && <p className="text-red-500 text-sm mt-1">{errors.data_contra.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Número de Identificação (NI)</label>
                    <input
                        {...register('ni')}
                        className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Ex: 123456"
                    />
                    {errors.ni && <p className="text-red-500 text-sm mt-1">{errors.ni.message}</p>}
                </div>

                <input type="hidden" value="D" {...register('cargo')} />

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
                    >
                        Cadastrar Diretor
                    </button>
                </div>
            </form>
        </div>

    );
}
