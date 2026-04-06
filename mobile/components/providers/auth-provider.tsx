import { createContext, useContext, useMemo, useState } from 'react';

type UserRole = 'warga' | 'admin' | 'superadmin';

type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  ktp_id?: number | null;
};

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
};

type AuthContextType = AuthState & {
  isAuthenticated: boolean;
  setSession: (session: AuthState) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSessionState] = useState<AuthState>({
    accessToken: null,
    refreshToken: null,
    user: null,
  });

  const value = useMemo<AuthContextType>(
    () => ({
      ...session,
      isAuthenticated: Boolean(session.accessToken && session.user),
      setSession: (nextSession) => setSessionState(nextSession),
      logout: () =>
        setSessionState({
          accessToken: null,
          refreshToken: null,
          user: null,
        }),
    }),
    [session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
