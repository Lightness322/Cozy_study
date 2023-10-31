import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

import { logOut as logOutHandler } from "../../services/apiAuth"

export function useLogOut() {
  const navigate = useNavigate()

  const { mutate: logOut, isLoading: isLoggingOut } = useMutation({
    mutationFn: logOutHandler,
    onSuccess: () => navigate("/intro"),
    onError: (error) => console.log(error),
  })

  function handleLogOut() {
    logOut()
  }

  return { handleLogOut, isLoggingOut }
}
