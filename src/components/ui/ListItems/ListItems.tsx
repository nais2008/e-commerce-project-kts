import React from "react"

import type { ICategory } from "shared/interface/category.interface"
import type { IProductToList } from "shared/interface/product.interface"

import Card from "../Card"
import ProductCard from "../ProductCard"

// import CategoryCard from "../CategoryCard"

type Props = {
  className?: string
  items: IProductToList[] | ICategory[]
}

function isProduct(item: IProductToList | ICategory): item is IProductToList {
  return "price" in item && "discountPercent" in item
}

function isCategory(item: IProductToList | ICategory): item is ICategory {
  return !isProduct(item)
}

const ListItems: React.FC<Props> = ({ className, items }) => {
  return (
    <div className={className}>
      {items.map((item) => {
        if (isProduct(item)) {
          return <ProductCard product={item} key={item.id} />
        } else if (isCategory(item)) {
          return (
            <Card
              key={item.id}
              title={item.title}
              subtitle={item.documentId}
              image={item.image.formats.small.url}
            />
          )
        }
        return null
      })}
    </div>
  )
}

export default ListItems
