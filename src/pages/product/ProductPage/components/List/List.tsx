import React from "react"

import { useQuery } from "@tanstack/react-query"
import classNames from "classnames"
import { getProductsByCategory } from "services/products"

import ErrorMessage from "components/layout/ErrorMessage"
import Button from "components/ui/Button"
import Heading from "components/ui/Heading"
import ListItems from "components/ui/ListItems"
import CardSkeleton from "components/ui/skeletons/CardSkeleton"

import s from "./List.module.scss"

type Props = {
  categoryId: number
}

const List: React.FC<Props> = ({ categoryId }) => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["productsByCategory"],
    queryFn: () => getProductsByCategory(categoryId, 3),
    refetchOnWindowFocus: true,
  })

  if (isPending)
    return (
      <section className={s.list}>
        <Heading view="subtitle" tag="h2" className={s.list__title}>
          Related Items
        </Heading>
        <div className={s.list__items}>
          {[...Array(9)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </section>
    )

  if (error)
    return (
      <div className={classNames(s.list)}>
        <ErrorMessage errorMess={"An error has occurred: " + error.message} />
        <Button onClick={() => refetch()} className={s.retryButton}>
          Try Again
        </Button>
      </div>
    )

  const dataArr = data?.data

  return (
    <section className={s.list}>
      <Heading view="subtitle" tag="h2" className={s.list__title}>
        Related Items
      </Heading>
      <ListItems className={s.list__items} items={dataArr} />
    </section>
  )
}

export default List
