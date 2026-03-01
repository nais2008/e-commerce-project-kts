import React from "react"
import { Link, useNavigate, useParams } from "react-router"

import { ROUTES } from "constants/routes"
import { useLocalStore } from "hooks/useLocalStore"
import { ChevronLeft } from "lucide-react"
import { observer } from "mobx-react-lite"
import ProductStore from "store/ProductStore"

import ErrorMessage from "components/layout/ErrorMessage"
import Button from "components/ui/Button"
import Heading from "components/ui/Heading"
import ImageSlider from "components/ui/ImageSlider"
import ProductDetailSkeleton from "components/ui/skeletons/ProductDetailSkeleton"

import s from "./ProductPage.module.scss"
import InfoProduct from "./components/InfoProduct"
import List from "./components/List"

const ProductPage: React.FC = observer(() => {
  const { id } = useParams()

  const navigate = useNavigate()

  const store = useLocalStore(() => new ProductStore())

  React.useEffect(() => {
    if (id) {
      store.setId(id)
    }
  }, [id, store])

  React.useEffect(() => {
    store.onNotFound = () => navigate(ROUTES.notFound.create())
  }, [store.error, navigate, store])

  const handleBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <main className={s.product__container}>
      <Link to="#" className={s.product__linkPrev} onClick={handleBack}>
        <ChevronLeft size={32} />
        <Heading view="desc">Back</Heading>
      </Link>
      {store.isLoading && <ProductDetailSkeleton />}
      {store.error && (
        <>
          <ErrorMessage
            errorMess={`An error has occurred: ${store.error?.message}`}
          />
          <Button onClick={() => store.refetch()} className={s.retryButton}>
            Try Again
          </Button>
        </>
      )}
      {store.product && (
        <>
          <div className={s.product__info}>
            <ImageSlider images={store.product.images} />
            <InfoProduct data={store.product} />
          </div>
          <List categoryId={store.product.productCategory.id} />
        </>
      )}
    </main>
  )
})

export default ProductPage
