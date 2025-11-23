import { createContext, useEffect, useState } from "react";
import supabase from "../lib/supabase";
import { getCurrentUser } from "../lib/auth";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(async () => {
    const user = await getCurrentUser();
    setUser(user)
    // supabase.auth.getUser().then(({ data }) => {
    //   setUser(data.user);
    // });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext value={{ user }}>
      {children}
    </AuthContext>
  );
}
