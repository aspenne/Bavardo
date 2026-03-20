import type { AIMessage, AIProvider, AIProviderConfig, AIResponse } from '../types';

/**
 * Google Gemini AI provider.
 * Uses the Gemini REST API (no SDK needed).
 * Free tier: 15 req/min with gemini-2.0-flash.
 */
export class GeminiProvider implements AIProvider {
  readonly name = 'gemini';

  private readonly defaultModel = 'gemini-2.0-flash';
  private readonly baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models';

  isAvailable(config: AIProviderConfig): boolean {
    return !!config.apiKey;
  }

  async chat(messages: AIMessage[], config: AIProviderConfig): Promise<AIResponse> {
    if (!config.apiKey) {
      throw new Error('Gemini API key is required');
    }

    const model = config.model || this.defaultModel;
    const url = `${this.baseUrl}/${model}:generateContent?key=${config.apiKey}`;

    const systemPrompt = config.systemPrompt || '';
    const contents = this.formatMessages(messages, systemPrompt);

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          maxOutputTokens: config.maxTokens || 300,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Gemini API error (${response.status}): ${error}`);
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error('No response from Gemini');
    }

    return { content: text };
  }

  private formatMessages(
    messages: AIMessage[],
    systemPrompt: string
  ): { role: string; parts: { text: string }[] }[] {
    const contents: { role: string; parts: { text: string }[] }[] = [];

    // Gemini uses 'user' and 'model' roles, system prompt goes as first user message
    if (systemPrompt) {
      contents.push({
        role: 'user',
        parts: [{ text: `Instructions: ${systemPrompt}` }],
      });
      contents.push({
        role: 'model',
        parts: [{ text: 'Compris, je suivrai ces instructions.' }],
      });
    }

    for (const msg of messages) {
      const role = msg.role === 'assistant' ? 'model' : 'user';
      // Skip system messages, already handled above
      if (msg.role === 'system') continue;
      contents.push({
        role,
        parts: [{ text: msg.content }],
      });
    }

    return contents;
  }
}
