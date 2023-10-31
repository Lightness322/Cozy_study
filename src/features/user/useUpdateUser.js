import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { updateUser as updateHandler } from "../../services/apiUser"

import toast from "react-hot-toast"

export function useUpdateUser({ user, setIsChangeable, handleIsModalActive }) {
  const queryClient = useQueryClient()

  const nickname = user.user_metadata.nickname
  const email = user.email
  const inactiveDays = user.user_metadata.inactiveDays

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ values: { nickname, inactiveDays, email }, mode: "onBlur" })

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateHandler,
    onSuccess: () => {
      setIsChangeable(false)
      handleIsModalActive()
      queryClient.invalidateQueries({ queryKey: ["currentUser"] })
      toast.success("Changes saved")
    },
    onError: (error) => console.log(error),
  })

  function onSubmit(data) {
    updateUser({
      ...data,
    })
  }

  return { onSubmit, handleSubmit, register, errors, reset, isUpdating }
}
