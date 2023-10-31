import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateCardAndCollection as addHandler } from "../../services/apiCards"
import toast from "react-hot-toast"

export function useAddCard(handleIsModalActive) {
  const queryClient = useQueryClient()

  const { mutate: addCard, isLoading: isAddingCard } = useMutation({
    mutationFn: addHandler,
    onSuccess: () => {
      handleIsModalActive()
      queryClient.invalidateQueries({ queryKey: ["collections"] })
      toast.success("New card added")
    },
    onError: (error) => {
      console.log(error)
      toast.error("There was an error with card adding")
    },
  })

  return { addCard, isAddingCard }
}
