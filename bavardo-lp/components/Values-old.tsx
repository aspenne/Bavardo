import { Accessibility, Lock, Smartphone, Users } from "lucide-react";

export default function Values() {
  const values = [
    {
      icon: Smartphone,
      title: "Simplicité",
      description:
        "Interface intuitive conçue pour être accessible à tous, quel que soit le niveau de compétence numérique. Navigation facile et fonctionnalités claires pour une prise en main immédiate.",
    },
    {
      icon: Users,
      title: "Lien Social",
      description:
        "Créer et maintenir des connexions significatives entre les bénéficiaires et leurs proches. Favoriser les échanges réguliers et renforcer les liens familiaux malgré la distance.",
    },
    {
      icon: Lock,
      title: "Sécurité",
      description:
        "Protection des données personnelles avec un chiffrement de bout en bout. Contrôle parental et modération pour garantir un environnement sûr et adapté à tous les utilisateurs.",
    },
    {
      icon: Accessibility,
      title: "Accessibilité",
      description:
        "Conception inclusive adaptée aux personnes en situation de handicap. Interface avec contraste élevé, taille de police ajustable, commandes vocales et support pour les lecteurs d'écran.",
    },
  ];

  return (
    <section className="py-20 bg-[#fefefe]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 animate-fade-in-up">
          Nos Valeurs
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="bg-[#003e3a] text-white p-8 rounded-lg hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#478577]/40 animate-fade-in-up group"
                style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
              >
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <Icon size={48} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-sm leading-relaxed opacity-90">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
