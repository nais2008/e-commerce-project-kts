import React from "react"
import { Link, useNavigate, useParams } from "react-router"

import { useQuery } from "@tanstack/react-query"
import { ROUTES } from "constants/routes"
import { ChevronLeft } from "lucide-react"
import { getProductById } from "services/products"

import ErrorMessage from "components/layout/ErrorMessage"
import Button from "components/ui/Button"
import Heading from "components/ui/Heading"
import ImageSlider from "components/ui/ImageSlider"
import ProductDetailSkeleton from "components/ui/skeletons/ProductDetailSkeleton"

import s from "./ProductPage.module.scss"
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
  })

  if (isPending)
    return (
      <main className={s.product__container}>
        <Link
          to="#"
          className={s.product__linkPrev}
          onClick={(e) => {
            e.preventDefault()
            navigate(-1)
          }}
        >
          <ChevronLeft size={32} />
          <Heading view="desc">Back</Heading>
        </Link>
        <ProductDetailSkeleton />
      </main>
    )

  if (error) {
    if (error.message === "Not Found") {
      navigate(ROUTES.notFound.create(), { replace: true })
      return null
    }

    return (
      <main className={s.product__container}>
        <ErrorMessage errorMess={"An error has occurred: " + error.message} />
        <Button onClick={() => refetch()} className={s.retryButton}>
          Try Again
        </Button>
      </main>
    )
  }

  const data = rawData.data

  return (
    <main className={s.product__container}>
      <Link
        to="#"
        className={s.product__linkPrev}
        onClick={(e) => {
          e.preventDefault()
          navigate(-1)
        }}
      >
        <ChevronLeft size={32} />
        <Heading view="desc">Back</Heading>
      </Link>
      <div className={s.product__info}>
        <ImageSlider images={data.images} />
        <InfoProduct data={data} />
      </div>
      <List categoryId={data.productCategory.id} />
    </main>
  )
}

export default ProductPage
