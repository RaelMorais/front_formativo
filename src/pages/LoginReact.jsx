import { Link } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

export function LoginReact() {
  const navigate = useNavigate(); // Hook para navegação programática

  // Define esquema de validação com Zod
  const schemaLogin = z.object({
    username: z
      .string()
      .min(1, 'Informe seu usuario')
      .max(30, 'Informe no maximo 30 caracteres'),
    password: z
      .string()
      .min(1, 'Informe a senha')
      .max(55, 'Informe no maximo 55 caracteres'),
  });

  // Configura react-hook-form com validação do Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemaLogin),
  });

  // Função para processar o login ao enviar o formulário
  async function ObterDados(data) {
    console.log(data);

    try {
      // Requisição POST para obter token e dados do usuário
      const response = await axios.post('http://127.0.0.1:8000/token/', {
        username: data.username,
        password: data.password,
      });

      console.log(response.data); // Log da resposta para debugging

      // Desestrutura tokens e dados do usuário da resposta
      const { access, refresh, usuario } = response.data;

      // Armazena tokens e dados do usuário no localStorage
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('nome', usuario.username);
      localStorage.setItem('cargo', usuario.cargo);

      // Redireciona para página inicial após login bem-sucedido
      navigate('/home');
      console.log('Login realizado');
    } catch (error) {
      // Em caso de erro, exibe no console e alerta o usuário
      console.log('Deu ruim', error);
      alert('Dados inválidos');
    }
  }

  return (
    <>
      {/* Container principal, centraliza vertical e horizontalmente */}
      <div className="bg-gray-100 flex justify-center items-center h-screen">
        {/* Lado esquerdo: imagem de background, visível apenas em telas grandes */}
        <div className="w-120 h-screen hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1712916666137-0ca605eeb88c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0"
            alt="Background"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Lado direito: formulário de login */}
        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <h1 className="text-6xl font-semibold mb-4 text-center">Educar<span></span></h1>

          {/* Formulário controlado pelo react-hook-form */}
          <form action="#" method="POST" onSubmit={handleSubmit(ObterDados)}>
            {/* Campo Username */}
            <div className="mb-4 flex flex-col">
              <label htmlFor="username" className="mr-2 text-gray-600">
                Username
              </label>
              <input
                {...register('username')}
                placeholder="Ex. João"
                type="text"
                id="username"
                name="username"
                className="w-full border border-gray-300 rounded-sm py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
              />
              {/* Exibe mensagem de erro se houver */}
              {errors.username && <p className="text-red-600">{errors.username.message}</p>}
            </div>

            {/* Campo Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-800">
                Password
              </label>
              <input
                {...register('password')}
                placeholder="Ex. SuaSenha"
                type="password"
                id="password"
                name="password"
                className="w-full border border-gray-300 rounded-sm py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
              />
              {/* Corrigido o erro de digitação no nome do campo */}
              {errors.password && <p className="text-red-600">{errors.password.message}</p>}
            </div>

            {/* Botão de login */}
            <button
              type="submit"
              className="bg-violet-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
