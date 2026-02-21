import React from "react"

import { calculateDiscountedPrice } from "utils/calculateDiscountedPrice"

import Heading from "../Heading"
import styles from "./DiscountPrice.module.scss"

interface Props {
  price: number
  discountPercent: number
  view?: "title" | "button" | "subtitle" | "desc" | "paragraph"
}

const DiscountPrice: React.FC<Props> = ({ price, discountPercent, view }) => {
  const discountedPrice = calculateDiscountedPrice(price, discountPercent)

  if (discountedPrice === price)
    return (
      <Heading
        tag={view == "subtitle" ? "h2" : "span"}
        view={view == "subtitle" ? view : "desc"}
        className={styles.discountPrice__price}
      >
        ${price.toFixed(2)}
      </Heading>
    )

  return (
    <div className={styles.discountPrice}>
      <Heading
        tag={view == "subtitle" ? "h2" : "span"}
        color="accent"
        view={view == "subtitle" ? view : "desc"}
        className={styles.discountPrice__price}
      >
        ${discountedPrice}
      </Heading>
      <Heading
        tag="span"
        view="paragraph"
        color="secondary"
        weight="normal"
        className={styles.discountPrice__price_old}
      >
        ${price.toFixed(2)}
      </Heading>
      <Heading
        tag="span"
        view="paragraph"
        className={styles.discountPrice__discount}
      >
        -{discountPercent}%
      </Heading>
    </div>
  )
}

export default DiscountPrice
