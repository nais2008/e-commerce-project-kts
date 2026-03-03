import { queryClient } from "api/reactQuery"
import type { AxiosError } from "axios"
import { action, computed, makeObservable, observable } from "mobx"
import { addToCart, getCart, removeFromCart } from "services/cart"
import type { IProductInCart } from "shared/interface/cart.interface"
import type { ILocalStore } from "shared/interface/localStore.interface"
import MobxMutation from "store/globals/mobxMutation"
import MobxQuery from "store/globals/mobxQuery"

type PrivateFields = "_cartQuery" | "_addMutation" | "_removeMutation"

class CartStore implements ILocalStore {
  private jwt: string | null

  private _cartQuery = new MobxQuery(
    () => ({
      queryKey: ["cart", "list"],
      queryFn: () => getCart(this.jwt ?? ""),
      enabled: !!this.jwt,
    }),
    queryClient
  )

  private _addMutation = new MobxMutation(
    () => ({
      mutationKey: ["cart", "add"],
      mutationFn: (variables: { productId: number; quantity?: number }) =>
        addToCart(this.jwt ?? "", variables.productId, variables.quantity),
      enabled: !!this.jwt,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cart", "list"] })
      },
    }),
    queryClient
  )

  private _removeMutation = new MobxMutation(
    () => ({
      mutationKey: ["cart", "remove"],
      mutationFn: (variables: { productId: number; quantity?: number }) =>
        removeFromCart(this.jwt ?? "", variables.productId, variables.quantity),
      enabled: !!this.jwt,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cart", "list"] })
      },
    }),
    queryClient
  )

  constructor(jwt: string | null) {
    this.jwt = jwt

    makeObservable<CartStore, PrivateFields>(this, {
      _cartQuery: observable.ref,
      _addMutation: observable.ref,
      _removeMutation: observable.ref,

      cart: computed,
      isLoading: computed,
      error: computed,

      add: action,
      remove: action,
      refetch: action,
      setJwt: action,
    })
  }

  get cart(): IProductInCart[] {
    return this._cartQuery.result.data?.data ?? []
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

  setJwt(jwt: string | null) {
    this.jwt = jwt
    this._cartQuery.result.refetch()
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

  destroy() {}
}

export default CartStore
