import { useMutation, useQueryClient } from "@tanstack/react-query"

import { updateCollection as updateHandler } from "../../services/apiCollections"

import toast from "react-hot-toast"

export function useUpdateCollection(handleIsModalActive) {
  const queryClient = useQueryClient()

  const { mutate: updateCollection, isLoading: isUpdatingCollection } =
    useMutation({
      mutationFn: updateHandler,
      onSuccess: () => {
        if (handleIsModalActive) handleIsModalActive()
        queryClient.invalidateQueries({ queryKey: ["collections"] })
        if (handleIsModalActive) toast.success("Changes saved")
      },
      onError: (error) => {
        console.log(error)
        toast.error("There was an error with collection updating")
      },
    })

  return { updateCollection, isUpdatingCollection }
}
