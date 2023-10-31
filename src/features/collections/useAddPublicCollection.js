import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useGetUser } from "../../hooks/useGetUser"

import { addPublicCollection as addHandler } from "../../services/apiPublicCollections"
import toast from "react-hot-toast"

export function useAddPublicCollection() {
  const queryClient = useQueryClient()

  const { userId } = useGetUser()

  const { mutate: addPublicCollection, isLoading: isAddingPublicCollection } =
    useMutation({
      mutationFn: addHandler,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["publicCollections"] })
        toast.success("New collection published")
      },
      onError: (error) => {
        console.log(error)
        toast.error("There was an error with collection publishing")
      },
    })

  return { addPublicCollection, isAddingPublicCollection, userId }
}
