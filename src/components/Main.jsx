import { Link } from 'react-router-dom';

export function Main() {

    const name = localStorage.getItem('nome');
    const tipo = localStorage.getItem('cargo'); 


    const linkDisciplina = tipo === 'P' ? '/disciplina' : '/disc';   
    const linkProfessor = tipo === 'P' ? '/erro' : '/prof'; 
    const linkDiretor = tipo === 'P' ? '/erro' : '/adm'; 

    return (
        <>
            <main className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-200 px-4">
                <div className="flex flex-col items-start">
                    <h1 className="text-2xl font-bold">Olá {name}</h1>
                </div>

                <div className="w-full max-w-screen-xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-8">

                        <Link to={linkProfessor}>
                        <div className="bg-white text-gray-800 shadow-lg rounded-2xl p-8 flex flex-col items-center justify-center text-center text-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-blue-100 hover:shadow-2xl cursor-pointer h-56">
                            <svg className="w-12 h-12 text-blue-600 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0 0H6m6 0h6" />
                            </svg>
                            Professores
                        </div>
                        </Link>
                        
                        <Link to={linkDiretor}>
                        <div className="bg-white text-gray-800 shadow-lg rounded-2xl p-8 flex flex-col items-center justify-center text-center text-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-green-100 hover:shadow-2xl cursor-pointer h-56">
                            <svg className="w-12 h-12 text-green-600 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m0-6a4 4 0 118 0 4 4 0 01-8 0zm10 4a4 4 0 10-4 4h4" />
                            </svg>
                            Gestores
                        </div>
                        </Link>

                        <Link to = '#'>
                        <div className="bg-white text-gray-800 shadow-lg rounded-2xl p-8 flex flex-col items-center justify-center text-center text-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-yellow-100 hover:shadow-2xl cursor-pointer h-56">
                            <svg className="w-12 h-12 text-yellow-600 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Reservas
                        </div>
                        </Link>
                        
                        <Link to = {linkDisciplina}>
                        <div className="bg-white text-gray-800 shadow-lg rounded-2xl p-8 flex flex-col items-center justify-center text-center text-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-purple-100 hover:shadow-2xl cursor-pointer h-56">
                            <svg className="w-12 h-12 text-purple-600 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 12V6m0 6v6m0 0H7a2 2 0 01-2-2V6a2 2 0 012-2h5m0 12h5a2 2 0 002-2V6a2 2 0 00-2-2h-5" />
                            </svg>
                            Disciplinas
                        </div>
                        </Link>

                    </div>
                </div>
            </main>

        </>
    )
}
