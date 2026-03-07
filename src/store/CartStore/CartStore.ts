import { queryClient } from "api/reactQuery"
import type { AxiosError } from "axios"
import { action, computed, makeObservable, observable } from "mobx"
import { addToCart, getCart, removeFromCart } from "services/cart"
import type { IProductInCart } from "shared/interface/cart.interface"
import type { ILocalStore } from "shared/interface/localStore.interface"
import MobxMutation from "store/globals/mobxMutation"
import MobxQuery from "store/globals/mobxQuery"
import type { RootStore } from "store/globals/root"

import { calculateDiscountedPrice } from "utils/calculateDiscountedPrice"

type PrivateFields = "_cartQuery" | "_addMutation" | "_removeMutation"

class CartStore implements ILocalStore {
  private _rootStore: RootStore

  private _cartQuery
  private _addMutation
  private _removeMutation

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore

    this._cartQuery = new MobxQuery(
      () => ({
        queryKey: ["cart", "list"],
        queryFn: () => getCart(this._rootStore.authStore.jwt ?? ""),
        enabled: !!this._rootStore.authStore.jwt,
      }),
      queryClient
    )

    this._addMutation = new MobxMutation(
      () => ({
        mutationKey: ["cart", "add"],
        mutationFn: (variables: { productId: number; quantity?: number }) => {
          const token = this._rootStore.authStore.jwt ?? ""

          return addToCart(token, variables.productId, variables.quantity)
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["cart", "list"] })
        },
      }),
      queryClient
    )

    this._removeMutation = new MobxMutation(
      () => ({
        mutationKey: ["cart", "remove"],
        mutationFn: (variables: { productId: number; quantity?: number }) => {
          const token = this._rootStore.authStore.jwt ?? ""

          return removeFromCart(token, variables.productId, variables.quantity)
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["cart", "list"] })
        },
      }),
      queryClient
    )

    makeObservable<CartStore, PrivateFields>(this, {
      _cartQuery: observable.ref,
      _addMutation: observable.ref,
      _removeMutation: observable.ref,

      cart: computed,
      isLoading: computed,
      error: computed,
      totalSum: computed,
      totalItems: computed,

      add: action,
      remove: action,
      refetch: action,
    })
  }

  get cart(): IProductInCart[] {
    return this._cartQuery.result.data ?? []
  }

  isProductInCart(productId: number) {
    return this.cart.some((item) => item.product.id === productId)
  }

  getProductQuantity(productId: number): number {
    const item = this.cart.find((item) => item.product.id === productId)
    return item?.quantity ?? 0
  }

  get totalSum(): number {
    const total = this.cart.reduce((sum, item) => {
      const discountedPrice = calculateDiscountedPrice(
        item.product.price,
        item.product.discountPercent
      )
      return sum + discountedPrice * item.quantity
    }, 0)

    return +total.toFixed(2)
  }

  get totalItems(): number {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0)
  }

  get isLoading() {
    return (
      this._cartQuery.result.isPending ||
      this._addMutation.result.isPending ||
      this._removeMutation.result.isPending
    )
  }

  get error(): AxiosError | null {
    return (this._cartQuery.result.error as AxiosError) ?? null
  }

  add(productId: number, quantity = 1) {
    return this._addMutation.mutate({ productId, quantity })
  }

  remove(productId: number, quantity = 1) {
    return this._removeMutation.mutate({ productId, quantity })
  }

  refetch() {
    this._cartQuery.result.refetch()
  }

  destroy() {
    this._cartQuery.stopTracking()
    this._addMutation.stopTracking()
    this._removeMutation.stopTracking()
  }
}

export default CartStore
