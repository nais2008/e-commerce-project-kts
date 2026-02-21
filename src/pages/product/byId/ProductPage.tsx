import React from "react"
import { Link, useNavigate, useParams } from "react-router"

import { useQuery } from "@tanstack/react-query"
import { isAxiosError } from "axios"
import classNames from "classnames"
import { ROUTES } from "constants/routes"
import { ChevronLeft } from "lucide-react"
import { getProductById } from "services/products"

import ErrorMessage from "components/layout/ErrorMessage"
import Button from "components/ui/Button"
import Heading from "components/ui/Heading"
import ImageSlider from "components/ui/ImageSlider"
import { ProductDetailSkeleton } from "components/ui/Skeletons"

import styles from "./ProductPage.module.scss"
import InfoProduct from "./components/InfoProduct"
import List from "./components/List"

const ProductPage: React.FC = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  const {
    isPending,
    error,
    data: rawData,
    refetch,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id ?? ""),
    refetchOnWindowFocus: true,
  })

  if (isPending)
    return (
      <div className={classNames(styles.product, styles.product__container)}>
        <ProductDetailSkeleton />
      </div>
    )

  if (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      navigate(ROUTES.notFound.create(), { replace: true })
      return null
    }

    return (
      <div className={classNames(styles.product, styles.product__container)}>
        <ErrorMessage errorMess={"An error has occurred: " + error.message} />
        <Button onClick={() => refetch()} className={styles.retryButton}>
          Try Again
        </Button>
      </div>
    )
  }

  const data = rawData.data

  return (
    <div className={classNames(styles.product, styles.product__container)}>
      <Link
        to="#"
        className={styles.product__linkPrev}
        onClick={(e) => {
          e.preventDefault()
          navigate(-1)
        }}
      >
        <ChevronLeft size={32} />
        <Heading view="desc">Back</Heading>
      </Link>
      <div className={styles.product__info}>
        <ImageSlider images={data.images} />
        <InfoProduct data={data} />
      </div>
      <List categoryId={data.productCategory.id} />
    </div>
  )
}

export default ProductPage
