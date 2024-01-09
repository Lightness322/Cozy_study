export function sortAndFilterCollections(
  collections,
  isReversed,
  searchParams
) {
  const sort_by = searchParams.get("sort_by")
  const category = searchParams.get("category")
  const search = searchParams.get("search")
  const status = searchParams.get("status")

  let sortedAndFilteredArray = [...collections]

  if ((category !== "all" || status === null) && category !== null) {
    sortedAndFilteredArray = sortedAndFilteredArray.filter(
      (collection) =>
        collection.category.toLowerCase() === category.toLowerCase()
    )
  }

  if (category === "all") {
    sortedAndFilteredArray = [...collections]
  }

  if (status === "active") {
    sortedAndFilteredArray = sortedAndFilteredArray.filter(
      (collection) => collection.activeCards > 0
    )
  }

  if (status === "completed") {
    sortedAndFilteredArray = sortedAndFilteredArray.filter(
      (collection) => collection.isCompleted === true
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

  if (sort_by === "total_cards") {
    sortedAndFilteredArray.sort((a, b) =>
      a.totalCards > b.totalCards ? -1 : 1
    )
  }

  if (sort_by === "active_cards" || sort_by === null) {
    sortedAndFilteredArray.sort((a, b) =>
      a.activeCards > b.activeCards ? -1 : 1
    )
  }

  isReversed && sortedAndFilteredArray.reverse()

  return sortedAndFilteredArray
}
