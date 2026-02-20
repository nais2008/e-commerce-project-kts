import React from "react"
import Skeleton from "react-loading-skeleton"

import styles from "./ProductDetailSkeleton.module.scss"

export const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <Skeleton height="100%" width="100%" />
      </div>

      <div className={styles.content}>
        <Skeleton height={32} width="60%" />

        <div className={styles.description}>
          <Skeleton count={2} height={16} />
        </div>

        <Skeleton height={28} width={120} />

        <div className={styles.buttons}>
          <Skeleton height={40} width={120} />
          <Skeleton height={40} width={140} />
        </div>
      </div>
    </div>
  )
}
