import supabase from "./supabase"

export async function updateUser({ nickname, inactiveDays, email }) {
  const { data, error } = await supabase.auth.updateUser({
    email,
    data: { nickname, inactiveDays },
  })

  if (error) throw new Error("Error with update")

  return data
}
