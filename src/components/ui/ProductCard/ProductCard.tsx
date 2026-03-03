import React from "react"
import { useNavigate } from "react-router"

import { ROUTES } from "constants/routes"
import { observer } from "mobx-react-lite"
import type { IProductToList } from "shared/interface/product.interface"
import CartStore from "store/CartStore"

import Button from "../Button"
import Card from "../Card"
import DiscountPrice from "../DiscountPrice"

type Props = {
  product: IProductToList
  cartStore: CartStore
}

const ProductCard: React.FC<Props> = observer(({ product, cartStore }) => {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(ROUTES.product.create(product.documentId))
  }

  const isInCart =
    cartStore?.cart?.some((item) => item.product.id === product.id) ?? false

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    cartStore.add(product.id)
    console.log("Добавили в корзину:", product.id)
  }

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
        <Button onClick={handleButtonClick} disabled={isInCart}>
          {isInCart ? "Added" : "Add to cart"}
        </Button>
      }
    />
  )
})

export default ProductCard
