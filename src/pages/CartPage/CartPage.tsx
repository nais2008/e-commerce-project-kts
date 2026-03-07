import React from "react"

import { useCartStore } from "hooks/globalStores"
import { observer } from "mobx-react-lite"

import ErrorMessage from "components/layout/ErrorMessage"
import Button from "components/ui/Button"

import s from "./CartPage.module.scss"
import List from "./components/List"
import Summary from "./components/Summary"

const CartPage: React.FC = observer(() => {
  const cartStore = useCartStore()

  if (cartStore.error) {
    return (
      <main className={s.cart__container}>
        <ErrorMessage errorMess={cartStore.error.message} />
        <Button onClick={() => cartStore.refetch()}>Try Again</Button>
      </main>
    )
  }

  return (
    <main className={s.cart__container}>
      <div className={s.cart__content}>
        <List />
        <Summary />
      </div>
    </main>
  )
})

export default CartPage
