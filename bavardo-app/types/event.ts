export type EventColor = 'blue' | 'green' | 'orange' | 'purple' | 'gray';

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // format YYYY-MM-DD
  time: string; // format HH:mm
  description: string;
  color: EventColor;
}

/** Types bruts de l'API backend */
export interface ApiEvent {
  id: number;
  tenant: number;
  title: string;
  description: string;
  event_type: 'medical' | 'visit' | 'activity' | 'meal' | 'other';
  start_date: string; // ISO datetime
  end_date: string;
  participant: number | null;
  created_by: number | null;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

const EVENT_TYPE_COLORS: Record<ApiEvent['event_type'], EventColor> = {
  medical: 'orange',
  visit: 'green',
  activity: 'blue',
  meal: 'purple',
  other: 'gray',
};

export function apiEventToLocal(evt: ApiEvent): CalendarEvent {
  const startDate = new Date(evt.start_date);
  return {
    id: String(evt.id),
    title: evt.title,
    date: startDate.toISOString().split('T')[0],
    time: startDate.toTimeString().slice(0, 5),
    description: evt.description,
    color: EVENT_TYPE_COLORS[evt.event_type] ?? 'gray',
  };
}

const COLOR_TO_EVENT_TYPE: Record<EventColor, ApiEvent['event_type']> = {
  orange: 'medical',
  green: 'visit',
  blue: 'activity',
  purple: 'meal',
  gray: 'other',
};

export function localEventToApiPayload(
  event: Omit<CalendarEvent, 'id'>,
): Record<string, unknown> {
  const dateTime = `${event.date}T${event.time || '00:00'}:00`;
  const startDate = new Date(dateTime);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // +1h par défaut

  return {
    title: event.title,
    description: event.description,
    event_type: COLOR_TO_EVENT_TYPE[event.color] ?? 'other',
    start_date: startDate.toISOString(),
    end_date: endDate.toISOString(),
  };
}
