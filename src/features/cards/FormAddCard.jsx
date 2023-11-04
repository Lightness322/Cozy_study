import { useAddCard } from "./useAddCard"
import { useSubmitAddCardForm } from "./useSubmitAddCardForm"

import {
  answerRowsQty,
  cardAnswerQty,
  cardQuestionQty,
} from "../../data/formValidations"

import FormUI from "../../ui/FormUI"
import Button from "../../ui/Button"
import ValidationError from "../../ui/ValidationError"
import Spinner from "../../ui/Spinner"

import styles from "./FormAddCard.module.scss"

export default function FormAddCard({
  handleIsModalActive,
  collectionId,
  cards,
}) {
  const { addCard, isAddingCard } = useAddCard(handleIsModalActive)

  const { onSubmit, handleSubmit, register, errors, reset } =
    useSubmitAddCardForm({
      addCard,
      collectionId,
      cards,
    })

  return (
    <FormUI onSubmit={handleSubmit(onSubmit)}>
      <label>
        <span>Question</span>
        <input
          {...register("question", {
            required: true,
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
      </label>
      <div className={styles.buttons}>
        <Button look="main">
          {isAddingCard ? <Spinner inButton={true} /> : "Create"}
        </Button>
        <Button
          look="back"
          type="button"
          disabled={isAddingCard}
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
