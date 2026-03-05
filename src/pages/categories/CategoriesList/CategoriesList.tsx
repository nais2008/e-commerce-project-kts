import React from "react"

import { useCategoriesStore } from "hooks/globalStores"
import { observer } from "mobx-react-lite"

import Page from "components/layout/Page"
import ListItems from "components/ui/ListItems"
import CardSkeleton from "components/ui/skeletons/CardSkeleton"

import s from "./CategoriesList.module.scss"

const CategoriesList: React.FC = observer(() => {
  const store = useCategoriesStore()

  const loaders = [...Array(6)].map((_, i) => <CardSkeleton key={i} />)

  return (
    <main>
      <Page
        isLoading={store.isLoading}
        error={store.error}
        loadingChildren={<div className={s.list__items}>{loaders}</div>}
        refetch={() => store.refetch()}
        className={s.list}
      >
        <ListItems
          className={s.list__items}
          items={store.categories}
          type="categories"
        />
      </Page>
    </main>
  )
})

export default CategoriesList
