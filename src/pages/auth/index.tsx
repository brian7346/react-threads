import { Card, CardBody, Tab, Tabs } from "@nextui-org/react"
import React, { Key } from "react"
import { Login } from "../../features/user/login"
import { Register } from "../../features/user/register"
import { useAuthGuard } from "../../hooks/useAuthGuard"

export const Auth = () => {
  const [selected, setSelected] = React.useState<Key>("login")

  useAuthGuard()

  const onSelectionChange = (key: Key) => {
    setSelected(key)
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col">
        <Card className="max-w-full w-[340px] h-[450px]">
          <CardBody className="overflow-hidden">
            <Tabs
              fullWidth
              size="md"
              selectedKey={selected}
              onSelectionChange={onSelectionChange}
            >
              <Tab key="login" title="Вход">
                <Login setSelected={setSelected} />
              </Tab>
              <Tab key="sign-up" title="Регистрация">
                <Register setSelected={setSelected} />
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
