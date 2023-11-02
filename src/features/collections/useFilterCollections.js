import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"

import { getUniqueCategories } from "../../utils/helpers"

export function useFilterCollections(collections) {
  const [searchParams, setSearchParams] = useSearchParams()

  const uniqueCategories = getUniqueCategories(collections)

  const options = {
    sort: [
      { value: "active_cards", label: "Active cards" },
      { value: "total_cards", label: "Total cards" },
      { value: "name", label: "Title" },
      { value: "download_date", label: "Download date" },
    ],
    categories: ["all", ...uniqueCategories],
    status: [
      { value: "all", label: "All" },
      { value: "active", label: "Active" },
      { value: "completed", label: "Completed" },
    ],
  }

  useEffect(() => {
    if (searchParams.get("search") === "") {
      searchParams.delete("search")
      setSearchParams(searchParams)
    }
  }, [searchParams, setSearchParams])

  return { searchParams, setSearchParams, options }
}
