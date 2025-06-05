import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";


export function DisciplinaCadastro(){
    const schemaDisciplinas = z.object({
        nome: z.string()
        .min(1, 'Informa um nome')
        .max(100, 'Informe no máximo 100 caracteres'), 

        curso: z.string()
        .min(1, 'Informe o curso')
        .max(100, 'Maximo de 100 caracteres'), 

        cargaHoraria: z.number(
            {invalid_type_error: 'Informe uma carga horaria'})
            .int('Digite um valor inteiro')
            .min(1, 'Minimo de 1 caracter')
            .max(100, 'maximo de 100 caracter'), 
        descricao: z.string()
        .min(1, 'Informe o curso')
        .max(100, 'Maximo de 100 caracteres'), 
        professor: z.number(
            {invalid_type_error: 'informe um fessor'})
        .min(1, 'Selecione um professor')
    })

    const [professor, setProfessores] = useState([]); 
    const{
        register, 
        handleSubmit, 
        formState: { errors }, 
    } = userForm ({
        resolver: zodResolver(schemaDisciplinas)
    }); 

    useEffect(()=>{
        async function buscarProfessores() {
            try{
                const token = localStorage.getItem('access_token')
                const response = await axios.get('http://127.0.0.1:8000/usuario/',{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }); 

                setProfessores(response.data);

            } catch(error){
                console.error('Erro', error)
            }
            buscarProfessores();
            
        }
    }); 

    async function ObterDados(data) {
        console.log('dados do formulario', data); 

        try{
            const token = localStorage.getItem('access_token'); 
            const response = await axios.post('http://127.0.0.1:8000/disciplina/',{
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response.data)
        }catch(error){
            console.error('Erro', error)
            alert('erro ao acessar')

        }
    }
    return(
        <>
        </>
    )
}