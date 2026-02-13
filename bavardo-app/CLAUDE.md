# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bavardo is a French-language voice-assistant mobile app for seniors, built with React Native (Expo SDK 54). It uses speech recognition and text-to-speech to let users interact via voice. The app targets iOS and Android (no web).

## Commands

- `npm start` — Start Expo dev server (requires dev client build)
- `npm run ios` — Run on iOS simulator
- `npm run android` — Run on Android emulator
- `npm run lint` — ESLint + Prettier check
- `npm run format` — Auto-fix lint and formatting
- `npx expo prebuild` — Regenerate native `ios/` and `android/` directories
- `eas build --profile development` — Build dev client
- `eas build --profile ios-simulator` — Build for iOS simulator specifically

Node version: 25.2.1 (see `.nvmrc`)

## Architecture

**Routing**: Expo Router (file-based) with route groups. `app/(auth)/` for login/signup screens (no app chrome), `app/(app)/` for main screens (wrapped in MainLayout automatically). The root layout (`app/_layout.tsx`) uses `<Stack />` and imports `global.css`. `app/index.tsx` redirects to `/home`.

**Styling**: NativeWind (Tailwind CSS for React Native). Styles are applied via `className` props. The Tailwind config (`tailwind.config.js`) defines a custom design system with brand colors (`primary`, `secondary`, `accent`, `background`), custom spacing tokens (`xs`–`2xl`), and border radius tokens. Metro is configured via `withNativeWind` in `metro.config.js`, and Babel uses `nativewind/babel` preset.

**State management**: Zustand. `store/useEventStore.ts` manages calendar events (CRUD operations).

**Path aliases**: `@/*` maps to the project root (configured in `tsconfig.json`). Use `@/components/ui/...`, `@/components/layout/...`, `@/components/calendar/...`, `@/store/...`, `@/types/...`.

**Shared layout**: `MainLayout` (`components/layout/MainLayout.tsx`) provides the app shell with header (brand + clock) and bottom tab navigation (Accueil, Messagerie, Agenda, Jeux). Applied automatically via `(app)/_layout.tsx` — screens in `(app)/` don't need to wrap manually.

**Component organization**:
- `components/ui/` — Reusable UI primitives (Button, Card)
- `components/layout/` — Layout components (Container, MainLayout)
- `components/calendar/` — Calendar-specific components (CalendarGrid, EventCard, DayEventsPanel, EventModal)
- `types/` — TypeScript type definitions

**Key native features**:
- `expo-speech-recognition` — Voice input (configured for `fr-FR`)
- `expo-speech` — Text-to-speech output (French voice: `com.apple.ttsbundle.Thomas-compact`)
- `expo-audio` — Audio playback

## Screen Flow

`index.tsx` → redirects to `/home` → `(app)/home.tsx` (main voice assistant screen). Auth: `(auth)/login.tsx` / `(auth)/signup.tsx`. Calendar: `(app)/calendar.tsx` (interactive monthly calendar with CRUD events via Zustand store).

## Conventions

- TypeScript with strict mode
- All UI text is in French
- Use NativeWind `className` for styling (not `StyleSheet.create`)
- Components organized in `components/ui/`, `components/layout/`, `components/calendar/`; screens in `app/(app)/` or `app/(auth)/`
- `Container` wraps content with SafeAreaProvider + background color
