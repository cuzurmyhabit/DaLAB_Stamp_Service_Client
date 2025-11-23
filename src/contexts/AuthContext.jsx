import { createContext, useEffect, useState } from "react";
import supabase from "../lib/supabase";
import { getCurrentUser } from "../lib/auth";  

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData(){
      const user = await getCurrentUser();
      setUser(user)
    }

    // const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
    //   setUser(session?.user ?? null);
    // });
    fetchData();

    // return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext value={{ user }}>
      {children}
    </AuthContext>
  );
}
