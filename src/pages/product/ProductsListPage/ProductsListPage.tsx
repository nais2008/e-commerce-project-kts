import React from "react"

import s from "./ProductsListPage.module.scss"
import List from "./components/List"
import Title from "./components/Title"

const ProductsListPage: React.FC = () => {
  return (
    <main className={s.productsList__container}>
      <Title />
      <List />
    </main>
  )
}

export default ProductsListPage
