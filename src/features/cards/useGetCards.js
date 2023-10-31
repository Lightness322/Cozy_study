import { useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

export function useGetCards() {
  const queryClient = useQueryClient()
  const { collectionId } = useParams()

  const data = queryClient.getQueryData(["collections"])
  const collection = data
    .filter((collection) => `${collection.id}` === `${collectionId}`)
    .at(0)
  const cards = collection.cards

  return cards
}
