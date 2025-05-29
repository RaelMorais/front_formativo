import axios from "axios"; // Api conect 
import React,{useEffect, useState} from "react";

export function DisciplineProfessor(){
    const [disciplinas, setDisciplina] = useState([]);
    useEffect(()=>{
        const token = localStorage.getItem('access_token');
        axios.get('http://127.0.0.1:8000/listar/disciplinas/',{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        .then(response => {
            setDisciplina(response.data);
            console.log(response.data)
        })
        .catch(error => {
            console.error('erro', error);
        });
    }, [])
    return(
        <>
        <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Disciplinas</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {disciplinas.map((disciplina) => (
            <div
                key={disciplina.id}
                className="bg-white shadow-md rounded-2xl p-4 border hover:shadow-lg transition-shadow"
            >
                <h3 className="text-lg font-semibold text-indigo-700">{disciplina.nome}</h3>
                <p className="text-gray-600">Curso: {disciplina.curso}</p>
                <p className="text-gray-600">Carga Horária: {disciplina.carga_horaria}h</p>
                <p className="text-gray-600">Descrição: {disciplina.desc}</p>
                <p className="text-gray-600">Professor: {disciplina.professor_name}</p>
            </div>
            ))}
        </div>
        </div>

        </>
    );

}
