import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const schemaReserva = z.object({
  data_ini: z.string().min(1, "Informe a data inicial"),
  data_fim: z.string().min(1, "Informe a data final"),
  periodo: z.enum(["M", "T", "N"], "Selecione o período"),
  prof_resp: z.number().int().positive("Selecione o professor"),
  disc: z.number().int().positive("Selecione a disciplina"),
  sala_reservada: z.number().int().positive("Selecione a sala"),
});

export function CriarReserva() {
  const navigate = useNavigate();
  const [salas, setSalas] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [professores, setProfessores] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemaReserva),
  });

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const headers = { Authorization: `Bearer ${token}` };

    axios.get("http://127.0.0.1:8000/salas/", { headers }).then((res) => {
      // Verifique se res.data é array ou objeto com results
      setSalas(Array.isArray(res.data) ? res.data : res.data.results);
    });

    axios.get("http://127.0.0.1:8000/disciplinas/", { headers }).then((res) => {
      setDisciplinas(Array.isArray(res.data) ? res.data : res.data.results);
    });

    axios.get("http://127.0.0.1:8000/usuarios/", { headers }).then((res) => {
      // Supondo que o endpoint retorna todos os usuários
      // Filtrar só os professores
      const allUsers = Array.isArray(res.data) ? res.data : res.data.results;
      const profs = allUsers.filter((u) => u.cargo === "P");
      setProfessores(profs);
    });
  }, []);

  async function onSubmit(data) {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(
        "http://127.0.0.1:8000/ambiente/",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Reserva criada com sucesso!");
      navigate("/reserva"); // Ajuste para a rota que quiser
    } catch (error) {
      console.error("Erro ao criar reserva:", error.response?.data || error.message);
      alert("Erro ao criar reserva");
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Criar Reserva</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Data Início
          </label>
          <input
            type="date"
            {...register("data_ini")}
            className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.data_ini && (
            <p className="text-red-500 text-sm mt-1">{errors.data_ini.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Data Fim
          </label>
          <input
            type="date"
            {...register("data_fim")}
            className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.data_fim && (
            <p className="text-red-500 text-sm mt-1">{errors.data_fim.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Período
          </label>
          <select
            {...register("periodo")}
            className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Selecione</option>
            <option value="M">Manhã</option>
            <option value="T">Tarde</option>
            <option value="N">Noite</option>
          </select>
          {errors.periodo && (
            <p className="text-red-500 text-sm mt-1">{errors.periodo.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Professor Responsável
          </label>
          <select
            {...register("prof_resp", { valueAsNumber: true })}
            className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Selecione</option>
            {professores.map((prof) => (
              <option key={prof.id} value={prof.id}>
                {prof.username}
              </option>
            ))}
          </select>
          {errors.prof_resp && (
            <p className="text-red-500 text-sm mt-1">{errors.prof_resp.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Disciplina
          </label>
          <select
            {...register("disc", { valueAsNumber: true })}
            className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Selecione</option>
            {disciplinas.map((disc) => (
              <option key={disc.id} value={disc.id}>
                {disc.nome}
              </option>
            ))}
          </select>
          {errors.disc && (
            <p className="text-red-500 text-sm mt-1">{errors.disc.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Sala</label>
          <select
            {...register("sala_reservada", { valueAsNumber: true })}
            className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Selecione</option>
            {salas.map((sala) => (
              <option key={sala.id} value={sala.id}>
                {sala.nome}
              </option>
            ))}
          </select>
          {errors.sala_reservada && (
            <p className="text-red-500 text-sm mt-1">{errors.sala_reservada.message}</p>
          )}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Criar Reserva
          </button>
        </div>
      </form>
    </div>
  );
}
