import React from "react"
import Skeleton from "react-loading-skeleton"

import s from "./ProductDetailSkeleton.module.scss"

const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.image}>
        <Skeleton height="100%" width="100%" />
      </div>

      <div className={s.content}>
        <Skeleton height={48} width="60%" />

        <div className={s.description}>
          <Skeleton count={2} height={24} />
        </div>

        <Skeleton height={48} width={120} />

        <div className={s.buttons}>
          <Skeleton height={52} width={135} />
          <Skeleton height={52} width={155} />
        </div>
      </div>
    </div>
  )
}

export default ProductDetailSkeleton
