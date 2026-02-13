import { colors } from '@/styles/theme';
import Section from './ui/Section';
import Container from './ui/Container';
import Button from './ui/Button';

export default function Hero() {
  return (
    <Section id="accueil" background="default" className="pt-32 pb-20">
      <Container maxWidth="md" className="text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
          Créer du lien, où que vous{" "}
          <span 
            className="italic font-normal"
            style={{ color: colors.primary }}
          >
            soyez
          </span>
        </h1>

        <p 
          className="text-lg max-w-3xl mx-auto mb-4 leading-relaxed animate-fade-in-up" 
          style={{ 
            color: colors.textSecondary,
            animationDelay: '0.2s', 
            opacity: 0 
          }}
        >
          Bavardo est une plateforme innovante qui facilite la communication
          entre les ESMS et leurs bénéficiaires, en les aidant à rester
          connectés avec leurs proches. Grâce à une interface intuitive
          accessible sur tablette et téléphone, Bavardo simplifie les échanges
          et renforce les liens, où que vous soyez.
        </p>

        <p 
          className="text-lg max-w-3xl mx-auto mb-8 leading-relaxed animate-fade-in-up" 
          style={{ 
            color: colors.textSecondary,
            animationDelay: '0.3s', 
            opacity: 0 
          }}
        >
          Que ce soit pour envoyer un message, partager des photos ou organiser
          une visioconférence, tout est pensé pour être simple et accessible à
          tous.
        </p>

        <div 
          className="animate-fade-in-up" 
          style={{ animationDelay: '0.4s', opacity: 0 }}
        >
          <Button size="lg">
            S'INSCRIRE GRATUITEMENT
          </Button>
        </div>
      </Container>
    </Section>
  );
}
