import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const estilos = {
    conteiner: "p-4",
    titulo: "text-xl font-bold mb-4",
    nomeCampo: "font-semibold mt-2",
    inputField: "border p-2 rounded w-full",
    error: "text-red-500 text-sm",
    submitButton: "bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition mt-4"
};

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

                const res = await axios.get(`http://127.0.0.1:8000/usuario/${id}/`, {
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

            await axios.put(`http://127.0.0.1:8000/usuario/${id}/`, data, {
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
            <form onSubmit={handleSubmit(onSubmit)} className={estilos.conteiner}>
                <h2 className={estilos.titulo}>Editar Professor</h2>

                <div>
                    <label className={estilos.nomeCampo}>Nome de Usuário</label>
                    <input {...register('username')} className={estilos.inputField} />
                    {errors.username && <p className={estilos.error}>{errors.username.message}</p>}
                </div>

                <div>
                    <label className={estilos.nomeCampo}>Telefone</label>
                    <input {...register('telefone')} className={estilos.inputField} />
                </div>

                <div>
                    <label className={estilos.nomeCampo}>Gênero</label>
                    <select {...register('genero')} className={estilos.inputField}>
                        <option value="">Selecione</option>
                        <option value="M">Masculino</option>
                        <option value="F">Feminino</option>
                        <option value="N">Neutro</option>
                    </select>
                    {errors.genero && <p className={estilos.error}>{errors.genero.message}</p>}
                </div>

                <div>
                    <label className={estilos.nomeCampo}>Situação</label>
                    <select {...register('situacao')} className={estilos.inputField}>
                        <option value="">Selecione</option>
                        <option value="Ef">Efetivo</option>
                        <option value="Es">Estágio</option>
                        <option value="Mo">Meio-oficial</option>
                        <option value="Ap">Aprendiz</option>
                    </select>
                    {errors.situacao && <p className={estilos.error}>{errors.situacao.message}</p>}
                </div>

                <div>
                    <label className={estilos.nomeCampo}>Data de Nascimento</label>
                    <input type="date" {...register('data_nasc')} className={estilos.inputField} />
                    {errors.data_nasc && <p className={estilos.error}>{errors.data_nasc.message}</p>}
                </div>

                <div>
                    <label className={estilos.nomeCampo}>Data de Contratação</label>
                    <input type="date" {...register('data_contra')} className={estilos.inputField} />
                    {errors.data_contra && <p className={estilos.error}>{errors.data_contra.message}</p>}
                </div>

                <div>
                    <label className={estilos.nomeCampo}>Número de Identificação (NI)</label>
                    <input {...register('ni')} className={estilos.inputField} />
                    {errors.ni && <p className={estilos.error}>{errors.ni.message}</p>}
                </div>

                {/* Campo oculto para garantir cargo "P" */}
                <input type="hidden" value="P" {...register('cargo')} />

                <button type="submit" className={estilos.submitButton}>Atualizar</button>
            </form>
        </div>
    );
}
