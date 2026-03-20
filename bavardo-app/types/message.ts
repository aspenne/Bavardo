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
}
