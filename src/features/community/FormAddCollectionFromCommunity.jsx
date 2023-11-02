import { useEffect, useState } from "react"

import { useAddCollection } from "../collections/useAddCollection"
import { useGetCollections } from "../collections/useGetCollections"
import { useSubmitAddForm } from "./useSubmitAddForm"

import { getUniqueCategories } from "../../utils/helpers"

import Spinner from "../../ui/Spinner"
import FormUI from "../../ui/FormUI"
import FormFields from "../../ui/FormFields"

export default function FormAddCollectionFromCommunity({
  isModalActive,
  name,
  description,
  cards,
  handleIsModalActive,
}) {
  const [isSelectCategory, setIsSelectCategory] = useState(true)

  const { addCollection, isAddingCollection, userId } =
    useAddCollection(handleIsModalActive)

  const { collections, isLoadingGetting, gettingError } = useGetCollections()

  const { register, errors, handleSubmit, onSubmit, reset } = useSubmitAddForm({
    addCollection,
    name,
    description,
    cards,
    userId,
  })

  useEffect(() => {
    if (isModalActive) setIsSelectCategory(true)
  }, [isModalActive])

  if (isLoadingGetting) return <Spinner />

  if (gettingError) return <div>{gettingError.message}</div>

  const uniqueCategories = getUniqueCategories(collections)

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
        btnMessage="Add"
      />
    </FormUI>
  )
}
