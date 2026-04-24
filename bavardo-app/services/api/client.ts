import Constants from 'expo-constants';
import { getAccessToken, getRefreshToken, saveTokens, clearTokens } from './token';

/** Base URL configurable via app.config.ts extra ou .env */
export const API_BASE_URL: string =
  Constants.expoConfig?.extra?.apiBaseUrl ?? 'http://192.162.71.238:8080';

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

interface ApiError {
  detail?: string;
  [key: string]: unknown;
}

class ApiClient {
  private isRefreshing = false;
  private refreshPromise: Promise<boolean> | null = null;

  private async buildHeaders(authenticated = true): Promise<Record<string, string>> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (authenticated) {
      const token = await getAccessToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return headers;
  }

  private async refreshToken(): Promise<boolean> {
    // Éviter les refreshs simultanés
    if (this.isRefreshing && this.refreshPromise) {
      return this.refreshPromise;
    }

    this.isRefreshing = true;
    this.refreshPromise = (async () => {
      try {
        const refresh = await getRefreshToken();
        if (!refresh) return false;

        const response = await fetch(`${API_BASE_URL}/api/auth/refresh/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh }),
        });

        if (!response.ok) {
          await clearTokens();
          return false;
        }

        const data = await response.json();
        await saveTokens(data.access, refresh);
        return true;
      } catch {
        await clearTokens();
        return false;
      } finally {
        this.isRefreshing = false;
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  private async request<T>(
    method: HttpMethod,
    path: string,
    body?: unknown,
    authenticated = true,
  ): Promise<T> {
    const url = `${API_BASE_URL}${path}`;
    const headers = await this.buildHeaders(authenticated);

    const init: RequestInit = { method, headers };
    if (body !== undefined) {
      init.body = JSON.stringify(body);
    }

    let response = await fetch(url, init);

    // Si 401, tenter un refresh et rejouer la requête
    if (response.status === 401 && authenticated) {
      const refreshed = await this.refreshToken();
      if (refreshed) {
        const retryHeaders = await this.buildHeaders(true);
        response = await fetch(url, { ...init, headers: retryHeaders });
      } else {
        throw new ApiAuthError('Session expirée, veuillez vous reconnecter.');
      }
    }

    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({}));
      throw new ApiRequestError(
        error.detail ?? `Erreur ${response.status}`,
        response.status,
        error,
      );
    }

    // 204 No Content
    if (response.status === 204) {
      return undefined as T;
    }

    return response.json();
  }

  get<T>(path: string): Promise<T> {
    return this.request<T>('GET', path);
  }

  post<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>('POST', path, body);
  }

  patch<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>('PATCH', path, body);
  }

  put<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>('PUT', path, body);
  }

  delete<T = void>(path: string): Promise<T> {
    return this.request<T>('DELETE', path);
  }

  /** Requête non authentifiée (login, register) */
  postPublic<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>('POST', path, body, false);
  }
}

export class ApiAuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiAuthError';
  }
}

export class ApiRequestError extends Error {
  status: number;
  body: ApiError;

  constructor(message: string, status: number, body: ApiError) {
    super(message);
    this.name = 'ApiRequestError';
    this.status = status;
    this.body = body;
  }
}

export const api = new ApiClient();
