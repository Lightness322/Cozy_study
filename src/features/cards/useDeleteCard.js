import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteCard as addHandler } from "../../services/apiCards"
import toast from "react-hot-toast"

export function useDeleteCard() {
  const queryClient = useQueryClient()

  const { mutate: deleteCard, isLoading: isDeletingCard } = useMutation({
    mutationFn: addHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] })
      toast.success("Card deleted")
    },
    onError: (error) => {
      console.log(error)
      toast.error("There was an error with card deleting")
    },
  })

  return { deleteCard, isDeletingCard }
}
