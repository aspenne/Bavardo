/** Types locaux utilisés par l'UI */
export interface Message {
  id: string;
  conversationId: string;
  senderId: string; // 'me' for current user, contact id otherwise
  text: string;
  timestamp: string; // ISO 8601
  read: boolean;
}

export interface Conversation {
  id: string;
  contactName: string;
  contactAvatar: string; // initials or emoji
  lastMessage: string;
  lastMessageTime: string; // ISO 8601
  unreadCount: number;
  isIa?: boolean;
}

/** Types bruts de l'API backend */
export interface ApiUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_ia: boolean;
  is_active: boolean;
}

export interface ApiConversation {
  id: number;
  tenant: number;
  participant_1: ApiUser;
  participant_2: ApiUser;
  other_participant: ApiUser;
  unread_count: number;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface ApiMessage {
  id: number;
  conversation: number;
  sender: ApiUser;
  content: string;
  created_at: string;
  read_at: string | null;
  is_read: boolean;
  is_active: boolean;
}

/** Helpers de conversion API → UI */

function getInitials(firstName: string, lastName: string): string {
  const f = firstName.charAt(0).toUpperCase();
  const l = lastName.charAt(0).toUpperCase();
  return `${f}${l}`.trim() || '?';
}

export function apiConversationToLocal(conv: ApiConversation): Conversation {
  const other = conv.other_participant;
  return {
    id: String(conv.id),
    contactName: `${other.first_name} ${other.last_name}`.trim(),
    contactAvatar: other.is_ia ? '🐢' : getInitials(other.first_name, other.last_name),
    lastMessage: '',
    lastMessageTime: conv.updated_at,
    unreadCount: conv.unread_count,
    isIa: other.is_ia,
  };
}

export function apiMessageToLocal(
  msg: ApiMessage,
  currentUserId: number,
): Message {
  return {
    id: String(msg.id),
    conversationId: String(msg.conversation),
    senderId: msg.sender.id === currentUserId ? 'me' : String(msg.sender.id),
    text: msg.content,
    timestamp: msg.created_at,
    read: msg.is_read,
  };
}
