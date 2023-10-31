import { useAuth } from "./useAuth"

import { login } from "../../services/apiAuth"

import AuthForm from "../../ui/AuthForm"

export default function LoginForm({ handleLoginModal }) {
  const { onSubmit, isLoading } = useAuth(login)

  return (
    <AuthForm
      onSubmit={onSubmit}
      isLoading={isLoading}
      type="login"
      handleModal={handleLoginModal}
    />
  )
}
