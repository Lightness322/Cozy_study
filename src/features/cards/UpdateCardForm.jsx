import { useEffect } from "react"

import { useUpdateCardAndCollection } from "../study/useUpdateCardAndCollection"
import { useSubmitUpdateCardForm } from "./useSubmitUpdateCardForm"

import {
  answerRowsQty,
  cardAnswerQty,
  cardQuestionQty,
} from "../../data/formValidations"

import Button from "../../ui/Button"
import FormUI from "../../ui/FormUI"
import Spinner from "../../ui/Spinner"
import ValidationError from "../../ui/ValidationError"

import styles from "./UpdateCardForm.module.scss"

export default function UpdateCardForm({
  isUpdateModalActive,
  handleUpdateModalActive,
  collectionId,
  card,
  cards,
}) {
  const { updateCard, isUpdatingCard } = useUpdateCardAndCollection({
    handleUpdateModalActive,
  })

  const { onSubmit, handleSubmit, register, errors, reset } =
    useSubmitUpdateCardForm({
      updateCard,
      collectionId,
      card,
      cards,
    })

  useEffect(() => {
    if (isUpdateModalActive) reset()
  }, [isUpdateModalActive, reset])

  return (
    <FormUI onSubmit={handleSubmit(onSubmit)}>
      <label>
        <span>Question</span>
        <input
          {...register("question", {
            required: "This filed is required!",
            maxLength: {
              value: cardQuestionQty,
              message: `Max length: ${cardQuestionQty}`,
            },
          })}
        ></input>
        {errors?.question && (
          <ValidationError>{errors.question.message}</ValidationError>
        )}
      </label>
      <label>
        <span>Answer</span>
        <textarea
          rows={answerRowsQty}
          {...register("answer", {
            maxLength: {
              value: cardAnswerQty,
              message: `Max length: ${cardAnswerQty}`,
            },
          })}
        ></textarea>
        {errors?.answer && (
          <ValidationError>{errors.answer.message}</ValidationError>
        )}
      </label>
      <div className={styles.buttons}>
        <Button look="main">
          {isUpdatingCard ? <Spinner inButton /> : "Save"}
        </Button>
        <Button
          disabled={isUpdatingCard}
          type="button"
          look="back"
          onClick={handleUpdateModalActive}
        >
          Cancel
        </Button>
      </div>
    </FormUI>
  )
}
