import { queryClient } from "api/reactQuery"
import { action, computed, makeObservable, observable } from "mobx"
import { getProducts } from "services/products"
import type { ILocalStore } from "shared/interface/localStore.interface"
import { MobxReactInfiniteQuery } from "shared/store"

const PAGE_SIZE = 9
type PrivateFields = "_productListQuery"

class ProductListStore implements ILocalStore {
  search = ""

  private _productListQuery = new MobxReactInfiniteQuery(
    () => ({
      queryKey: ["products", this.search],
      queryFn: ({ pageParam = 1 }) =>
        getProducts(pageParam, PAGE_SIZE, this.search),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1
        return lastPage.data.length === PAGE_SIZE ? nextPage : undefined
      },
      getPreviousPageParam: (_, allPages) => {
        const prevPage = allPages.length - 1
        return prevPage > 0 ? prevPage : undefined
      },
    }),
    queryClient
  )

  constructor() {
    makeObservable<ProductListStore, PrivateFields>(this, {
      _productListQuery: observable.ref,
      search: observable,
      products: computed,
      isLoading: computed,
      hasNextPage: computed,
      totalProducts: computed,
      error: computed,
      loadMore: action,
      setSearch: action,
      refetch: action,
    })
  }

  setSearch = (newSearch: string) => {
    this.search = newSearch
  }

  refetch() {
    this._productListQuery.result.refetch()
  }

  get totalProducts() {
    return (
      this._productListQuery.result.data?.pages[0]?.meta.pagination.total ?? 0
    )
  }

  get products() {
    return (
      this._productListQuery.result.data?.pages.flatMap((page) => page.data) ??
      []
    )
  }

  get isLoading() {
    return this._productListQuery.result.isPending
  }

  get hasNextPage() {
    return this._productListQuery.hasNextPage()
  }

  get error() {
    return this._productListQuery.result.error
  }

  loadMore() {
    if (this.hasNextPage && !this._productListQuery.result.isFetchingNextPage) {
      this._productListQuery.fetchNextPage()
    }
  }

  destroy(): void {}
}

export default ProductListStore
