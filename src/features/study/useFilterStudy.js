import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"

import { getUniqueCategories } from "../../utils/helpers"

export function useFilterStudy(collections) {
  const [searchParams, setSearchParams] = useSearchParams()

  const uniqueCategories = getUniqueCategories(collections)

  const options = {
    sort: [
      { value: "active_cards", label: "Active cards" },
      { value: "name", label: "Title" },
      { value: "download_date", label: "Download date" },
    ],
    categories: ["all", ...uniqueCategories],
  }

  useEffect(() => {
    if (searchParams.get("search") === "") {
      searchParams.delete("search")
      setSearchParams(searchParams)
    }
  }, [searchParams, setSearchParams])

  return { searchParams, setSearchParams, options }
}
