import React from "react"
import { useNavigate } from "react-router"

import { useQuery } from "@tanstack/react-query"
import classNames from "classnames"
import { ROUTES } from "constants/routes"
import { getProducts, getProductsByCategory } from "services/products"

import ErrorMessage from "components/layout/ErrorMessage"
import Button from "components/ui/Button"
import Card from "components/ui/Card"
import DiscountPrice from "components/ui/DiscountPrice"
import Heading from "components/ui/Heading"
import { CardSkeleton } from "components/ui/Skeletons"

import styles from "./List.module.scss"

interface Props {
  categoryId: number
}

const List: React.FC<Props> = ({ categoryId }) => {
  const navigate = useNavigate()

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["productsByCategory"],
    queryFn: () => getProductsByCategory(categoryId, 3),
    refetchOnWindowFocus: true,
  })

  if (isPending)
    return (
      <section className={styles.list}>
        <Heading view="subtitle" tag="h2" className={styles.list__title}>
          Related Items
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
      <div className={classNames(styles.list)}>
        <ErrorMessage errorMess={"An error has occurred: " + error.message} />
        <Button onClick={() => refetch()} className={styles.retryButton}>
          Try Again
        </Button>
      </div>
    )

  const dataArr = data?.data

  return (
    <section className={styles.list}>
      <Heading view="subtitle" tag="h2" className={styles.list__title}>
        Related Items
      </Heading>
      <div className={styles.list__items}>
        {dataArr.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            subtitle={item.description}
            onClick={() => navigate(ROUTES.product.create(item.documentId))}
            contentSlot={
              <DiscountPrice
                price={item.price}
                discountPercent={item.discountPercent}
              />
            }
            image={item.images[0].formats.small.url}
            captionSlot={item.productCategory.title}
            actionSlot={<Button>Add to card</Button>}
          />
        ))}
      </div>
    </section>
  )
}

export default List
