import video_back from "../../../assets/videos/video.mp4";
export function SectionAbout() {
  return (
    // Componente -> Section About Us
    <>
      <section className="relative bg-cover bg-center bg-no-repeat h-screen">

        <video autoPlay muted loop playsinline class="absolute top-0 left-0 w-full h-full object-cover z-0">
            <source src={video_back} type="video/mp4" />
            Seu navegador não suporta vídeos HTML5.
        </video>

        <div className="relative z-10 flex items-center justify-center h-full text-white text-center px-4">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-black">Desenvolvendo o futuro</h1>
            <p className="text-lg md:text-xl text-gray-200">Desenvolvendo o futuro através da educação.</p>
          </div>
        </div>
      </section>

      <section className="flex flex-col md:flex-row bg-gray-200 p-8">
  {/* Div do texto */}
  <div className="flex-1 flex flex-col justify-center p-4">
    <h2 className="text-3xl font-bold mb-4">Sobre nós</h2>
    <p className="text-lg">
      Projeto desenvolvido por Israel Santana para máteria de Programação FrontEnd no Senai 'Roberto Mange'.
    </p>
  </div>

  {/* Div da imagem */}
  <div className="flex-1 p-4">
    <img
      src="data:image/jpeg;base64,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"
      alt="Israel Santana"
      className="w-full h-auto rounded-xl shadow-lg"
    />
  </div>
</section>

    </>
  );
}
