import React from "react"
import { useNavigate } from "react-router"

import classNames from "classnames"
import { ROUTES } from "constants/routes"

import Button from "components/ui/Button"
import Heading from "components/ui/Heading"

import s from "./WelcomePage.module.scss"

const WelcomePage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className={classNames(s.index, s.index__container)}>
      <Heading view="title" tag="h1" className={s.index__title}>
        Welcome to <span>Lalasia</span>
      </Heading>
      <Button onClick={() => navigate(ROUTES.products.create())}>
        Go to products
      </Button>
    </div>
  )
}

export default WelcomePage
