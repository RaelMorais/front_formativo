export function Main() {

    const name = 'Joao';
    return(
        <>
        <main className="flex flex-col items-center justify-center h-[90vh] bg-gray-100">
            {/* <div className="flex flex-col items-left">
                <h1 className="flex flex-col items-left"> Olá {name}</h1>
            </div> */}
            <div className="bg-sky-500/100 w-[120vh] h-3/4">
                <div>
                    <h1>
                        Professores
                    </h1>
                </div>

                <div>
                    <h1>
                        Gestores
                    </h1>
                </div>

                <div>
                    <h1>
                        Reservas
                    </h1>
                </div>
                
                <div>
                    <h1>
                        Disciplinas
                    </h1>
                </div>
                
            </div>
        </main>
        </>
    )
}
