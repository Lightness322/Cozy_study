export function sortAndFilterPublicCollections(
  publicCollections,
  isReversed,
  searchParams,
  isByMe,
  userId
) {
  const sort_by = searchParams.get("sort_by")
  const search = searchParams.get("search")

  let sortedAndFilteredArray = isByMe
    ? [...publicCollections].filter(
        (publicCollection) => publicCollection.userId === userId
      )
    : [...publicCollections]

  if (search !== null) {
    sortedAndFilteredArray = sortedAndFilteredArray.filter((collection) =>
      collection.name.toLowerCase().includes(search)
    )
  }

  if (sort_by === "rating" || sort_by === null) {
    sortedAndFilteredArray.sort((a, b) =>
      a.ratingArr.length > b.ratingArr.length ? -1 : 1
    )
  }

  if (sort_by === "total_cards") {
    sortedAndFilteredArray.sort((a, b) =>
      a.totalCards > b.totalCards ? -1 : 1
    )
  }

  if (sort_by === "name") {
    sortedAndFilteredArray.sort((a, b) => (a.name > b.name ? 1 : -1))
  }

  if (sort_by === "download_date") {
    sortedAndFilteredArray.sort((a, b) =>
      new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime() ? -1 : 1
    )
  }

  isReversed && sortedAndFilteredArray.reverse()

  return sortedAndFilteredArray
}
