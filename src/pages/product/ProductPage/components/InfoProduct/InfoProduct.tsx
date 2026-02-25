import React from "react"

import type { IProduct } from "shared/interface/product.interface"

import Button from "components/ui/Button"
import DiscountPrice from "components/ui/DiscountPrice"
import Heading from "components/ui/Heading"

import s from "./InfoProduct.module.scss"

type Props = {
  data: IProduct
}

const InfoProduct: React.FC<Props> = ({ data }) => {
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
        <Button isPrimary>Add to Cart</Button>
      </div>
    </section>
  )
}

export default InfoProduct
