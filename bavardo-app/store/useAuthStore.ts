import { create } from 'zustand';
import { api, saveTokens, clearTokens, getAccessToken, getRefreshToken } from '@/services/api';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_ia: boolean;
}

interface AuthTokens {
  access: string;
  refresh: string;
}

interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

interface Tenant {
  id: number;
  name: string;
  slug: string;
}

interface AuthState {
  user: User | null;
  tenantId: number | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  loadSession: () => Promise<void>;
  clearError: () => void;
}

async function fetchTenantId(): Promise<number | null> {
  try {
    const tenants = await api.get<Tenant[]>('/api/tenants/');
    return tenants.length > 0 ? tenants[0].id : null;
  } catch {
    console.warn('Impossible de charger les tenants');
    return null;
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  tenantId: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const data = await api.postPublic<AuthResponse>('/api/auth/login/', {
        email,
        password,
      });
      await saveTokens(data.tokens.access, data.tokens.refresh);

      const tenantId = await fetchTenantId();
      set({ user: data.user, isAuthenticated: true, tenantId });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Erreur de connexion';
      set({ error: message });
      throw e;
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (email, password, firstName, lastName) => {
    set({ isLoading: true, error: null });
    try {
      const data = await api.postPublic<AuthResponse>('/api/auth/register/', {
        email,
        password,
        password_confirm: password,
        first_name: firstName,
        last_name: lastName,
      });
      await saveTokens(data.tokens.access, data.tokens.refresh);
      set({ user: data.user, isAuthenticated: true });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Erreur d'inscription";
      set({ error: message });
      throw e;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      const refresh = await getRefreshToken();
      if (refresh) {
        await api.post('/api/auth/logout/', { refresh }).catch(() => {});
      }
    } finally {
      await clearTokens();
      set({
        user: null,
        tenantId: null,
        isAuthenticated: false,
        error: null,
      });
    }
  },

  loadSession: async () => {
    set({ isLoading: true });
    try {
      const token = await getAccessToken();
      if (!token) {
        set({ isLoading: false });
        return;
      }

      const user = await api.get<User>('/api/auth/me/');
      const tenantId = await fetchTenantId();
      set({ user, isAuthenticated: true, tenantId });
    } catch {
      await clearTokens();
      set({ user: null, isAuthenticated: false, tenantId: null });
    } finally {
      set({ isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
