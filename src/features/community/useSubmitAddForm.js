import { useForm } from "react-hook-form"

export function useSubmitAddForm({
  addCollection,
  name,
  description,
  cards,
  userId,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: { name, description, category: "" },
  })

  function onSubmit(data) {
    const collectionId = Math.floor(Math.random() * 1e8)
    const newCards = cards.map((card) => {
      return {
        ...card,
        id: `${(~~(Math.random() * 1e8)).toString(16)}`,
        collectionId: `${collectionId}`,
        isActive: true,
        isWaiting: false,
        learnedTimes: 0,
        lastLearnedDate: null,
        createdAt: new Date(),
      }
    })

    addCollection({
      id: collectionId,
      name: data.name,
      totalCards: cards.length,
      notLearnedQty: cards.length,
      activeCards: cards.length,
      description: data.description ? data.description : null,
      cards: newCards,
      userId,
    })
    reset()
  }

  return { register, errors, handleSubmit, onSubmit, reset }
}
