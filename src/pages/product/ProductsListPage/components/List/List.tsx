import React from "react"
import Skeleton from "react-loading-skeleton"
import { useSearchParams } from "react-router"

import { useQuery } from "@tanstack/react-query"
import classNames from "classnames"
import { getProducts } from "services/products"

import ErrorMessage from "components/layout/ErrorMessage"
import Button from "components/ui/Button"
import Heading from "components/ui/Heading"
import ListItems from "components/ui/ListItems"
import Pagination from "components/ui/Pagination"
import CardSkeleton from "components/ui/skeletons/CardSkeleton"

import s from "./List.module.scss"

const List: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get("page")) || 1

  const { isPending, isFetching, error, data, refetch } = useQuery({
    queryKey: ["products", page],
    queryFn: () => getProducts(page),
  })

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() })
  }

  if (isPending)
    return (
      <section className={s.list}>
        <Heading view="subtitle" tag="h2" className={s.list__title}>
          Total products <Skeleton width={30} />
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
  const pagination = data?.meta?.pagination

  return (
    <section className={s.list}>
      <Heading view="subtitle" tag="h2" className={s.list__title}>
        Total products
        <Heading
          tag="span"
          color="accent"
          view="paragraph"
          className={s.list__totalProducts}
        >
          {pagination.total}
        </Heading>
      </Heading>
      <ListItems items={dataArr} className={s.list__items} />
      {pagination && pagination.pageCount > 1 && (
        <Pagination
          page={page}
          pageCount={pagination.pageCount}
          onPageChange={handlePageChange}
          isFetching={isFetching}
        />
      )}
    </section>
  )
}

export default List
