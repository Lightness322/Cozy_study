import { useMutation, useQueryClient } from "@tanstack/react-query"

import { updateCardAndCollection as updateHandler } from "../../services/apiCards"

import toast from "react-hot-toast"

export function useUpdateCardAndCollection({ handleUpdateModalActive = null }) {
  const queryClient = useQueryClient()

  const { mutate: updateCard, isLoading: isUpdatingCard } = useMutation({
    mutationFn: updateHandler,
    onSuccess: () => {
      if (handleUpdateModalActive) handleUpdateModalActive()
      queryClient.invalidateQueries(["collections"])
      if (handleUpdateModalActive) toast.success("Changes saved")
    },
    onError: (error) => {
      console.log(error)
      toast.error("There was an error with card updating")
    },
  })

  return { updateCard, isUpdatingCard }
}
