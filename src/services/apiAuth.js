import supabase from "./supabase"

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw new Error("Incorrect username or password")

  return data
}

export async function signIn({ email, password, nickname }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nickname,
        inactiveDays: 7,
      },
    },
  })

  if (error) throw new Error("Incorrect username or password")

  console.log(data)
  return data
}

export async function logOut() {
  const { error } = await supabase.auth.signOut()

  return error
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession()
  if (!session.session) return null

  const { data, error } = await supabase.auth.getUser()

  if (error) throw new Error(error.message)
  return data?.user
}
