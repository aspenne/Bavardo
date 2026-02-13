export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 bg-[#fefefe]">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
          Créer du lien, où que vous{" "}
          <span className="italic font-normal text-[#003e3a]">soyez</span>
        </h1>

        <p
          className="text-lg text-gray-700 max-w-3xl mx-auto mb-4 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.2s", opacity: 0 }}
        >
          Bavardo est une plateforme innovante qui facilite la communication
          entre les ESMS et leurs bénéficiaires, en les aidant à rester
          connectés avec leurs proches. Grâce à une interface intuitive
          accessible sur tablette et téléphone, Bavardo simplifie les échanges
          et renforce les liens, où que vous soyez.
        </p>

        <p
          className="text-lg text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.3s", opacity: 0 }}
        >
          Que ce soit pour envoyer un message, partager des photos ou organiser
          une visioconférence, tout est pensé pour être simple et accessible à
          tous.
        </p>

        <button
          className="bg-[#003e3a] text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-[#003e3a]/90 hover:shadow-xl hover:shadow-[#478577]/40 transition-all duration-300 hover:scale-105 animate-fade-in-up"
          style={{ animationDelay: "0.4s", opacity: 0 }}
        >
          S'INSCRIRE GRATUITEMENT
        </button>
      </div>
    </section>
  );
}
