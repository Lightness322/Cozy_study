import { getPropertiesOfCards } from "../utils/helpers"
import supabase from "./supabase"

export async function deleteCard({ collectionId, cardId, cards }) {
  const newCards = cards.filter((card) => card.id !== cardId)

  const {
    totalCards,
    notLearnedQty,
    learnedOneTimeQty,
    learnedTwoTimesQty,
    activeCards,
  } = getPropertiesOfCards(newCards)

  const { data, error } = await supabase
    .from("collections")
    .update({
      totalCards,
      notLearnedQty,
      learnedOneTimeQty,
      learnedTwoTimesQty,
      activeCards,
      cards: newCards,
    })
    .eq("id", `${collectionId}`)
    .select()

  if (error) {
    console.log(error)
    throw new Error("There was an error with deleting card")
  }

  return data
}

export async function updateCardAndCollection({
  collectionId,
  newCard,
  cards,
}) {
  const cardId = newCard.id

  const newCards = cards.filter((card) => card.id !== cardId)

  newCards.push(newCard)

  const {
    totalCards,
    notLearnedQty,
    learnedOneTimeQty,
    learnedTwoTimesQty,
    activeCards,
  } = getPropertiesOfCards(newCards)

  const { data, error } = await supabase
    .from("collections")
    .update({
      cards: newCards,
      totalCards,
      activeCards,
      notLearnedQty,
      learnedOneTimeQty,
      learnedTwoTimesQty,
      isCompleted: false,
    })
    .eq("id", `${collectionId}`)
    .select()

  if (error) {
    console.log(error)
    throw new Error("There was an error with cards update")
  }

  return data
}

export async function updateWaitingCards({ collectionId, idToUpdate, cards }) {
  const newCards = cards.map((card) => {
    if (idToUpdate.includes(card.id)) {
      return {
        ...card,
        isActive: true,
        isWaiting: false,
        lastLearnedDate: null,
      }
    } else {
      return card
    }
  })

  const activeCards = [...newCards].filter(
    (card) => card.isActive === true
  ).length

  const { data, error } = await supabase
    .from("collections")
    .update({
      activeCards,
      cards: newCards,
    })
    .eq("id", `${collectionId}`)
    .select()

  if (error) {
    console.log(error)
    throw new Error("There was an error with cards update")
  }

  return data
}
