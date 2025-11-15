import { supabase } from "./supabase";

export async function signIn(email, password) {
  return await supabase.auth.signInWithPassword({ email, password });
}

// 현재 로그인된 유저 가져오기
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Auth Error:", error.message);
    return null;
  }

  return data.user;   // 없으면 null
}
