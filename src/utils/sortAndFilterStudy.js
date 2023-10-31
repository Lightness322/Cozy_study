export function sortAndFilterStudy(data, isReversed, searchParams) {
  const sort_by = searchParams.get("sort_by")
  const category = searchParams.get("category")
  const search = searchParams.get("search")

  let sortedAndFilteredArray = [...data]

  if (category !== "all" && category !== null) {
    sortedAndFilteredArray = sortedAndFilteredArray.filter(
      (collection) => collection.category === category
    )
  }

  if (search !== null) {
    sortedAndFilteredArray = sortedAndFilteredArray.filter((collection) =>
      collection.name.toLowerCase().includes(search)
    )
  }

  if (sort_by === "download_date") {
    sortedAndFilteredArray.sort((a, b) =>
      new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime() ? -1 : 1
    )
  }

  if (sort_by === "name") {
    sortedAndFilteredArray.sort((a, b) => (a.name > b.name ? 1 : -1))
  }

  if (sort_by === "active_cards" || sort_by === null) {
    sortedAndFilteredArray.sort((a, b) =>
      a.activeCards > b.activeCards ? -1 : 1
    )
  }

  isReversed && sortedAndFilteredArray.reverse()

  return sortedAndFilteredArray
}
