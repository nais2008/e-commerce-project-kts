import React from "react"

import { useLocalStore } from "hooks/useLocalStore"
import { observer } from "mobx-react-lite"
import CategoriesStore from "store/CategoriesStore"

import ErrorMessage from "components/layout/ErrorMessage"
import Button from "components/ui/Button"
import ListItems from "components/ui/ListItems"
import CardSkeleton from "components/ui/skeletons/CardSkeleton"

import s from "./CategoriesList.module.scss"

const CategoriesList: React.FC = observer(() => {
  const store = useLocalStore(() => new CategoriesStore())

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
    <main>
      <section className={s.list}>
        {store.isLoading && <div className={s.list__items}>{loaders}</div>}
        {store.error && errorMessage}
        <ListItems className={s.list__items} items={store.categories} />
      </section>
    </main>
  )
})

export default CategoriesList
