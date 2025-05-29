import { Link } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

export function LoginReact() {
    const navigate = useNavigate(); // ✅ useNavigate hook
    const schemaLogin = z.object({
    username: z.string()
    .min(1, 'Informe seu usuario')
    .max(30, 'Informe no maximo 30 caracteres'), 
    password: z.string()
    .min(1, 'Informe a senha')
    .max(55, 'Informe no maximo 55 caracteres')

    });

    
    const{
        register,
        handleSubmit, 
        formState: {errors}
    }=useForm(
        {resolver: zodResolver(schemaLogin)}
    );
    async function ObterDados(data) {
        console.log(data)

        try {
    const response = await axios.post('http://127.0.0.1:8000/token/', {
      username: data.username,
      password: data.password,
    });

    console.log(response.data); // veja a estrutura da resposta

    const { access, refresh, user } = response.data;

    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    localStorage.setItem('nome', data.username);

    // Verifique se 'user' existe antes de usar
    // if (user && user.cargo) {
    //   localStorage.setItem('tipo', user.cargo);
    // }
    navigate('/home'); // ✅ redireciona após login
    console.log('Login realizado');
  } catch (error) {
    console.log('Deu ruim', error);
    alert('Dados inválidos');
  }
}
    
    return (
        <>
            {/* component */}
            <div className="bg-gray-100 flex justify-center items-center h-screen">
                {/* Left: Image */}
                <div className="w-1/2 h-screen hidden lg:block">
                    <img
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWJzdHJhY3R8ZW58MHx8MHx8fDA%3D"
                        alt="Background"
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Right: Login Form */}
                <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                    <h1 className="text-6xl font-semibold mb-4 text-center">Smart<span>Tech</span></h1>
                    <form action="#" method="POST" onSubmit={handleSubmit(ObterDados)}>
                        {/* Username Input */}
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-600">
                                Username
                            </label>
                            <input
                                {...register('username')}
                                placeholder='Ex. João'
                                type="text"
                                id="username"
                                name="username"
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                autoComplete="off"
                            />
                            {errors.username && <p>{errors.username.message}</p>}
                        </div>

                        {/* Password Input */}
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-800">
                                Password
                            </label>
                            <input
                                {...register('password')}
                                placeholder='Ex. SuaSenha'
                                type="password"
                                id="password"
                                name="password"
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                autoComplete="off"
                            />
                            {errors.pasword && <p>{errors.pasword.message}</p>}
                        </div>

                        {/* Login Button */}
                        {/* <Link to="/home"> */}
                        <button
                            type="submit"
                            className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
                        >
                            Login
                        </button>
                        {/* </Link> */}
                    </form>
                </div>
            </div>
        </>
    );
}
