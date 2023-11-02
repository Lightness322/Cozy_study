import { useEffect, useState } from "react"

import { useUpdateCollection } from "./useUpdateCollection"
import { useSubmitUpdateCollectionForm } from "./useSubmitUpdateCollectionForm"

import FormUI from "../../ui/FormUI"
import FormFields from "../../ui/FormFields"

export default function FormUpdateCollection({
  isModalActive,
  handleIsModalActive,
  collection,
  uniqueCategories,
}) {
  const [isSelectCategory, setIsSelectCategory] = useState(true)

  const { updateCollection, isUpdatingCollection } =
    useUpdateCollection(handleIsModalActive)

  const { onSubmit, handleSubmit, register, errors, reset } =
    useSubmitUpdateCollectionForm({
      updateCollection,
      collection,
    })

  useEffect(() => {
    if (isModalActive) reset()
  }, [isModalActive, reset])

  return (
    <FormUI onSubmit={handleSubmit(onSubmit)}>
      <FormFields
        register={register}
        errors={errors}
        reset={reset}
        isLoading={isUpdatingCollection}
        handleIsModalActive={handleIsModalActive}
        uniqueCategories={uniqueCategories}
        isSelectCategory={isSelectCategory}
        setIsSelectCategory={setIsSelectCategory}
        btnMessage="Save"
      />
    </FormUI>
  )
}
