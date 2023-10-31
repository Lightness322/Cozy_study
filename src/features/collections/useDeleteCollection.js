import { useMutation, useQueryClient } from "@tanstack/react-query"

import { deleteCollection as deleteHandler } from "../../services/apiCollections"
import toast from "react-hot-toast"

export function useDeleteCollection() {
  const queryClient = useQueryClient()

  const { mutate: deleteCollection, isLoading: isDeleting } = useMutation({
    mutationFn: deleteHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] })
      toast.success("Collection deleted")
    },
    onError: (error) => {
      console.log(error)
      toast.error("There was an error with collection deleting")
    },
  })

  return { deleteCollection, isDeleting }
}
