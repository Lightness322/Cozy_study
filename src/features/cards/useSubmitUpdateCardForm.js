import { useForm } from "react-hook-form"

export function useSubmitUpdateCardForm({
  updateCard,
  collectionId,
  card,
  cards,
}) {
  const { question, answer } = card

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    values: { question, answer },
    mode: "onBlur",
  })

  function onSubmit(data) {
    updateCard({
      collectionId,
      newCard: {
        ...card,
        question: data.question,
        answer: data.answer,
      },
      cards: [...cards],
    })
    reset()
  }

  return { onSubmit, handleSubmit, register, errors, reset }
}
