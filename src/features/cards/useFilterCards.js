import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"

export function useFilterCards() {
  const [searchParams, setSearchParams] = useSearchParams()

  const options = {
    sort: [
      { value: "download_date", label: "Download date" },
      { value: "name", label: "Name" },
    ],
    status: [
      { value: "all", label: "All" },
      { value: "notLearned", label: "Not learned" },
      { value: "inLearning", label: "In learning" },
      { value: "inactive", label: "Inactive" },
      { value: "learned", label: "Learned" },
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
