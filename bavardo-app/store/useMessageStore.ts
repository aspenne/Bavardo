import { create } from 'zustand';

import { api } from '@/services/api';
import { useAuthStore } from '@/store/useAuthStore';
import type {
  ApiConversation,
  ApiMessage,
  Conversation,
  Message,
} from '@/types/message';
import {
  apiConversationToLocal,
  apiMessageToLocal,
} from '@/types/message';

interface MessageState {
  conversations: Conversation[];
  messages: Message[];
  isLoading: boolean;
  error: string | null;

  fetchConversations: () => Promise<void>;
  fetchMessages: (conversationId: string) => Promise<void>;
  getConversations: () => Conversation[];
  getMessages: (conversationId: string) => Message[];
  sendMessage: (conversationId: string, text: string) => Promise<void>;
  markAsRead: (conversationId: string) => void;
}

export const useMessageStore = create<MessageState>((set, get) => ({
  conversations: [],
  messages: [],
  isLoading: false,
  error: null,

  fetchConversations: async () => {
    const tenantId = useAuthStore.getState().tenantId;
    if (!tenantId) return;

    set({ isLoading: true, error: null });
    try {
      const data = await api.get<ApiConversation[]>(
        `/api/tenants/${tenantId}/conversations/`,
      );
      const conversations = data.map(apiConversationToLocal);
      set({ conversations });
    } catch (e: unknown) {
      set({ error: e instanceof Error ? e.message : 'Erreur chargement conversations' });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMessages: async (conversationId: string) => {
    const tenantId = useAuthStore.getState().tenantId;
    if (!tenantId) return;

    set({ isLoading: true });
    try {
      const data = await api.get<ApiMessage[]>(
        `/api/tenants/${tenantId}/conversations/${conversationId}/messages/`,
      );
      const currentUserId = useAuthStore.getState().user?.id ?? 0;
      const newMessages = data.map((m) => apiMessageToLocal(m, currentUserId));

      // Remplacer les messages de cette conversation
      set((state) => ({
        messages: [
          ...state.messages.filter((m) => m.conversationId !== conversationId),
          ...newMessages,
        ],
      }));
    } catch (e: unknown) {
      set({ error: e instanceof Error ? e.message : 'Erreur chargement messages' });
    } finally {
      set({ isLoading: false });
    }
  },

  getConversations: () => {
    return [...get().conversations].sort(
      (a, b) =>
        new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime(),
    );
  },

  getMessages: (conversationId: string) => {
    return get()
      .messages.filter((m) => m.conversationId === conversationId)
      .sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
      );
  },

  sendMessage: async (conversationId: string, text: string) => {
    const tenantId = useAuthStore.getState().tenantId;
    if (!tenantId) return;

    const currentUserId = useAuthStore.getState().user?.id ?? 0;

    try {
      const data = await api.post<ApiMessage>(
        `/api/tenants/${tenantId}/conversations/${conversationId}/messages/`,
        { content: text },
      );

      const newMessage = apiMessageToLocal(data, currentUserId);
      const now = new Date().toISOString();

      set((state) => ({
        messages: [...state.messages, newMessage],
        conversations: state.conversations.map((c) =>
          c.id === conversationId
            ? { ...c, lastMessage: text, lastMessageTime: now }
            : c,
        ),
      }));

      // L'IA répond automatiquement côté backend si l'autre participant est IA.
      // On recharge les messages après un court délai pour récupérer la réponse IA.
      const conv = get().conversations.find((c) => c.id === conversationId);
      if (conv?.isIa) {
        setTimeout(() => {
          get().fetchMessages(conversationId);
        }, 3000);
      }
    } catch (e: unknown) {
      set({ error: e instanceof Error ? e.message : "Erreur d'envoi" });
    }
  },

  markAsRead: (conversationId: string) => {
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId ? { ...c, unreadCount: 0 } : c,
      ),
      messages: state.messages.map((m) =>
        m.conversationId === conversationId ? { ...m, read: true } : m,
      ),
    }));
  },
}));
