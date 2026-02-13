import { Smartphone, Users, Lock, Accessibility, LucideIcon } from 'lucide-react';
import { colors } from '@/styles/theme';
import Section from './ui/Section';
import Container from './ui/Container';

interface Value {
  icon: LucideIcon;
  title: string;
  description: string;
}

const values: Value[] = [
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

export default function Values() {
  return (
    <Section id="valeurs" background="default">
      <Container>
        <h2 className="text-4xl font-bold text-center mb-16 animate-fade-in-up">
          Nos Valeurs
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-lg text-white transition-all duration-300 shadow-lg animate-fade-in-up group hover:-translate-y-2"
                style={{
                  backgroundColor: colors.primary,
                  boxShadow: `0 10px 15px -3px rgba(71, 133, 119, 0.4)`,
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 20px 25px -5px rgba(71, 133, 119, 0.4)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `0 10px 15px -3px rgba(71, 133, 119, 0.4)`;
                }}
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
      </Container>
    </Section>
  );
}
