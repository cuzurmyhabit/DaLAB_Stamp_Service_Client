import supabase from "./supabase";


export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Auth Error:", error.message);
    return null;
  }
  return data.user;   // 없으면 null죽인다.
}


export async function Login(email, password) {
  return await supabase.auth.signInWithPassword({ email, password });
}


export async function Signup(email, password, name, isUser) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) return { user: null, error };

  const user = data?.user;
  if (!user) {
    return { user: null, error: { message: "회원가입에 성공했지만 사용자 데이터 없다." } };
  }

  const { error: insertError } = await supabase.from("users").insert([{
    id: user.id,
    name: name,
    email: email,
    is_user: isUser,
    }]);

  if (insertError) return { user: null, error: insertError };

  return { user, error: null };
}

