export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIResponse {
  content: string;
}

export interface AIProviderConfig {
  apiKey?: string;
  model?: string;
  baseUrl?: string;
  /** System prompt sent with every request */
  systemPrompt?: string;
  /** Max tokens in the response */
  maxTokens?: number;
}

/**
 * Abstract interface for AI providers.
 * Implement this to add a new AI backend (Gemini, Claude, OpenAI, local model, etc.)
 */
export interface AIProvider {
  readonly name: string;

  /**
   * Send a conversation and get a response.
   * @param messages - Conversation history
   * @param config - Provider-specific configuration
   */
  chat(messages: AIMessage[], config: AIProviderConfig): Promise<AIResponse>;

  /** Check if the provider is available and configured */
  isAvailable(config: AIProviderConfig): boolean;
}
