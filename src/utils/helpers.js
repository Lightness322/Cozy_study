export function firstLetterToUpperCase(string) {
  return `${string.at(0).toUpperCase()}${string.slice(1)}`
}

export function daysFromMilliseconds(milliseconds) {
  return Math.floor(milliseconds / 1000 / 60 / 60 / 24)
}

export function addEnding(number, word) {
  if (number === 1) {
    return `${number} ${word}`
  } else {
    return `${number} ${word}s`
  }
}

export function getUniqueCategories(collections) {
  return Array.from(
    new Set(collections?.map((collection) => collection.category))
  ).filter((category) => category !== null)
}

export function getPropertiesOfCollections(collections) {
  const names = collections.map((collection) => collection.name)

  const cards = collections.reduce(
    (acc, collection) => [...acc, ...collection.cards],
    []
  )
  const notLearnedQty = collections.reduce(
    (acc, collection) => acc + collection.notLearnedQty,
    0
  )

  const learnedOneTimeQty = collections.reduce(
    (acc, collection) => acc + collection.learnedOneTimeQty,
    0
  )

  const learnedTwoTimesQty = collections.reduce(
    (acc, collection) => acc + collection.learnedTwoTimesQty,
    0
  )

  const totalCards = collections.reduce(
    (acc, collection) => acc + collection.totalCards,
    0
  )

  return {
    names,
    cards,
    notLearnedQty,
    learnedOneTimeQty,
    learnedTwoTimesQty,
    totalCards,
  }
}

export function getPropertiesOfCards(cards) {
  const totalCards = cards.length

  const notLearnedQty = cards.filter((card) => card.learnedTimes === 0).length

  const learnedOneTimeQty = cards.filter(
    (card) => card.learnedTimes === 1
  ).length

  const learnedTwoTimesQty = cards.filter(
    (card) => card.learnedTimes === 2
  ).length

  const activeCards = cards.filter((card) => card.isActive).length

  return {
    totalCards,
    notLearnedQty,
    learnedOneTimeQty,
    learnedTwoTimesQty,
    activeCards,
  }
}
