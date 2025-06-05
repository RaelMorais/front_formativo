import axios from "axios";
import React, { useEffect, useState } from "react";
import { error } from "zod/v4/locales/ar.js";
import add from '../assets/icons/add.png';
import trash from '../assets/icons/trash.png';
import remove from '../assets/icons/remove.png';
import edit from '../assets/icons/edit.png';
import { Edit, Trash2, CirclePlus} from 'lucide-react';

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
    return (
        <>


            <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Disciplinas</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {disciplinas.map((disciplina) => (
                        <div
                            key={disciplina.id}
                            className="bg-white shadow-md rounded-2xl p-4 border hover:shadow-lg transition-shadow"
                        >   <div className=" flex flex-direction: row;">
                                <Trash2 className="w-7 h-7 text-red-500 hover:text-red-700 transition" />
                                <Edit className="w-7 h-7 text-blue-500 hover:text-blue-700 transition" />
                                <CirclePlus className="w-7 h-7 text-green-500 hover:text-green-700 transition" />
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
