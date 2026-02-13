import { create } from 'zustand';

import { CalendarEvent } from '@/types/event';

interface EventState {
  events: CalendarEvent[];
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  updateEvent: (id: string, data: Partial<Omit<CalendarEvent, 'id'>>) => void;
  deleteEvent: (id: string) => void;
  getEventsForDate: (date: string) => CalendarEvent[];
}

const sampleEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Café avec Ali',
    date: '2026-02-05',
    time: '12:30',
    description: 'Rendez-vous café au Bistrot du coin',
    color: 'green',
  },
  {
    id: '2',
    title: 'Réunion marketing',
    date: '2026-02-05',
    time: '15:30',
    description: 'Point sur la campagne trimestrielle',
    color: 'gray',
  },
  {
    id: '3',
    title: 'Réunion générale',
    date: '2026-02-08',
    time: '17:00',
    description: "Réunion d'équipe mensuelle",
    color: 'green',
  },
  {
    id: '4',
    title: 'Dîner avec Claire',
    date: '2026-02-08',
    time: '19:30',
    description: 'Restaurant Le Petit Clos',
    color: 'gray',
  },
  {
    id: '5',
    title: 'Standup du lundi',
    date: '2026-02-12',
    time: '10:00',
    description: 'Point hebdomadaire',
    color: 'gray',
  },
  {
    id: '6',
    title: 'Planification contenu',
    date: '2026-02-12',
    time: '12:00',
    description: 'Planifier le contenu du mois prochain',
    color: 'blue',
  },
  {
    id: '7',
    title: 'Démo produit',
    date: '2026-02-13',
    time: '11:30',
    description: 'Présentation des nouvelles fonctionnalités',
    color: 'blue',
  },
  {
    id: '8',
    title: 'Rattrapage avec Marc',
    date: '2026-02-13',
    time: '15:30',
    description: 'Point sur le projet en cours',
    color: 'green',
  },
  {
    id: '9',
    title: 'Travail concentré',
    date: '2026-02-14',
    time: '10:00',
    description: 'Bloc de travail sans interruption',
    color: 'blue',
  },
  {
    id: '10',
    title: 'Entretien individuel',
    date: '2026-02-14',
    time: '11:00',
    description: 'One-on-one avec le manager',
    color: 'green',
  },
  {
    id: '11',
    title: 'Sync design',
    date: '2026-02-14',
    time: '11:30',
    description: "Synchronisation avec l'équipe design",
    color: 'blue',
  },
  {
    id: '12',
    title: 'Déjeuner avec Olivier',
    date: '2026-02-15',
    time: '13:00',
    description: 'Brasserie du Parc',
    color: 'orange',
  },
  {
    id: '13',
    title: 'Standup du vendredi',
    date: '2026-02-16',
    time: '10:00',
    description: 'Revue de fin de semaine',
    color: 'gray',
  },
  {
    id: '14',
    title: 'Rendez-vous médecin',
    date: '2026-02-17',
    time: '12:00',
    description: 'Consultation annuelle',
    color: 'orange',
  },
  {
    id: '15',
    title: "Anniversaire d'Ava",
    date: '2026-02-18',
    time: '14:00',
    description: "Fête d'anniversaire chez Ava",
    color: 'orange',
  },
  {
    id: '16',
    title: "Déjeuner d'équipe",
    date: '2026-02-19',
    time: '13:15',
    description: "Déjeuner mensuel de l'équipe",
    color: 'green',
  },
  {
    id: '17',
    title: 'Planification produit',
    date: '2026-02-21',
    time: '10:30',
    description: 'Roadmap Q2',
    color: 'blue',
  },
  {
    id: '18',
    title: "Premier jour d'Amélie",
    date: '2026-02-22',
    time: '11:00',
    description: 'Accueil de la nouvelle recrue',
    color: 'green',
  },
  {
    id: '19',
    title: 'Café avec Anne',
    date: '2026-02-23',
    time: '10:30',
    description: 'Pause café informelle',
    color: 'green',
  },
  {
    id: '20',
    title: 'Retour design',
    date: '2026-02-23',
    time: '15:30',
    description: 'Session de feedback sur les maquettes',
    color: 'orange',
  },
  {
    id: '21',
    title: 'Semi-marathon',
    date: '2026-02-24',
    time: '08:00',
    description: 'Course du dimanche matin',
    color: 'orange',
  },
  {
    id: '22',
    title: "Journée d'équipe",
    date: '2026-02-26',
    time: '',
    description: "Offsite d'équipe - journée complète",
    color: 'purple',
  },
  {
    id: '23',
    title: 'Travail concentré',
    date: '2026-02-26',
    time: '10:15',
    description: 'Bloc de travail profond',
    color: 'blue',
  },
  {
    id: '24',
    title: 'Déjeuner avec Zoé',
    date: '2026-02-26',
    time: '14:00',
    description: 'Restaurant La Terrasse',
    color: 'green',
  },
  {
    id: '25',
    title: 'Bilan trimestriel',
    date: '2026-02-27',
    time: '12:30',
    description: 'Présentation des résultats Q1',
    color: 'orange',
  },
];

let nextId = 26;

export const useEventStore = create<EventState>((set, get) => ({
  events: sampleEvents,

  addEvent: (event) => {
    const id = String(nextId++);
    set((state) => ({
      events: [...state.events, { ...event, id }],
    }));
  },

  updateEvent: (id, data) => {
    set((state) => ({
      events: state.events.map((e) => (e.id === id ? { ...e, ...data } : e)),
    }));
  },

  deleteEvent: (id) => {
    set((state) => ({
      events: state.events.filter((e) => e.id !== id),
    }));
  },

  getEventsForDate: (date) => {
    return get()
      .events.filter((e) => e.date === date)
      .sort((a, b) => a.time.localeCompare(b.time));
  },
}));
