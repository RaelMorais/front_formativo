import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus} from 'lucide-react';

export function Disciplina() {
    const [disciplinas, setDisciplina] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('access_token')

        axios.get('http://127.0.0.1:8000/disciplinas/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })// url aqui da disciplina 

            .then(response => {
                setDisciplina(response.data);
            })

            .catch(error => {
                console.error('error', error);

            });

        axios.get('', {
            headers: {
                'Authorization': `Bearer ${token}`

            }
        })
    }, [])
     const handleDelete = (id) => {
        const confirmar = window.confirm('Tem certeza que deseja excluir esta reserva?');
        if (!confirmar) return;
 
        const token = localStorage.getItem('access_token');
 
        axios.delete(`http://127.0.0.1:8000/disciplina/${id}`, {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
            alert('Disciplina excluída com sucesso!');
            setDisciplina(prev => prev.filter(dis => dis.id !== id));
        })
        .catch(error => {
            console.error('Erro ao excluir disciplina:', error);
            alert('Erro ao excluir a disciplina.');
        });
        };
    return (
        <>


            <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Disciplinas</h2>
                   
                <Link to="/cadastro">
                    <Plus className="w-10 h-10 text-black-500 hover:text-blue-700 transition"  />  
                </Link>

                <br></br>

               
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {disciplinas.map((disciplina) => (
                        <div
                            key={disciplina.id}
                            className="bg-white shadow-md rounded-2xl p-4 border hover:shadow-lg transition-shadow"
                        >   <div className="flex justify-between mb-2">
                                <Trash2 className="w-7 h-7 text-red-500 hover:text-red-700 transition" onClick={() => handleDelete(disciplina.id)}/>
                                
                                <Link to={`/editar/${disciplina.id}`}>                              
                                  <Edit className="w-7 h-7 text-blue-500 hover:text-blue-700 transition" />
                                </Link>
                             
                            </div>
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
    )
}
