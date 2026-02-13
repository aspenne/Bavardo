# Bavardo

Bavardo est un assistant vocal en francais concu pour les seniors. Le projet est compose de deux parties : une application mobile et un site vitrine.

## Projets

| Projet | Description | Stack | Dossier |
|---|---|---|---|
| **Application mobile** | App iOS/Android avec assistant vocal, calendrier interactif et navigation simplifiee | React Native, Expo SDK 54, NativeWind, Zustand | [`bavardo/`](./bavardo/) |
| **Landing page** | Site vitrine avec presentation, tarifs, temoignages et formulaire de contact | Next.js 16, Tailwind CSS 4 | [`bavardo-lp/`](./bavardo-lp/) |

## Demarrage rapide

### Application mobile

```bash
cd bavardo
npm install
npm start        # Serveur Expo dev
npm run ios      # Simulateur iOS
npm run android  # Emulateur Android
```

### Landing page

```bash
cd bavardo-lp
npm install
npm run dev      # http://localhost:3000
```

## Fonctionnalites principales

### Application mobile
- Reconnaissance et synthese vocale en francais (`fr-FR`)
- Calendrier interactif avec gestion d'evenements (CRUD)
- Interface grande taille, adaptee aux seniors
- Navigation par onglets : Accueil, Messagerie, Agenda, Jeux

### Landing page
- Presentation de l'application et de ses valeurs
- Grille tarifaire
- Temoignages utilisateurs
- Formulaire de contact

## Architecture

```
Start_up/
  bavardo/           # Application mobile (React Native / Expo)
  bavardo-lp/        # Landing page (Next.js)
  builds/            # Builds EAS
```
