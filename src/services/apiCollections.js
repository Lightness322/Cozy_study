import supabase from "./supabase"

export async function getCollections(userId) {
  const { data, error } = await supabase
    .from("collections")
    .select("*")
    .eq("userId", userId)

  if (error) {
    console.error(error)
    throw new Error("Collections was not received")
  }

  return data
}

export async function getCollection(collectionId) {
  const { data, error } = await supabase
    .from("collections")
    .select("*")
    .eq("id", `${collectionId}`)

  if (error) {
    console.error(error)
    throw new Error("Collection was not received")
  }

  return data
}

export async function addCollection(collection) {
  const { data, error } = await supabase
    .from("collections")
    .insert([collection])
    .select()

  if (error) {
    console.error(error)
    throw new Error("Collection was not added")
  }

  return data
}

export async function deleteCollection({ collectionId }) {
  const { data, error } = await supabase
    .from("collections")
    .delete()
    .eq("id", collectionId)
    .select()

  if (error) {
    console.error(error)
    throw new Error("Collection was not deleted")
  }

  return data
}

export async function updateCollection({ collection }) {
  const { id: collectionId } = collection

  const { data, error } = await supabase
    .from("collections")
    .update({ ...collection })
    .eq("id", collectionId)
    .select()

  if (error) {
    console.error(error)
    throw new Error("Collection was not updated")
  }

  return data
}
