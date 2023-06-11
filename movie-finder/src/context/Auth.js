import { createContext, useEffect, useState } from "react";
import { auth } from "../services/apiFirebase";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ currentUser }}>
        { children }
      </AuthContext.Provider>
    </>
  )
}; 