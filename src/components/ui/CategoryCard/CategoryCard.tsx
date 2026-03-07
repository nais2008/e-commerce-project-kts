import React from "react"
import { useNavigate } from "react-router"

import { ROUTES } from "constants/routes"
import type { ICategory } from "shared/interface/category.interface"

import Card from "../Card"

type Props = {
  item: ICategory
}

const CategoryCard: React.FC<Props> = ({ item }) => {
  const navigate = useNavigate()

  return (
    <Card
      key={item.id}
      title={item.title}
      subtitle={item.documentId}
      image={item.image.formats.small.url}
      onClick={() =>
        navigate({
          pathname: ROUTES.products.create(),
          search: `?category=${item.id}`,
        })
      }
    />
  )
}

export default CategoryCard
