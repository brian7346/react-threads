import { useSelector } from "react-redux"
import { selectIsAuthenticated } from "../features/user/userSlice"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export const useAuthGuard = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/")
    }
  }, [])
}
