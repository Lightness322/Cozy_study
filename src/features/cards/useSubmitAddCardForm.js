import { useForm } from "react-hook-form"

export function useSubmitAddCardForm({ addCard, collectionId, cards }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onBlur" })

  function onSubmit(data) {
    addCard({
      collectionId,
      newCard: {
        ...data,
        id: `${(~~(Math.random() * 1e8)).toString(16)}`,
        collectionId: collectionId,
        isActive: true,
        isWaiting: false,
        learnedTimes: 0,
        lastLearnedDate: null,
        createdAt: new Date(),
      },
      cards: [...cards],
    })
    reset()
  }

  return { onSubmit, handleSubmit, register, errors, reset }
}
