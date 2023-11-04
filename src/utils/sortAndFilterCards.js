export function sortAndFilterCards(cards, isReversed, searchParams) {
  const sort_by = searchParams.get("sort_by")
  const search = searchParams.get("search")
  const status = searchParams.get("status")

  let sortedAndFilteredArray = [...cards]

  if (status === "all" || status === null) {
    sortedAndFilteredArray = [...cards]
  }

  if (status === "notlearned") {
    sortedAndFilteredArray = sortedAndFilteredArray.filter(
      (card) => card.learnedTimes === 0
    )
  }

  if (status === "inactive") {
    sortedAndFilteredArray = sortedAndFilteredArray.filter(
      (card) => card.isWaiting === true
    )
  }

  if (status === "inlearning") {
    sortedAndFilteredArray = sortedAndFilteredArray.filter(
      (card) => card.learnedTimes === 1
    )
  }

  if (status === "learned") {
    sortedAndFilteredArray = sortedAndFilteredArray.filter(
      (card) => card.learnedTimes === 2
    )
  }

  if (search !== null) {
    sortedAndFilteredArray = sortedAndFilteredArray.filter((card) =>
      card.question.toLowerCase().includes(search)
    )
  }

  if (sort_by === "name" || sort_by === null) {
    sortedAndFilteredArray.sort((a, b) => (a.question > b.question ? 1 : -1))
  }

  if (sort_by === "download_date") {
    sortedAndFilteredArray.sort((a, b) =>
      new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime() ? -1 : 1
    )
  }

  isReversed && sortedAndFilteredArray.reverse()

  return sortedAndFilteredArray
}
