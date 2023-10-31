import supabase from "./supabase"

export async function getPublicCollections() {
  const { data, error } = await supabase.from("publicCollections").select("*")

  if (error) {
    console.error(error)
    throw new Error("Public collections was not received")
  }

  return data
}

export async function addPublicCollection(collection) {
  const { data, error } = await supabase
    .from("publicCollections")
    .insert([collection])
    .select()

  if (error) {
    console.error(error)
    throw new Error("Collection was not added to public")
  }

  return data
}

export async function updatePublicCollection({ ratingArr, collectionId }) {
  const { data, error } = await supabase
    .from("publicCollections")
    .update({ ratingArr })
    .eq("id", collectionId)
    .select()

  if (error) {
    console.error(error)
    throw new Error("Public collection was not updated")
  }

  return data
}

export async function deletePublicCollection({ collectionId }) {
  console.log(collectionId)
  const { data, error } = await supabase
    .from("publicCollections")
    .delete()
    .eq("id", collectionId)
    .select()

  if (error) {
    console.error(error)
    throw new Error("Collection was not deleted")
  }

  return data
}
