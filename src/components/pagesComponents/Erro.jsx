export function Erro() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50 px-4">
      <div className="max-w-md text-center bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-red-600 mb-4">
          Acesso Negado
        </h1>
        <p className="text-gray-700 mb-6">
          Esta área é restrita apenas para <span className="font-semibold text-red-500">Diretores</span>.
          Por favor, entre em contato com o administrador para obter acesso.
        </p>
        <button
          onClick={() => window.history.back()}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
