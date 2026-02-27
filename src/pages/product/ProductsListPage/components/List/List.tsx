import React from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import Skeleton from "react-loading-skeleton"
import { useSearchParams } from "react-router"

import { useDebounce } from "hooks/useDebounce"
import { useLocalStore } from "hooks/useLocalStore"
import { observer } from "mobx-react-lite"
import ProductListStore from "store/ProductListStore"

import ErrorMessage from "components/layout/ErrorMessage"
import Button from "components/ui/Button"
import Heading from "components/ui/Heading"
import Input from "components/ui/Input"
import ProductCard from "components/ui/ProductCard"
import CardSkeleton from "components/ui/skeletons/CardSkeleton"

import s from "./List.module.scss"

const List: React.FC = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams()
  const store = useLocalStore(() => new ProductListStore())

  React.useEffect(() => {
    const searchFromUrl = searchParams.get("search") ?? ""
    store.setSearch(searchFromUrl)
  }, [searchParams, store])

  const debouncedSearch = useDebounce(store.search)

  React.useEffect(() => {
    if (debouncedSearch) {
      setSearchParams({ search: debouncedSearch })
    } else {
      setSearchParams({})
    }

    store.setSearch(debouncedSearch)
  }, [debouncedSearch, setSearchParams, store])

  const productsMessage =
    store.totalProducts > 0 ? (
      <Heading tag="p" weight="medium" className={s.list__endMessage}>
        🎉 All products have been loaded
      </Heading>
    ) : (
      <Heading tag="p" weight="medium" className={s.list__endMessage}>
        No products :(
      </Heading>
    )

  const loaders = [...Array(6)].map((_, i) => <CardSkeleton key={i} />)

  const errorMessage = (
    <>
      <ErrorMessage
        errorMess={"An error has occurred: " + store.error?.message}
      />
      <Button onClick={() => store.refetch()} className={s.retryButton}>
        Try Again
      </Button>
    </>
  )

  return (
    <section className={s.list}>
      <Input
        type="search"
        placeholder="Search products..."
        value={store.search}
        onChange={store.setSearch}
      />

      <Heading view="subtitle" tag="h2" className={s.list__title}>
        Total products
        {store.isLoading ? (
          <Skeleton width={30} />
        ) : (
          <Heading
            tag="span"
            color="accent"
            view="paragraph"
            className={s.list__totalProducts}
          >
            {store.totalProducts}
          </Heading>
        )}
      </Heading>

      {store.isLoading && <div className={s.list__items}>{loaders}</div>}
      {store.error && errorMessage}

      <InfiniteScroll
        dataLength={store.products.length}
        next={() => store.loadMore()}
        hasMore={store.hasNextPage}
        loader={loaders}
        scrollThreshold={0.9}
        className={s.list__items}
        endMessage={productsMessage}
      >
        {store.products.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </InfiniteScroll>
    </section>
  )
})

export default List
