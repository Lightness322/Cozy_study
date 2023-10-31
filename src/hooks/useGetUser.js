import { useQueryClient } from "@tanstack/react-query"

export function useGetUser() {
  const queryClient = useQueryClient()

  const user = queryClient.getQueryData(["currentUser"])

  const userId = user?.id

  return { user, userId }
}
