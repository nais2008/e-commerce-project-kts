import React from "react"

import { useCartStore } from "hooks/globalStores"
import { Minus, Plus } from "lucide-react"
import { observer } from "mobx-react-lite"
import type { IProduct } from "shared/interface/product.interface"

import Button from "components/ui/Button"
import DiscountPrice from "components/ui/DiscountPrice"
import Heading from "components/ui/Heading"

import s from "./InfoProduct.module.scss"

type Props = {
  data: IProduct
}

const InfoProduct: React.FC<Props> = observer(({ data }) => {
  const cartStore = useCartStore()

  const quantity = cartStore.getProductQuantity(data.id)

  return (
    <section className={s.product}>
      <article className={s.product__title}>
        <Heading tag="h1" view="title">
          {data.title}
        </Heading>
        <Heading view="desc" color="secondary">
          {data.description}
        </Heading>
      </article>
      <DiscountPrice
        price={data.price}
        discountPercent={data.discountPercent}
        view="subtitle"
      />
      <div className={s.product__btns}>
        <Button>Buy Now</Button>
        {quantity === 0 ? (
          <Button isPrimary onClick={() => cartStore.add(data.id)}>
            Add to Cart
          </Button>
        ) : (
          <div className={s.product__cartControls}>
            <Button
              isPrimary
              className={s.product__cartControlBtn}
              onClick={() => cartStore.remove(data.id)}
            >
              <Minus />
            </Button>

            <Heading weight="medium" tag="span" className={s.quantity}>
              {quantity}
            </Heading>

            <Button
              isPrimary
              className={s.product__cartControlBtn}
              onClick={() => cartStore.add(data.id)}
            >
              <Plus />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
})

export default InfoProduct
