import { useParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

export function useGetStudyCollections() {
  const queryClient = useQueryClient()

  const data = queryClient.getQueryData(["collections"])

  const { collectionId } = useParams()

  const studyIdArr = collectionId.split("-")

  const collections = data.filter((collection) =>
    studyIdArr.includes(`${collection.id}`)
  )

  return { collections }
}
