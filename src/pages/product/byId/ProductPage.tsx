import React from "react"
import { useNavigate, useParams } from "react-router"

import { useQuery } from "@tanstack/react-query"
import { isAxiosError } from "axios"
import { getProductById } from "services/products"

import ErrorMessage from "components/layout/ErrorMessage"
import { ProductDetailSkeleton } from "components/ui/Skeletons"

import styles from "./ProductPage.module.scss"

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

  if (isPending) return <ProductDetailSkeleton />

  if (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      navigate("/non-existent-path", { replace: true })
      return null
    }

    return (
      <div className={styles.error}>
        <ErrorMessage errorMess={"An error has occurred: " + error.message} />
        <button onClick={() => refetch()} className={styles.retryButton}>
          Try Again
        </button>
      </div>
    )
  }

  const data = rawData.data

  return <div>{data.title}</div>
}

export default ProductPage
