import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
  updateProfile: (updates: { full_name?: string }) => Promise<void>;
  updateEmail: (email: string) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true,
  signUp: async (email, password) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
  },
  signIn: async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  },
  signInWithGoogle: async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) throw error;
  },
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    set({ user: null });
  },
  setUser: (user) => set({ user, loading: false }),
  updateProfile: async (updates) => {
    const { error } = await supabase.auth.updateUser({
      data: updates
    });
    if (error) throw error;
    
    const currentUser = get().user;
    if (currentUser) {
      set({
        user: {
          ...currentUser,
          user_metadata: { ...currentUser.user_metadata, ...updates }
        }
      });
    }
  },
  updateEmail: async (email) => {
    const { error } = await supabase.auth.updateUser({ email });
    if (error) throw error;
  },
  updatePassword: async (currentPassword: string, newPassword: string) => {
    // Verificar la contraseña actual primero
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: get().user?.email || '',
      password: currentPassword,
    });
    if (signInError) throw new Error('Contraseña actual incorrecta');

    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
  },
}));

// Initialize auth state
supabase.auth.onAuthStateChange((event, session) => {
  useAuthStore.getState().setUser(session?.user ?? null);
});