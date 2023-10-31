import { useEffect, useState } from "react"

import { useUpdateCollection } from "./useUpdateCollection"
import { useSubmitUpdateCollectionForm } from "./useSubmitUpdateCollectionForm"

import {
  collectionCategoryQty,
  collectionDescQty,
  collectionNameQty,
} from "../../data/formValidations"

import FormUI from "../../ui/FormUI"
import Button from "../../ui/Button"
import Spinner from "../../ui/Spinner"
import ValidationError from "../../ui/ValidationError"

import styles from "./FormUpdateCollection.module.scss"

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
      <label>
        <span>Name</span>
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
          rows={3}
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
          {isUpdatingCollection ? <Spinner inButton={true} /> : "Save"}
        </Button>
        <Button
          disabled={isUpdatingCollection}
          type="button"
          look="back"
          onClick={handleIsModalActive}
        >
          Cancel
        </Button>
      </div>
    </FormUI>
  )
}
