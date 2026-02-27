import {
  type DefaultError,
  QueryClient,
  type QueryKey,
  QueryObserver,
  type QueryObserverOptions,
} from "@tanstack/query-core"
import { createAtom, reaction } from "mobx"

export class MobxQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> {
  private atom = createAtom(
    "MobxQuery",
    () => this.startTracking(),
    () => this.stopTracking()
  )

  private queryObserver: QueryObserver<
    TQueryFnData,
    TError,
    TData,
    TQueryData,
    TQueryKey
  >

  constructor(
    private getOptions: () => QueryObserverOptions<
      TQueryFnData,
      TError,
      TData,
      TQueryData,
      TQueryKey
    >,
    private queryClient: QueryClient
  ) {
    this.queryObserver = new QueryObserver(
      this.queryClient,
      this.defaultQueryOptions
    )
  }

  result() {
    this.atom.reportObserved()

    return this.queryObserver.getOptimisticResult(this.defaultQueryOptions)
  }

  private unsubscribe = () => {}
  startTracking() {
    reaction(
      () => this.defaultQueryOptions,
      () => {
        this.queryObserver.setOptions(this.defaultQueryOptions)
      }
    )

    this.unsubscribe = this.queryObserver.subscribe(() => {
      this.atom.reportChanged()
    })
  }

  stopTracking() {
    this.unsubscribe()
  }

  private get defaultQueryOptions() {
    return this.queryClient.defaultQueryOptions(this.getOptions())
  }
}
