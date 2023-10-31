import { useForm } from "react-hook-form"

export function useSubmitAddCollectionForm({ addCollection, userId }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onBlur", defaultValues: { category: "" } })

  function onSubmit(data) {
    addCollection({
      name: data.name,
      category: data.category ? data.category : null,
      description: data.description ? data.description : null,
      cards: [],
      userId,
    })
    reset()
  }

  return { onSubmit, handleSubmit, register, errors, reset }
}
