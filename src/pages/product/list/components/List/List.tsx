import React from "react"
import Skeleton from "react-loading-skeleton"
import { useNavigate, useSearchParams } from "react-router"

import { useQuery } from "@tanstack/react-query"
import { ROUTES } from "constants/routes"
import { getProducts } from "services/products"

import ErrorMessage from "components/layout/ErrorMessage"
import Button from "components/ui/Button"
import Card from "components/ui/Card"
import Heading from "components/ui/Heading"
import Pagination from "components/ui/Pagination"
import { CardSkeleton } from "components/ui/Skeletons"

import styles from "./List.module.scss"

const List: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get("page")) || 1

  const navigate = useNavigate()

  const { isPending, isFetching, error, data } = useQuery({
    queryKey: ["products", page],
    queryFn: () => getProducts(page),
    refetchOnWindowFocus: true,
  })

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() })
  }

  if (isPending)
    return (
      <section className={styles.list}>
        <Heading view="subtitle" tag="h2" className={styles.list__title}>
          Total products <Skeleton width={30} />
        </Heading>
        <div className={styles.list__items}>
          {[...Array(9)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </section>
    )

  if (error)
    return (
      <ErrorMessage errorMess={"An error has occurred: " + error.message} />
    )

  const dataArr = data?.data
  const pagination = data?.meta?.pagination

  return (
    <section className={styles.list}>
      <Heading view="subtitle" tag="h2" className={styles.list__title}>
        Total products
        <Heading
          tag="span"
          color="accent"
          view="paragraph"
          className={styles.list__totalProducts}
        >
          {pagination.total}
        </Heading>
      </Heading>
      <div className={styles.list__items}>
        {dataArr.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            subtitle={item.description}
            onClick={() => navigate(ROUTES.product.create(item.documentId))}
            contentSlot={`$${item.price}`}
            image={item.images[0].formats.small.url}
            captionSlot={item.productCategory.title}
            actionSlot={<Button>Add to card</Button>}
          />
        ))}
      </div>
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
