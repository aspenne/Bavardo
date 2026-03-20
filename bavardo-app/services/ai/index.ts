import { GeminiProvider } from './providers/gemini';
import type { AIMessage, AIProvider, AIProviderConfig, AIResponse } from './types';

export type { AIMessage, AIProvider, AIProviderConfig, AIResponse };

const BAVARDO_SYSTEM_PROMPT = `Tu es Bavardo, un assistant vocal français bienveillant conçu pour les personnes âgées.

Règles :
- Réponds toujours en français, avec un langage simple et chaleureux.
- Sois concis : 2-3 phrases maximum par réponse.
- Utilise le vouvoiement.
- Tu peux aider avec : les rappels, la météo, les nouvelles, la conversation, les questions du quotidien.
- Si tu ne comprends pas, demande poliment de répéter.
- Ne mentionne jamais que tu es une IA ou un modèle de langage. Tu es simplement Bavardo, l'assistant.`;

/** Registry of available providers. Add new providers here. */
const providers: Record<string, AIProvider> = {
  gemini: new GeminiProvider(),
  // claude: new ClaudeProvider(),
  // openai: new OpenAIProvider(),
  // local: new LocalProvider(),
};

let activeProviderName = 'gemini';
let providerConfig: AIProviderConfig = {
  systemPrompt: BAVARDO_SYSTEM_PROMPT,
  maxTokens: 300,
};

/** Set the active AI provider */
export function setProvider(name: string) {
  if (!providers[name]) {
    throw new Error(
      `Unknown AI provider: ${name}. Available: ${Object.keys(providers).join(', ')}`
    );
  }
  activeProviderName = name;
}

/** Update provider configuration (API key, model, etc.) */
export function setConfig(config: Partial<AIProviderConfig>) {
  providerConfig = { ...providerConfig, ...config };
}

/** Get the current provider name */
export function getProviderName(): string {
  return activeProviderName;
}

/** Check if the current provider is ready */
export function isReady(): boolean {
  return providers[activeProviderName].isAvailable(providerConfig);
}

/** Send a message and get a response */
export async function chat(messages: AIMessage[]): Promise<AIResponse> {
  const provider = providers[activeProviderName];
  if (!provider.isAvailable(providerConfig)) {
    throw new Error(
      `Le provider "${activeProviderName}" n'est pas configuré. Vérifiez la clé API.`
    );
  }
  return provider.chat(messages, providerConfig);
}

/** Convenience: single message exchange */
export async function ask(userMessage: string): Promise<string> {
  const response = await chat([{ role: 'user', content: userMessage }]);
  return response.content;
}
