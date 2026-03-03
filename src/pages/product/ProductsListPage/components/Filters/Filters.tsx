import React from "react"
import Skeleton from "react-loading-skeleton"
import { useSearchParams } from "react-router"

import { useDebounce } from "hooks/useDebounce"
import { useLocalStore } from "hooks/useLocalStore"
import { observer } from "mobx-react-lite"
import CategoriesStore from "store/CategoriesStore"

import DropDown from "components/ui/DropDown"
import Input from "components/ui/Input"

import s from "./Filters.module.scss"

const Filters: React.FC = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoriesStore = useLocalStore(() => new CategoriesStore())

  const [inputValue, setInputValue] = React.useState(
    searchParams.get("search") ?? ""
  )
  const debouncedInput = useDebounce(inputValue)

  const selectedCategory = searchParams.get("category") ?? "all"

  React.useEffect(() => {
    categoriesStore.refetch()
  }, [categoriesStore])

  React.useEffect(() => {
    const urlSearch = searchParams.get("search") ?? ""
    setInputValue(urlSearch)
  }, [searchParams])

  React.useEffect(() => {
    const currentUrlSearch = searchParams.get("search") ?? ""
    if (debouncedInput !== currentUrlSearch) {
      const params: Record<string, string> = {}
      if (debouncedInput) params.search = debouncedInput
      if (selectedCategory && selectedCategory !== "all") {
        params.category = selectedCategory
      }
      setSearchParams(params)
    }
  }, [debouncedInput, searchParams, setSearchParams, selectedCategory])

  const handleCategoryChange = (value: string) => {
    const params: Record<string, string> = {}
    if (debouncedInput) params.search = debouncedInput
    if (value && value !== "all") params.category = value
    setSearchParams(params)
  }

  const categoryOptions = [
    { value: "all", label: "All" },
    ...categoriesStore.categories.map((cat) => ({
      value: String(cat.id),
      label: cat.title,
    })),
  ]

  return (
    <div className={s.filters}>
      <Input
        type="search"
        placeholder="Search products..."
        value={inputValue}
        onChange={setInputValue}
      />
      {categoriesStore.isLoading ? (
        <Skeleton width={150} />
      ) : (
        <DropDown
          options={categoryOptions}
          value={selectedCategory}
          onChange={handleCategoryChange}
          className={s.filters__dropDown}
        />
      )}
    </div>
  )
})

export default Filters
