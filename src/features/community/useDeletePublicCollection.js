import { useMutation, useQueryClient } from "@tanstack/react-query"

import { deletePublicCollection as deleteHandler } from "../../services/apiPublicCollections"
import toast from "react-hot-toast"

export function useDeletePublicCollection() {
  const queryClient = useQueryClient()

  const { mutate: deleteCollection, isLoading: isDeleting } = useMutation({
    mutationFn: deleteHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["publicCollections"] })
      toast.success("Collection deleted")
    },
    onError: (error) => {
      console.log(error)
      toast.error("There was an error with collection deleting")
    },
  })

  return { deleteCollection, isDeleting }
}
