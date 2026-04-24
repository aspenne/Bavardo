import { create } from 'zustand';

import { api } from '@/services/api';
import { useAuthStore } from '@/store/useAuthStore';
import type { ApiEvent, CalendarEvent } from '@/types/event';
import { apiEventToLocal, localEventToApiPayload } from '@/types/event';

interface EventState {
  events: CalendarEvent[];
  isLoading: boolean;
  error: string | null;

  fetchEvents: () => Promise<void>;
  addEvent: (event: Omit<CalendarEvent, 'id'>) => Promise<void>;
  updateEvent: (id: string, data: Partial<Omit<CalendarEvent, 'id'>>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  getEventsForDate: (date: string) => CalendarEvent[];
}

export const useEventStore = create<EventState>((set, get) => ({
  events: [],
  isLoading: false,
  error: null,

  fetchEvents: async () => {
    const tenantId = useAuthStore.getState().tenantId;
    if (!tenantId) return;

    set({ isLoading: true, error: null });
    try {
      const data = await api.get<ApiEvent[]>(`/api/tenants/${tenantId}/events/`);
      const events = data.map(apiEventToLocal);
      set({ events });
    } catch (e: unknown) {
      set({ error: e instanceof Error ? e.message : 'Erreur chargement événements' });
    } finally {
      set({ isLoading: false });
    }
  },

  addEvent: async (event) => {
    const tenantId = useAuthStore.getState().tenantId;
    if (!tenantId) return;

    try {
      const payload = localEventToApiPayload(event);
      const data = await api.post<ApiEvent>(
        `/api/tenants/${tenantId}/events/`,
        payload,
      );
      const newEvent = apiEventToLocal(data);
      set((state) => ({ events: [...state.events, newEvent] }));
    } catch (e: unknown) {
      set({ error: e instanceof Error ? e.message : "Erreur création événement" });
    }
  },

  updateEvent: async (id, data) => {
    const tenantId = useAuthStore.getState().tenantId;
    if (!tenantId) return;

    try {
      // Récupérer l'événement actuel pour merger
      const current = get().events.find((e) => e.id === id);
      if (!current) return;

      const merged = { ...current, ...data };
      const payload = localEventToApiPayload(merged);
      const updated = await api.patch<ApiEvent>(
        `/api/tenants/${tenantId}/events/${id}/`,
        payload,
      );
      const localEvent = apiEventToLocal(updated);
      set((state) => ({
        events: state.events.map((e) => (e.id === id ? localEvent : e)),
      }));
    } catch (e: unknown) {
      set({ error: e instanceof Error ? e.message : "Erreur mise à jour événement" });
    }
  },

  deleteEvent: async (id) => {
    const tenantId = useAuthStore.getState().tenantId;
    if (!tenantId) return;

    try {
      await api.delete(`/api/tenants/${tenantId}/events/${id}/`);
      set((state) => ({
        events: state.events.filter((e) => e.id !== id),
      }));
    } catch (e: unknown) {
      set({ error: e instanceof Error ? e.message : "Erreur suppression événement" });
    }
  },

  getEventsForDate: (date) => {
    return get()
      .events.filter((e) => e.date === date)
      .sort((a, b) => a.time.localeCompare(b.time));
  },
}));
