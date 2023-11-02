import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export function useAuth(actionFn) {
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation({
    mutationFn: actionFn,
    onSuccess: (user) => {
      queryClient.setQueryData(["currentUser"], user.user)
      navigate("/collections", { replace: true })
      toast.success("Successfully logged in")
    },
    onError: (error) => {
      console.log(error)
      toast.error("Incorrect email or password")
    },
  })

  function onSubmit(data) {
    mutate(data)
  }

  return { onSubmit, isLoading }
}
