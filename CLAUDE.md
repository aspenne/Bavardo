# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bavardo is a French-language voice assistant for seniors. The repo contains two projects:

- **bavardo-app/** — iOS/Android mobile app (React Native, Expo SDK 54)
- **bavardo-lp/** — Marketing landing page (Next.js 16, Tailwind CSS 4)

All UI text across both projects is in French.

## Mobile App (bavardo-app/)

### Commands

```bash
cd bavardo-app
npm start                          # Expo dev server (requires dev client)
npm run ios                        # iOS simulator
npm run android                    # Android emulator
npm run lint                       # ESLint + Prettier check
npm run format                     # Auto-fix lint and formatting
npx expo prebuild                  # Regenerate native ios/ and android/ directories
eas build --profile development    # Build dev client
eas build --profile ios-simulator  # Build for iOS simulator
```

Node version: 25.2.1 (see `bavardo-app/.nvmrc`)

### Architecture

**Routing**: Expo Router (file-based) with route groups:
- `app/(auth)/` — Login/signup screens, no app chrome
- `app/(app)/` — Main screens, automatically wrapped in `MainLayout` (header + bottom tabs + clock)
- `app/index.tsx` redirects to `/home`

**Styling**: NativeWind — use `className` props, never `StyleSheet.create()`. Design tokens defined in `tailwind.config.js`: brand colors (`primary` #003E3A, `secondary` #4A897A, `accent` #F1844F, `background` #FFF0DC), spacing (`xs`–`2xl`), border radius. Metro bundler configured via `withNativeWind`.

**State**: Zustand store in `store/useEventStore.ts` for calendar events CRUD.

**Path aliases**: `@/*` maps to project root — use `@/components/...`, `@/store/...`, `@/types/...`.

**Voice features**:
- `expo-speech-recognition` — Voice input (`fr-FR`)
- `expo-speech` — TTS (French voice: `com.apple.ttsbundle.Thomas-compact`)
- `expo-audio` — Audio playback

**Component organization**:
- `components/ui/` — Reusable primitives (Button, Card)
- `components/layout/` — Layout (Container, MainLayout)
- `components/calendar/` — Calendar feature components
- `types/` — TypeScript type definitions

### Conventions

- TypeScript strict mode
- NativeWind `className` only (no `StyleSheet.create`)
- Screens go in `app/(app)/` or `app/(auth)/`
- `Container` wraps content with SafeAreaProvider + background color

## Database Schema

The backend database uses the following relational schema:

**User** — `id` (PK, int), `fName` (varchar), `lName` (varchar), `ia` (bool)

**Tenant** — `id` (PK, int), `type` (varchar), `payload` (text)

**Lien** — `idTenant` (PK/FK→Tenant, int), `idUser` (PK/FK→User, int), `type` (varchar)
- Links users to tenants (family, caregiver, etc.)

**Message** — `id` (PK, int), `content` (text), `author` (FK→User, int)

**Read** — `idMessage` (PK/FK→Message, int), `idUser` (PK/FK→User, int)
- Tracks which users have read which messages

**Chat** — `id` (PK, int)

**UserInChat** — `idUser` (PK/FK→User, int), `idChat` (PK/FK→Chat, int)
- Many-to-many: users participating in a chat

**Event** — `id` (PK, int), `dateStart` (datetime), `dateEnd` (datetime), `type` (varchar)

**UserEvent** — `idUser` (PK/FK→User, int), `idEvent` (PK/FK→Event, int)
- Many-to-many: users linked to events

**Game** — `id` (PK, int), `name` (varchar)

**Session** — `idUser` (PK/FK→User, int), `idGame` (PK/FK→Game, int), `payload` (text), `time` (datetime)
- Game sessions played by users

## Landing Page (bavardo-lp/)

### Commands

```bash
cd bavardo-lp
npm install
npm run dev      # Dev server at http://localhost:3000
npm run build    # Production build
npm run lint     # ESLint
```

### Architecture

Next.js 16 with App Router. Single-page marketing site with sections: Hero, Values, Partners, Pricing, Testimonials, Contact. Uses Tailwind CSS 4, Lucide React icons, Geist font.

