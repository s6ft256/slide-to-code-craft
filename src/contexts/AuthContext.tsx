import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { User, Session, AuthError, Provider } from '@supabase/supabase-js';
import { auth } from '../integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isUsingLocalStorage: boolean;
  signIn: {
    withEmail: (email: string, password: string) => Promise<{ error: AuthError | null }>;
    withOAuth: (provider: Provider) => Promise<{ error: AuthError | null }>;
  };
  signUp: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUsingLocalStorage, setIsUsingLocalStorage] = useState<boolean>(false);

  useEffect(() => {
    // Get initial session and set up auth state listener
    const fetchSession = async () => {
      setIsLoading(true);
      
      try {
        const { data: { session } } = await auth.getSession();
        setSession(session);
        setUser(session?.user || null);
        
        // Listen for auth changes
        const { data: { subscription } } = auth.onAuthStateChange((_event, session) => {
          setSession(session);
          setUser(session?.user || null);
        });
        
        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.warn('Supabase auth initialization failed, falling back to localStorage:', error);
        setIsUsingLocalStorage(true);
        
        // Get user from localStorage if available
        const localUser = localStorage.getItem('user');
        if (localUser) {
          setUser(JSON.parse(localUser) as User);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, []);

  const signIn = {
    withEmail: async (email: string, password: string) => {
      if (isUsingLocalStorage) {
        // Mock successful authentication for development
        const mockUser = {
          id: '123',
          email,
          user_metadata: { name: email.split('@')[0] },
          created_at: new Date().toISOString(),
        };
        setUser(mockUser as unknown as User);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return { error: null };
      } else {
        const { error } = await auth.signInWithPassword({ email, password });
        return { error };
      }
    },
    withOAuth: async (provider: Provider) => {
      if (isUsingLocalStorage) {
        // Mock successful authentication for development
        const mockUser = {
          id: '123',
          email: `user@${provider}.com`,
          user_metadata: { name: `${provider}User`, provider },
          created_at: new Date().toISOString(),
        };
        setUser(mockUser as unknown as User);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return { error: null };
      } else {
        const { error } = await auth.signInWithOAuth({ provider });
        return { error };
      }
    },
  };

  const signUp = async (email: string, password: string) => {
    if (isUsingLocalStorage) {
      // Mock successful registration for development
      const mockUser = {
        id: '123',
        email,
        user_metadata: { name: email.split('@')[0] },
        created_at: new Date().toISOString(),
      };
      setUser(mockUser as unknown as User);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return { error: null };
    } else {
      const { error } = await auth.signUp({ email, password });
      return { error };
    }
  };

  const signOut = async () => {
    if (isUsingLocalStorage) {
      // Clear localStorage for development
      localStorage.removeItem('user');
      setUser(null);
      return { error: null };
    } else {
      const { error } = await auth.signOut();
      return { error };
    }
  };

  const resetPassword = async (email: string) => {
    if (isUsingLocalStorage) {
      // Mock successful password reset for development
      console.log('Password reset link would be sent to:', email);
      return { error: null };
    } else {
      const { error } = await auth.resetPasswordForEmail(email);
      return { error };
    }
  };

  const value = {
    user,
    session,
    isLoading,
    isUsingLocalStorage,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}