import { useEffect, useState } from "react"

import { useAddCollection } from "./useAddCollection"
import { useSubmitAddCollectionForm } from "./useSubmitAddCollectionForm"

import FormUI from "../../ui/FormUI"
import FormFields from "../../ui/FormFields"

export default function FormAddCollection({
  isModalActive,
  handleIsModalActive,
  uniqueCategories,
}) {
  const [isSelectCategory, setIsSelectCategory] = useState(true)

  const { addCollection, isAddingCollection, userId } =
    useAddCollection(handleIsModalActive)

  const { onSubmit, handleSubmit, register, errors, reset } =
    useSubmitAddCollectionForm({ addCollection, userId })

  useEffect(() => {
    if (isModalActive) setIsSelectCategory(true)
  }, [isModalActive])

  return (
    <FormUI onSubmit={handleSubmit(onSubmit)}>
      <FormFields
        register={register}
        errors={errors}
        reset={reset}
        isLoading={isAddingCollection}
        handleIsModalActive={handleIsModalActive}
        uniqueCategories={uniqueCategories}
        isSelectCategory={isSelectCategory}
        setIsSelectCategory={setIsSelectCategory}
        btnMessage="Create"
      />
    </FormUI>
  )
}
