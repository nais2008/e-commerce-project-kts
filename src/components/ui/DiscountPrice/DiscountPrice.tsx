import React from "react"

import { calculateDiscountedPrice } from "utils/calculateDiscountedPrice"

import Heading from "../Heading"
import s from "./DiscountPrice.module.scss"

type Props = {
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
        weight="medium"
        className={s.discountPrice__price}
      >
        ${price.toFixed(2)}
      </Heading>
    )

  return (
    <div className={s.discountPrice}>
      <Heading
        tag={view == "subtitle" ? "h2" : "span"}
        color="accent"
        view={view == "subtitle" ? view : "desc"}
        weight="medium"
        className={s.discountPrice__price}
      >
        ${discountedPrice}
      </Heading>
      <Heading
        tag="span"
        view="paragraph"
        color="secondary"
        className={s.discountPrice__price_old}
      >
        ${price.toFixed(2)}
      </Heading>
      <Heading
        tag="span"
        view="paragraph"
        className={s.discountPrice__discount}
      >
        -{discountPercent}%
      </Heading>
    </div>
  )
}

export default DiscountPrice
