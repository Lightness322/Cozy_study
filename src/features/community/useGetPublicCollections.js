import { useQuery } from "@tanstack/react-query"
import { getPublicCollections } from "../../services/apiPublicCollections"

export function useGetPublicCollections() {
  const {
    data: publicCollections,
    isLoading: isLoadingGetting,
    error: gettingError,
  } = useQuery(["publicCollections"], () => getPublicCollections())

  return { publicCollections, isLoadingGetting, gettingError }
}
