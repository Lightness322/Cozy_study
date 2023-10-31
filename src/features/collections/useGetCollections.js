import { useQuery } from "@tanstack/react-query"
import { useGetUser } from "../../hooks/useGetUser"

import { getCollections } from "../../services/apiCollections"

export function useGetCollections() {
  const { userId } = useGetUser()

  const {
    data: collections,
    isLoading: isLoadingGetting,
    error: gettingError,
  } = useQuery(["collections"], () => getCollections(userId))

  return { collections, isLoadingGetting, gettingError }
}
