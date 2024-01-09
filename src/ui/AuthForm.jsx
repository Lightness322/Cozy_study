import { useForm } from "react-hook-form"

import { usernameQty } from "../data/formValidations"

import Button from "./Button"
import ValidationError from "./ValidationError"
import Spinner from "./Spinner"

import styles from "./AuthForm.module.scss"

export default function AuthForm({ onSubmit, handleModal, isLoading, type }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: { email: "test@mail.ru", password: "test11" },
  })

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1>{type === "login" ? "Login" : "Sign Up"}</h1>
        {type === "signup" && (
          <label>
            <input
              placeholder="Nickname"
              {...register("nickname", {
                required: { value: true, message: "This field is required!" },
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
        )}
        <label>
          <input
            placeholder="Email"
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
        <label>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "This field is required!",
              minLength: {
                value: 4,
                message: "Min length: 4",
              },
              pattern: {
                value: /(?=.*[A-Za-zА-Яа-я])(?=.*[0-9])/gim,
                message: "Must contain numbers and letters",
              },
            })}
          ></input>
          {errors?.password && (
            <ValidationError>{errors.password.message}</ValidationError>
          )}
        </label>
        <div className={styles.actions}>
          {type === "login" ? (
            <>
              <Button look="main">
                {isLoading ? <Spinner inButton={true} /> : "Login"}
              </Button>
              <Button look="back" onClick={handleModal} type="button">
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button look="main">
                {isLoading ? <Spinner inButton={true} /> : "Sign up"}
              </Button>
              <Button look="back" onClick={handleModal} type="button">
                Cancel
              </Button>
            </>
          )}
        </div>
      </form>
    </div>
  )
}
