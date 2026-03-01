import React from "react"

import type { IProductToList } from "shared/interface/product.interface"

import ProductCard from "../ProductCard"

type Props = {
  className?: string
  items: IProductToList[]
}

const ListItems: React.FC<Props> = ({ className, items }) => {
  return (
    <div className={className}>
      {items.map((item) => (
        <ProductCard product={item} key={item.id} />
      ))}
    </div>
  )
}

export default ListItems
