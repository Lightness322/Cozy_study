import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

import { getCurrentUser } from "../../services/apiAuth"

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate()

  const { data: user, isLoading } = useQuery(["currentUser"], getCurrentUser)
  const isAuthenticated = user?.role === "authenticated"

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/intro")
  }, [isAuthenticated, navigate, isLoading])

  if (isAuthenticated) return children
}
