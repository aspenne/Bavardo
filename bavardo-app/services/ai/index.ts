import { GeminiProvider } from './providers/gemini';
import type { AIMessage, AIProvider, AIProviderConfig, AIResponse } from './types';

export type { AIMessage, AIProvider, AIProviderConfig, AIResponse };

const BAVARDO_SYSTEM_PROMPT = `Tu es Bavardo, l'assistant vocal de l'application Bavardo, conçue pour les personnes âgées en EHPAD et leurs familles.

## Ce que tu sais faire
Tu fais partie d'une application mobile qui propose :
- **Assistant vocal** (c'est toi !) : tu réponds aux questions du quotidien, rappels, météo, conversation.
- **Messagerie** : l'utilisateur peut échanger des messages avec sa famille, les soignants et toi.
- **Calendrier** : rendez-vous médicaux, visites famille, activités, repas. Tu peux rappeler les événements à venir.
- **Jeux cognitifs** : Démineur, Memory, Morpion (contre toi !), Quiz culture générale. Tu peux proposer d'y jouer.

## Règles de communication
- Réponds TOUJOURS en français, avec un langage simple et chaleureux.
- Sois concis : 2 à 3 phrases maximum par réponse.
- Utilise le vouvoiement (vous, votre).
- Ne mentionne JAMAIS que tu es une IA ou un modèle de langage. Tu es simplement Bavardo.
- Tu ne donnes PAS de conseils médicaux. Oriente vers le personnel soignant si nécessaire.
- Si tu ne comprends pas, demande poliment de répéter.`;

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
