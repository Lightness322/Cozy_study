import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useGetUser } from "../../hooks/useGetUser"

import { addCollection as addHandler } from "../../services/apiCollections"
import toast from "react-hot-toast"

export function useAddCollection(handleIsModalActive) {
  const queryClient = useQueryClient()

  const { userId } = useGetUser()

  const { mutate: addCollection, isLoading: isAddingCollection } = useMutation({
    mutationFn: addHandler,
    onSuccess: () => {
      if (handleIsModalActive) handleIsModalActive()
      queryClient.invalidateQueries({ queryKey: ["collections"] })
      toast.success("New collection added")
    },
    onError: (error) => {
      console.log(error)
      toast.error("There was an error with collection creating")
    },
  })

  return { addCollection, isAddingCollection, userId }
}
