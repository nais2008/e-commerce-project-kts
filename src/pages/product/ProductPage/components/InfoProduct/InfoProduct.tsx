import React from "react"

import { useCartStore } from "hooks/globalStores"
import { observer } from "mobx-react-lite"
import type { IProduct } from "shared/interface/product.interface"

import Button from "components/ui/Button"
import DiscountPrice from "components/ui/DiscountPrice"
import Heading from "components/ui/Heading"
import QuantityButton from "components/ui/QuantityButton"

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
          <Button isPrimary onClick={() => cartStore.add(data.id, 1, data)}>
            Add to Cart
          </Button>
        ) : (
          <QuantityButton
            isPrimary
            quantity={quantity}
            onAdd={() => cartStore.add(data.id, 1, data)}
            onRemove={() => cartStore.remove(data.id)}
          />
        )}
      </div>
    </section>
  )
})

export default InfoProduct
