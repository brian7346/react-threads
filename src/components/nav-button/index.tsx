import React from "react"
import { Link } from "react-router-dom"
import { Button } from "../button"

type Props = {
  children: React.ReactNode
  icon: JSX.Element
  href: string
}

export const NavButton: React.FC<Props> = ({ children, icon, href }) => {
  return (
    <Link to={href}>
      <Button className="flex justify-start text-xl" icon={icon}>
        {children}
      </Button>
    </Link>
  )
}
