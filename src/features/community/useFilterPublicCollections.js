import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"

export function useFilterPublicCollections() {
  const [searchParams, setSearchParams] = useSearchParams()

  const options = {
    sort: [
      { value: "rating", label: "Rating" },
      { value: "total_cards", label: "Total cards" },
      { value: "name", label: "Name" },
      { value: "download_date", label: "Download date" },
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
