import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Bénédicte Villa Telework",
      title: "Directrice",
      text: "Bavardo a transformé notre manière de communiquer avec les familles. L'interface est tellement intuitive que nos résidents l'ont adoptée immédiatement.",
      rating: 5,
    },
    {
      name: "Julien Bertrand",
      title: "Famille",
      text: "Grâce à Bavardo, je peux rester en contact quotidien avec ma mère. Les visioconférences sont d'une qualité exceptionnelle et très simples à utiliser.",
      rating: 5,
    },
    {
      name: "Marie Lombard",
      title: "Soignante",
      text: "Un outil formidable qui facilite notre travail au quotidien. Les familles sont ravies et nos résidents plus connectés que jamais.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-[#fefefe] px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 animate-fade-in-up">
          Merci de partager votre avis !
        </h2>
        <p
          className="text-center text-gray-600 mb-12 animate-fade-in-up"
          style={{ animationDelay: "0.1s", opacity: 0 }}
        >
          Votre avis est important pour nous et nous aide à améliorer notre
          service
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl hover:shadow-[#478577]/20 transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${0.2 + index * 0.1}s`, opacity: 0 }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="text-yellow-400 fill-yellow-400"
                    size={20}
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div>
                <div className="font-bold text-gray-900">
                  {testimonial.name}
                </div>
                <div className="text-sm text-[#003e3a]">
                  {testimonial.title}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="flex items-center justify-center gap-12 mt-12 opacity-60 animate-fade-in-up"
          style={{ animationDelay: "0.5s", opacity: 0 }}
        >
          <div className="text-center hover:opacity-100 hover:scale-110 transition-all duration-300">
            <div className="text-3xl font-bold text-[#003e3a]">4.5/5</div>
            <div className="text-sm">sur App Store</div>
          </div>
          <div className="text-center hover:opacity-100 hover:scale-110 transition-all duration-300">
            <div className="text-3xl font-bold text-[#003e3a]">4.7/5</div>
            <div className="text-sm">sur Play Store</div>
          </div>
          <div className="text-center hover:opacity-100 hover:scale-110 transition-all duration-300">
            <div className="text-3xl font-bold text-[#003e3a]">4.8/5</div>
            <div className="text-sm">sur Trustpilot</div>
          </div>
        </div>
      </div>
    </section>
  );
}
