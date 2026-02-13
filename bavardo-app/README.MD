# Bavardo - Application Mobile

Assistant vocal en francais pour les seniors, construit avec React Native et Expo.

## Fonctionnalites

- **Assistant vocal** : reconnaissance vocale (`fr-FR`) et synthese vocale pour une interaction mains-libres
- **Calendrier interactif** : vue mensuelle avec gestion complete des evenements (ajout, modification, suppression)
- **Navigation intuitive** : interface simplifiee avec navigation par onglets (Accueil, Messagerie, Agenda, Jeux)

## Stack technique

| Technologie | Usage |
|---|---|
| React Native 0.81 | Framework mobile |
| Expo SDK 54 | Toolchain et services natifs |
| Expo Router | Routing file-based |
| NativeWind | Styling (Tailwind CSS pour RN) |
| Zustand | State management |
| expo-speech-recognition | Reconnaissance vocale |
| expo-speech | Synthese vocale |

## Demarrage rapide

```bash
# Installer les dependances
npm install

# Lancer le serveur de dev (necessite un dev client)
npm start

# Lancer sur simulateur iOS
npm run ios

# Lancer sur emulateur Android
npm run android
```

> **Prerequis** : Node 25.2.1 (voir `.nvmrc`), un dev client build via `eas build --profile development`

## Structure du projet

```
app/
  _layout.tsx              # Root Stack navigator
  index.tsx                # Redirection vers /home
  (auth)/                  # Ecrans d'authentification
    login.tsx
    signup.tsx
  (app)/                   # Ecrans principaux (avec MainLayout)
    home.tsx               # Assistant vocal
    calendar.tsx           # Calendrier interactif
components/
  ui/                      # Composants UI reutilisables
    Button.tsx
    Card.tsx
  layout/                  # Composants de mise en page
    Container.tsx
    MainLayout.tsx
  calendar/                # Composants du calendrier
    CalendarGrid.tsx
    EventCard.tsx
    EventModal.tsx
    DayEventsPanel.tsx
store/
  useEventStore.ts         # Store Zustand (evenements CRUD)
types/
  event.ts                 # Types TypeScript
```

## Scripts

| Commande | Description |
|---|---|
| `npm start` | Serveur Expo dev |
| `npm run ios` | Lancer sur iOS |
| `npm run android` | Lancer sur Android |
| `npm run lint` | ESLint + Prettier check |
| `npm run format` | Auto-fix lint et formatage |
| `npx expo prebuild` | Regenerer les dossiers natifs |

## Conventions

- TypeScript strict
- Tout le texte UI est en francais
- Styling via NativeWind (`className`), pas `StyleSheet.create`
- Path aliases : `@/*` pointe vers la racine du projet
