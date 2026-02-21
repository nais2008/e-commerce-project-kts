import React from "react"

import type { IProduct } from "shared/interface/product.interface"

import Button from "components/ui/Button"
import DiscountPrice from "components/ui/DiscountPrice"
import Heading from "components/ui/Heading"

import styles from "./InfoProduct.module.scss"

interface Props {
  data: IProduct
}

const InfoProduct: React.FC<Props> = ({ data }) => {
  return (
    <section className={styles.product}>
      <article className={styles.product__title}>
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
      <div className={styles.product__btns}>
        <Button>Buy Now</Button>
        <Button isPrimary>Add to Cart</Button>
      </div>
    </section>
  )
}

export default InfoProduct
