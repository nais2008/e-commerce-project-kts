import React, { useMemo } from "react"

import { ChevronLeft, ChevronRight } from "lucide-react"

import Button from "components/ui/Button"

import { getPagesForPagination } from "utils/getPagesForPagination"

import Heading from "../Heading"
import s from "./Pagination.module.scss"

type PaginationProps = {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
  isFetching?: boolean
}

const MAX_VISIBLE = 5
const ICON_SIZE = 35

const Pagination: React.FC<PaginationProps> = ({
  page,
  pageCount,
  onPageChange,
  isFetching = false,
}) => {
  const pages = useMemo(
    () => getPagesForPagination(page, pageCount, MAX_VISIBLE),
    [page, pageCount]
  )

  return (
    <div className={s.pagination}>
      <Button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1 || isFetching}
        type="button"
        className={s.pagination__btn}
      >
        <ChevronLeft size={ICON_SIZE} />
      </Button>

      {pages.map((p, index) =>
        p === "..." ? (
          <Heading tag="span" key={index} className={s.pagination__dots}>
            ...
          </Heading>
        ) : (
          <Button
            key={p}
            onClick={() => onPageChange(p)}
            disabled={isFetching}
            type="button"
            className={s.pagination__dots}
            isPrimary={p === page}
          >
            {p}
          </Button>
        )
      )}

      <Button
        onClick={() => onPageChange(page + 1)}
        disabled={page === pageCount || isFetching}
        type="button"
        className={s.pagination__btn}
      >
        <ChevronRight size={ICON_SIZE} />
      </Button>
    </div>
  )
}

export default Pagination
