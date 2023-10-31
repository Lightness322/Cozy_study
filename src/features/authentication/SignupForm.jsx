import { useAuth } from "./useAuth"

import { signIn } from "../../services/apiAuth"

import AuthForm from "../../ui/AuthForm"

export default function SighupForm({ handleSignupModal }) {
  const { onSubmit, isLoading } = useAuth(signIn)

  return (
    <AuthForm
      onSubmit={onSubmit}
      isLoading={isLoading}
      type="signup"
      handleModal={handleSignupModal}
    />
  )
}
