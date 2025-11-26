import { createContext, useEffect, useState } from "react";
import supabase from "../lib/supabase";

export const AuthContext = createContext({
  user: null,
  isLoading: true,
});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
        setIsLoading(false);
      });
      const { data: listener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          setUser(session?.user ?? null);
          setIsLoading(false);
        }
      );

      // 클린업
      return () => {
        listener?.subscription.unsubscribe();
      }
    }, [])

    const value = {
      user,
      isLoading,
    };

  return (
    <AuthContext.Provider value={{user, isLoading}}>
      {children}
    </AuthContext.Provider>
  );
}
