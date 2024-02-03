import { useCurrentQuery } from "../../app/services/userApi"
import { Spinner } from "@nextui-org/react"

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery()

  if (isLoading) {
    return <Spinner />
  }

  return children
}
