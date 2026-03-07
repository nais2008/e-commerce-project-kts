import React, { useCallback } from "react"
import { useNavigate } from "react-router"

import { ROUTES } from "constants/routes"
import type { IProductToList } from "shared/interface/product.interface"

import Button from "../Button"
import Card from "../Card"
import DiscountPrice from "../DiscountPrice"

type Props = {
  product: IProductToList
  isAuth?: boolean
  onAddToCart?: () => void
  inCart?: boolean
}

const ProductCard: React.FC<Props> = ({
  product,
  isAuth,
  onAddToCart,
  inCart,
}) => {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(ROUTES.product.create(product.documentId))
  }

  const handleButtonClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (typeof onAddToCart === "undefined") return

      onAddToCart()
      console.log("Добавили в корзину:", product.id)
    },
    [onAddToCart, product.id]
  )

  return (
    <Card
      key={product.id}
      title={product.title}
      subtitle={product.description}
      onClick={handleCardClick}
      contentSlot={
        <DiscountPrice
          price={product.price}
          discountPercent={product.discountPercent}
        />
      }
      image={product.images[0].formats.small.url}
      captionSlot={product.productCategory.title}
      actionSlot={
        isAuth && (
          <Button disabled={inCart} onClick={handleButtonClick}>
            {inCart ? "In cart" : "Add to cart"}
          </Button>
        )
      }
    />
  )
}

export default React.memo(ProductCard)
