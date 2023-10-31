export function useNextSlice({
  collectionId,
  card,
  cards,
  activeCards,
  counter,
  toRepeat,
  toWaiting,
  toLearned,
  dispatch,
  swiper,
  updateCard,
}) {
  const { question, learnedTimes } = card

  const cardsOfCollection = cards.filter(
    (card) => card.collectionId === collectionId
  )

  function handleSlideRepeat() {
    if (learnedTimes === 0 || learnedTimes === 1)
      toRepeat.current.push(question)
    counter.current += 1
    swiper.slideNext()

    if (counter.current > activeCards.length - 1) {
      dispatch({ type: "endStudy" })
    }
  }

  function handleSlideConfirm() {
    if (learnedTimes === 0) toWaiting.current.push(question)
    if (learnedTimes === 1) toLearned.current.push(question)
    counter.current += 1
    swiper.slideNext()

    if (counter.current > activeCards.length - 1) {
      dispatch({ type: "endStudy" })
    }

    if (learnedTimes === 0) {
      card.isActive = false
      card.isWaiting = true
      card.learnedTimes = 1
      card.lastLearnedDate = new Date()
    }

    if (learnedTimes === 1) {
      card.isActive = false
      card.isWaiting = false
      card.learnedTimes = 2
      card.lastLearnedDate = null
    }

    updateCard({ collectionId, newCard: card, cards: cardsOfCollection })
  }

  return { handleSlideRepeat, handleSlideConfirm }
}
