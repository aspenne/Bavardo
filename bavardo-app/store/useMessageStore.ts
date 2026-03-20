import { create } from 'zustand';

import type { Conversation, Message } from '@/types/message';

interface MessageState {
  conversations: Conversation[];
  messages: Message[];
  getConversations: () => Conversation[];
  getMessages: (conversationId: string) => Message[];
  sendMessage: (conversationId: string, text: string) => void;
  markAsRead: (conversationId: string) => void;
}

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    contactName: 'Marie',
    contactAvatar: 'MA',
    lastMessage: 'On se voit dimanche pour le déjeuner ?',
    lastMessageTime: '2026-03-20T10:30:00',
    unreadCount: 2,
  },
  {
    id: 'conv-2',
    contactName: 'Jean-Pierre',
    contactAvatar: 'JP',
    lastMessage: "J'ai trouvé les photos de vacances !",
    lastMessageTime: '2026-03-19T16:45:00',
    unreadCount: 0,
  },
  {
    id: 'conv-3',
    contactName: 'Dr. Martin',
    contactAvatar: 'DM',
    lastMessage: 'Votre prochain rendez-vous est confirmé.',
    lastMessageTime: '2026-03-18T09:15:00',
    unreadCount: 1,
  },
  {
    id: 'conv-4',
    contactName: 'Pharmacie du Centre',
    contactAvatar: '💊',
    lastMessage: 'Votre ordonnance est prête.',
    lastMessageTime: '2026-03-17T14:00:00',
    unreadCount: 1,
  },
  {
    id: 'conv-5',
    contactName: 'Sophie',
    contactAvatar: 'SO',
    lastMessage: 'Merci mamie, gros bisous ! 😘',
    lastMessageTime: '2026-03-16T18:20:00',
    unreadCount: 0,
  },
];

const MOCK_MESSAGES: Message[] = [
  // Marie
  {
    id: 'msg-1',
    conversationId: 'conv-1',
    senderId: 'marie',
    text: 'Bonjour ! Comment allez-vous ?',
    timestamp: '2026-03-20T09:00:00',
    read: true,
  },
  {
    id: 'msg-2',
    conversationId: 'conv-1',
    senderId: 'me',
    text: 'Très bien merci Marie, et vous ?',
    timestamp: '2026-03-20T09:05:00',
    read: true,
  },
  {
    id: 'msg-3',
    conversationId: 'conv-1',
    senderId: 'marie',
    text: "Bien aussi ! J'ai fait un gâteau aux pommes hier.",
    timestamp: '2026-03-20T09:10:00',
    read: true,
  },
  {
    id: 'msg-4',
    conversationId: 'conv-1',
    senderId: 'marie',
    text: 'On se voit dimanche pour le déjeuner ?',
    timestamp: '2026-03-20T10:30:00',
    read: false,
  },
  // Jean-Pierre
  {
    id: 'msg-5',
    conversationId: 'conv-2',
    senderId: 'me',
    text: 'Tu as retrouvé les photos de Nice ?',
    timestamp: '2026-03-19T15:00:00',
    read: true,
  },
  {
    id: 'msg-6',
    conversationId: 'conv-2',
    senderId: 'jean-pierre',
    text: "Oui ! J'ai trouvé les photos de vacances !",
    timestamp: '2026-03-19T16:45:00',
    read: true,
  },
  // Dr. Martin
  {
    id: 'msg-7',
    conversationId: 'conv-3',
    senderId: 'me',
    text: 'Bonjour Docteur, est-ce que mon rendez-vous du 25 est maintenu ?',
    timestamp: '2026-03-18T08:30:00',
    read: true,
  },
  {
    id: 'msg-8',
    conversationId: 'conv-3',
    senderId: 'dr-martin',
    text: 'Bonjour, oui votre prochain rendez-vous est confirmé pour le 25 mars à 10h.',
    timestamp: '2026-03-18T09:15:00',
    read: false,
  },
  // Pharmacie
  {
    id: 'msg-9',
    conversationId: 'conv-4',
    senderId: 'pharmacie',
    text: 'Bonjour, votre ordonnance est prête. Vous pouvez passer la récupérer.',
    timestamp: '2026-03-17T14:00:00',
    read: false,
  },
  // Sophie
  {
    id: 'msg-10',
    conversationId: 'conv-5',
    senderId: 'me',
    text: "Ma petite Sophie, j'espère que tes examens se sont bien passés !",
    timestamp: '2026-03-16T17:00:00',
    read: true,
  },
  {
    id: 'msg-11',
    conversationId: 'conv-5',
    senderId: 'sophie',
    text: "Oui mamie, j'ai eu 16 ! Merci mamie, gros bisous ! 😘",
    timestamp: '2026-03-16T18:20:00',
    read: true,
  },
];

let nextId = 12;

export const useMessageStore = create<MessageState>((set, get) => ({
  conversations: MOCK_CONVERSATIONS,
  messages: MOCK_MESSAGES,

  getConversations: () => {
    return [...get().conversations].sort(
      (a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
    );
  },

  getMessages: (conversationId: string) => {
    return get()
      .messages.filter((m) => m.conversationId === conversationId)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  },

  sendMessage: (conversationId: string, text: string) => {
    const id = `msg-${nextId++}`;
    const now = new Date().toISOString();
    const newMessage: Message = {
      id,
      conversationId,
      senderId: 'me',
      text,
      timestamp: now,
      read: true,
    };

    set((state) => ({
      messages: [...state.messages, newMessage],
      conversations: state.conversations.map((c) =>
        c.id === conversationId ? { ...c, lastMessage: text, lastMessageTime: now } : c
      ),
    }));
  },

  markAsRead: (conversationId: string) => {
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId ? { ...c, unreadCount: 0 } : c
      ),
      messages: state.messages.map((m) =>
        m.conversationId === conversationId ? { ...m, read: true } : m
      ),
    }));
  },
}));
