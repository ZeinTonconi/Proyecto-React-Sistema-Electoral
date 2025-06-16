import { createContext, useContext, useState, type ReactNode } from "react";
import type { User } from "../interfaces/userInterface";
import { clearStorage, setStorage } from "../helpers/LocalStorage";

interface AuthContextType {
  user: User;
  isAuth: boolean;
  login: (user: User, isAdmin: boolean) => void;
  logout: () => void;
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({} as User);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const login = (user: User, isAdmin: boolean) => {
    
    setStorage("user", user);
    setStorage("token", user.token);

    setUser(user);
    setIsAuth(true);
    setIsAdmin(isAdmin)
  };

  const logout = () => {
    clearStorage();
    setUser({} as User);
    setIsAuth(false);
    setIsAdmin(false)
  };

  return (
    <AuthContext.Provider value={{ user, isAuth, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};