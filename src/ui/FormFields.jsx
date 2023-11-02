import {
  collectionCategoryQty,
  collectionDescQty,
  collectionNameQty,
} from "../data/formValidations"

import ValidationError from "./ValidationError"
import Spinner from "./Spinner"
import Button from "./Button"

import styles from "./FormFields.module.scss"

export default function FormFields({
  register,
  errors,
  reset,
  isLoading,
  handleIsModalActive,
  uniqueCategories,
  isSelectCategory,
  setIsSelectCategory,
  btnMessage,
}) {
  return (
    <>
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
          {isLoading ? <Spinner inButton={true} /> : btnMessage}
        </Button>
        <Button
          disabled={isLoading}
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
    </>
  )
}
