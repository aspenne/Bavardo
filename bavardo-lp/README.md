# Bavardo - Landing Page

Site vitrine pour l'application Bavardo, construit avec Next.js.

## Fonctionnalites

- **Hero** : presentation de l'application avec call-to-action
- **Valeurs** : mise en avant des avantages (simplicite, accessibilite, securite)
- **Partenaires** : logos et references
- **Tarifs** : grille tarifaire
- **Temoignages** : retours utilisateurs
- **Contact** : formulaire de contact

## Stack technique

| Technologie | Usage |
|---|---|
| Next.js 16 | Framework React SSR |
| React 19 | UI library |
| Tailwind CSS 4 | Styling |
| Lucide React | Icones |
| Geist | Typographie |

## Demarrage rapide

```bash
# Installer les dependances
npm install

# Lancer le serveur de dev
npm run dev

# Build de production
npm run build

# Lancer en production
npm start
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur.

## Structure du projet

```
app/
  layout.tsx          # Layout racine (fonts, metadata)
  page.tsx            # Page d'accueil
  globals.css         # Styles globaux
components/
  Header.tsx          # Navigation / header
  Hero.tsx            # Section hero
  Values.tsx          # Section valeurs
  Partners.tsx        # Section partenaires
  Pricing.tsx         # Section tarifs
  Testimonials.tsx    # Section temoignages
  Contact.tsx         # Section contact
  ui/                 # Composants UI generiques
public/               # Assets statiques (images, favicon)
```

## Scripts

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de developpement |
| `npm run build` | Build de production |
| `npm start` | Serveur de production |
| `npm run lint` | ESLint |

## Deploiement

Le site peut etre deploye sur Vercel ou toute plateforme compatible Next.js.
