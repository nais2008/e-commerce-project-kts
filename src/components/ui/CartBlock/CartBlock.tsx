import React from "react"
import Skeleton from "react-loading-skeleton"
import { useNavigate } from "react-router"

import classNames from "classnames"
import { ROUTES } from "constants/routes"
import { useAuthStore, useCartStore } from "hooks/globalStores"
import { Handbag } from "lucide-react"
import { observer } from "mobx-react-lite"

import Heading from "../Heading"
import s from "./CartBlock.module.scss"

type Props = {
  className?: string
}

const CartBlock: React.FC<Props> = observer(({ className }) => {
  const cartStore = useCartStore()
  const authStore = useAuthStore()

  const navigate = useNavigate()

  return (
    <div
      className={classNames(className, s.cartBlock)}
      onClick={() => navigate(ROUTES.cart.create())}
    >
      <Handbag size={30} />
      {cartStore.error && <span className={s.cartBlock__countItems_empty} />}
      {authStore.isAuthenticated ? (
        cartStore.isLoading ? (
          <Skeleton
            width={20}
            height={20}
            className={s.cartBlock__countItems}
          />
        ) : (
          <Heading className={s.cartBlock__countItems}>
            {cartStore.totalItems}
          </Heading>
        )
      ) : (
        <span className={s.cartBlock__countItems_empty} />
      )}
    </div>
  )
})

export default CartBlock
