import React from "react"
import { useNavigate } from "react-router"

import { ROUTES } from "constants/routes"
import type { IProductToList } from "shared/interface/product.interface"

import Button from "../Button"
import Card from "../Card"
import DiscountPrice from "../DiscountPrice"

type Props = {
  product: IProductToList
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(ROUTES.product.create(product.documentId))
  }

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
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
      actionSlot={<Button onClick={handleButtonClick}>Add to cart</Button>}
    />
  )
}

export default ProductCard
