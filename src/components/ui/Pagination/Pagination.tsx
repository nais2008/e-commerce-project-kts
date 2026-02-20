import React from "react"

import { ChevronLeft, ChevronRight } from "lucide-react"

import Button from "components/ui/Button"

import Heading from "../Heading"
import styles from "./Pagination.module.scss"

interface PaginationProps {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
  isFetching?: boolean
}

const MAX_VISIBLE = 5

const Pagination: React.FC<PaginationProps> = ({
  page,
  pageCount,
  onPageChange,
  isFetching = false,
}) => {
  const getPages = () => {
    if (pageCount <= MAX_VISIBLE) {
      return Array.from({ length: pageCount }, (_, i) => i + 1)
    }

    const pages: (number | "...")[] = []

    const start = Math.max(1, page - 1)
    const end = Math.min(pageCount, page + 1)

    if (start > 1) {
      pages.push(1)
      if (start > 2) pages.push("...")
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (end < pageCount) {
      if (end < pageCount - 1) pages.push("...")
      pages.push(pageCount)
    }

    return pages
  }

  const pages = getPages()

  return (
    <div className={styles.pagination}>
      <Button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1 || isFetching}
        type="button"
        className={styles.pagination__btn}
      >
        <ChevronLeft size={35} />
      </Button>

      {pages.map((p, index) =>
        p === "..." ? (
          <Heading tag="span" key={index} className={styles.dots}>
            ...
          </Heading>
        ) : (
          <Heading
            key={p}
            className={p === page ? styles.pagination__active : ""}
          >
            {p}
          </Heading>
        )
      )}

      <Button
        onClick={() => onPageChange(page + 1)}
        disabled={page === pageCount || isFetching}
        type="button"
        className={styles.pagination__btn}
      >
        <ChevronRight size={35} />
      </Button>
    </div>
  )
}

export default Pagination
