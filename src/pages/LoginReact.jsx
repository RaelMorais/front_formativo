import { Link } from 'react-router-dom';

export function LoginReact(){
    return(
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Isso é a tela de login</h1>
        
        <Link to='/home'>
        <a
          href="#"
          className="text-lg text-blue-500 hover:text-blue-700 transition-colors"
        >
          Ir para home
        </a>
        </Link>
      </div>
    )
}