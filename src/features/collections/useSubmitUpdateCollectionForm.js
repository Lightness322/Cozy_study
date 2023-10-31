import { useForm } from "react-hook-form"

export function useSubmitUpdateCollectionForm({
  updateCollection,
  collection,
}) {
  const { name, description, category } = collection

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ values: { name, description, category }, mode: "onBlur" })

  function onSubmit(data) {
    updateCollection({
      collection: {
        ...collection,
        name: data.name,
        description: data.description,
        category: data.category,
      },
    })
  }

  return { onSubmit, handleSubmit, register, errors, reset }
}
