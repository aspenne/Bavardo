import { colors } from '@/styles/theme';
import Section from './ui/Section';
import Container from './ui/Container';

const partners = [
  'DOMUS VI',
  'COLISÉE',
  'ORPEA',
  'KORIAN',
  'LNA SANTÉ',
];

export default function Partners() {
  return (
    <Section background="default" className="py-16">
      <Container className="text-center">
        <h3 className="text-2xl font-bold mb-8 animate-fade-in-up">
          Adopté par plus de 400 ESPMS et 1200 familles à travers toute la
          France
        </h3>

        <div className="flex flex-wrap items-center justify-center gap-12 opacity-60">
          {partners.map((partner, index) => (
            <div 
              key={index}
              className="text-xl font-bold transition-all duration-300 hover:opacity-100 hover:scale-110 cursor-pointer"
              style={{ color: colors.textPrimary }}
              onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
              onMouseLeave={(e) => e.currentTarget.style.color = colors.textPrimary}
            >
              {partner}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
