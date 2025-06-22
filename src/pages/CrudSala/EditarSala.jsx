import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const schemaSala = z.object({
  nome: z.string().min(1, "Informe o nome da sala"),
  capacidade: z.coerce.number().min(1, "Capacidade deve ser pelo menos 1"),
});

export function EditarSala() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schemaSala),
  });

  useEffect(() => {
    async function carregarSala() {
      try {
        const token = localStorage.getItem("access_token");
        const headers = { Authorization: `Bearer ${token}` };

        const response = await axios.get(`http://127.0.0.1:8000/sala/${id}`, { headers });
        reset(response.data); // Preenche o formulário com os dados recebidos
      } catch (error) {
        console.error("Erro ao carregar sala:", error.response?.data || error.message);
        alert("Erro ao carregar sala.");
      }
    }

    carregarSala();
  }, [id, reset]);

  async function onSubmit(data) {
    try {
      const token = localStorage.getItem("access_token");

      await axios.put(`http://127.0.0.1:8000/sala/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      alert("Sala atualizada com sucesso!");
      navigate("/salas");
    } catch (error) {
      console.error("Erro ao atualizar sala:", error.response?.data || error.message);
      alert("Erro ao atualizar sala.");
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Editar Sala</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700">Nome da Sala</label>
          <input
            {...register("nome")}
            className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Digite o nome da sala"
          />
          {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Capacidade</label>
          <input
            type="number"
            {...register("capacidade")}
            className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ex: 30"
          />
          {errors.capacidade && <p className="text-red-500 text-sm mt-1">{errors.capacidade.message}</p>}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Atualizar Sala
          </button>
        </div>
      </form>
    </div>
  );
}
