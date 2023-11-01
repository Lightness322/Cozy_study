import { useEffect } from "react"

import { useUpdateUser } from "./useUpdateUser"

import {
  maxInactiveDays,
  minInactiveDays,
  usernameQty,
} from "../../data/formValidations"

import Button from "../../ui/Button"
import ValidationError from "../../ui/ValidationError"
import Spinner from "../../ui/Spinner"

import styles from "./FormUserSettings.module.scss"

export default function FormUserSetting({
  isChangeable,
  setIsChangeable,
  isModalActive,
  handleIsModalActive,
  user,
}) {
  const { onSubmit, handleSubmit, register, errors, reset, isUpdating } =
    useUpdateUser({ user, setIsChangeable, handleIsModalActive })

  useEffect(() => {
    if (isModalActive) reset()
  }, [isModalActive, reset])

  function handleChange() {
    setIsChangeable((isChangeable) => !isChangeable)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <label>
        <span>Nickname</span>
        <input
          disabled={!isChangeable}
          {...register("nickname", {
            required: "This field is required!",
            maxLength: {
              value: usernameQty,
              message: `Max length: ${usernameQty}`,
            },
          })}
        ></input>
        {errors?.nickname && (
          <ValidationError>{errors.nickname.message}</ValidationError>
        )}
      </label>
      <label>
        <span>Inactive days</span>
        <input
          disabled={!isChangeable}
          type="number"
          {...register("inactiveDays", {
            required: {
              value: true,
              message: "This field is required!",
            },
            min: {
              value: minInactiveDays,
              message: `Min value: ${minInactiveDays}`,
            },
            max: {
              value: maxInactiveDays,
              message: `Max value: ${maxInactiveDays}`,
            },
          })}
        ></input>
        {errors?.inactiveDays && (
          <ValidationError>{errors.inactiveDays.message}</ValidationError>
        )}
      </label>
      <label>
        <span>Email</span>
        <input
          disabled={!isChangeable}
          {...register("email", {
            required: "This field is required!",
            pattern: {
              value: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/i,
              message: "Incorrect email address",
            },
          })}
        ></input>
        {errors?.email && (
          <ValidationError>{errors.email.message}</ValidationError>
        )}
      </label>
      <div className={styles.edit}>
        <Button
          disabled={isChangeable}
          look="additional"
          type="button"
          onClick={handleChange}
        >
          Edit
        </Button>
      </div>
      <div className={styles.buttons}>
        <Button look="main" disabled={!isChangeable}>
          {isUpdating ? <Spinner inButton={true} /> : "Save"}
        </Button>
        <Button
          disabled={isUpdating}
          type="button"
          look="back"
          onClick={handleIsModalActive}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
