import { createContext, useEffect, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../services/apiFirebase";
import Loading from "../components/Loading/Loading";
import Error from "../components/Error/Error";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    setCurrentUser(user);
    console.log(user);
  }, [ user ]);

  if(loading) {
    return <Loading />
  }

  if(error) {
    return <Error />
  }

  return (
    <>
      <AuthContext.Provider value={{ currentUser }}>
        { children }
      </AuthContext.Provider>
    </>
  )
}; 