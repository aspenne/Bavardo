export type EventColor = 'blue' | 'green' | 'orange' | 'purple' | 'gray';

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // format YYYY-MM-DD
  time: string; // format HH:mm
  description: string;
  color: EventColor;
}
