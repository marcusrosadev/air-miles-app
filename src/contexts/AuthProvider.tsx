import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";

interface IAuthContextData {
  isUserLogged: boolean;
  user: User | null;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContextData>(
  {} as IAuthContextData
);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // ========================================================================

  const [user, setUser] = useState<User | null>(null);

  const isUserLogged = useMemo(() => {
    return !!user;
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const logout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error("Erro ao fazer logout: ", error);
      });
  };

  // ========================================================================

  const AuthContextData: IAuthContextData = useMemo(() => {
    return {
      isUserLogged,
      user,
      logout,
    };
  }, [isUserLogged, user]);

  return (
    <AuthContext.Provider value={AuthContextData}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used within a UserProvider");

  return context;
}

export { AuthProvider, useAuth };
