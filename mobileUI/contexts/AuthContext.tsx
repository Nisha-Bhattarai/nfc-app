import { createContext, useContext, useEffect, useState } from 'react';
import { getSession } from '../utils/sessionStorage';
import { authEmitter } from '../utils/authEmitter';

export const AuthContext = createContext<{
  isAuthenticated: boolean | null;
  setIsAuthenticated: (val: boolean) => void;
}>({
  isAuthenticated: null,
  setIsAuthenticated: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const session = await getSession();
      setIsAuthenticated(!!session?.token);
    })();

     const handleLogout = () => setIsAuthenticated(false);

    authEmitter.on('logout', handleLogout);

    return () => {
      authEmitter.off('logout', handleLogout);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
