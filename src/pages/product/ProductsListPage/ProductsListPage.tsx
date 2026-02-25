import React from "react"

import classNames from "classnames"

import s from "./ProductsListPage.module.scss"
import List from "./components/List"
import Title from "./components/Title"

const ProductsListPage: React.FC = () => {
  return (
    <div className={classNames(s.productsList, s.productsList__container)}>
      <Title />
      <List />
    </div>
  )
}

export default ProductsListPage
