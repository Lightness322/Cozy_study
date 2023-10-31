import { useEffect, useState } from "react"

import { useAddCollection } from "./useAddCollection"
import { useSubmitAddCollectionForm } from "./useSubmitAddCollectionForm"

import {
  collectionCategoryQty,
  collectionDescQty,
  collectionNameQty,
} from "../../data/formValidations"

import Button from "../../ui/Button"
import FormUI from "../../ui/FormUI"
import ValidationError from "../../ui/ValidationError"
import Spinner from "../../ui/Spinner"

import styles from "./FormAddCollection.module.scss"

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
      <label>
        <span>Title</span>
        <input
          {...register("name", {
            required: "This field is required!",
            maxLength: {
              value: collectionNameQty,
              message: `Max length: ${collectionNameQty}`,
            },
          })}
        ></input>
        {errors?.name && (
          <ValidationError>{errors.name.message}</ValidationError>
        )}
      </label>
      <label>
        <span>Category</span>
        {isSelectCategory && uniqueCategories.length > 0 ? (
          <div className={styles.category_row}>
            <span className={styles.select_wrapper}>
              <select
                disabled={uniqueCategories.length === 0}
                {...register("category")}
              >
                {uniqueCategories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </span>
            <Button
              look="additional"
              fontSize="1.4rem"
              onClick={() => setIsSelectCategory(false)}
            >
              Create new
            </Button>
          </div>
        ) : (
          <>
            <input
              {...register("category", {
                maxLength: {
                  value: collectionCategoryQty,
                  message: `Max length: ${collectionCategoryQty}`,
                },
              })}
            ></input>
            {errors?.category && (
              <ValidationError>{errors.category.message}</ValidationError>
            )}
          </>
        )}
      </label>
      <label>
        <span>Description</span>
        <textarea
          rows={4}
          {...register("description", {
            maxLength: {
              value: collectionDescQty,
              message: `Max length: ${collectionDescQty}`,
            },
          })}
        ></textarea>
        {errors?.description && (
          <ValidationError>{errors.description.message}</ValidationError>
        )}
      </label>
      <div className={styles.buttons}>
        <Button look="main">
          {isAddingCollection ? <Spinner inButton={true} /> : "Create"}
        </Button>
        <Button
          disabled={isAddingCollection}
          type="button"
          look="back"
          onClick={() => {
            handleIsModalActive()
            reset()
          }}
        >
          Cancel
        </Button>
      </div>
    </FormUI>
  )
}
