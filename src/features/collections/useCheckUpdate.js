import { useMutation, useQueryClient } from "@tanstack/react-query"

import { updateWaitingCards as handleUpdate } from "../../services/apiCards"
import { daysFromMilliseconds } from "../../utils/helpers"

export function useCheckUpdate({
  collection,
  isUpdated,
  inactiveDays,
  setIsUpdated,
}) {
  const queryClient = useQueryClient()

  const { mutate: updateWaitingCards } = useMutation({
    mutationFn: handleUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] })
    },
  })

  const { id: collectionId, cards } = collection

  let idToUpdate = []

  if (!isUpdated) {
    cards?.forEach((card) => {
      if (
        card.lastLearnedDate &&
        daysFromMilliseconds(new Date() - new Date(card.lastLearnedDate)) >=
          inactiveDays
      ) {
        idToUpdate.push(card.id)
      }
    })

    if (idToUpdate.length > 0) {
      updateWaitingCards({ collectionId, idToUpdate, cards })
      setIsUpdated(true)
      idToUpdate = []
    }
  }
}
