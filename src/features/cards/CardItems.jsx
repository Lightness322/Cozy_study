import { useState } from "react"
import { useParams } from "react-router-dom"

import { useGetCollections } from "../collections/useGetCollections"
import { useDeleteCard } from "./useDeleteCard"
import { useFilterCards } from "./useFilterCards"

import { sortAndFilterCards } from "../../utils/sortAndFilterCards"

import CardItem from "./CardItem"
import ItemsList from "../../ui/ItemsList"
import SettingsRow from "../../ui/SettingsRow"
import CollectionInfo from "../collections/CollectionInfo"
import Modal from "../../ui/Modal"
import FormAddCard from "./FormAddCard"
import NoneMessage from "../../ui/NoneMessage"
import Spinner from "../../ui/Spinner"

import styles from "./CardItems.module.scss"
import { getUniqueCategories } from "../../utils/helpers"

export default function CardItems() {
  const [isModalActive, setIsModalActive] = useState(false)
  const [isReversed, setIsReversed] = useState(false)
  const [isShowInfo, setIsShowInfo] = useState(false)

  const { collectionId } = useParams()

  const { collections, isLoadingGetting } = useGetCollections()

  const { deleteCard, isDeletingCard } = useDeleteCard()

  const { searchParams, setSearchParams, options } = useFilterCards()

  function handleShowInfo() {
    setIsShowInfo((isShow) => !isShow)
  }

  function handleIsModalActive() {
    setIsModalActive((isModalActive) => !isModalActive)
  }

  if (isLoadingGetting)
    return (
      <div>
        <Spinner />
      </div>
    )

  const collection = collections
    .filter((collection) => `${collection.id}` === `${collectionId}`)
    .at(0)

  const cards = collection.cards

  const uniqueCategories = getUniqueCategories(collections)

  //Filtration
  let sortedCards
  if (cards) {
    sortedCards = sortAndFilterCards(cards, isReversed, searchParams)
  }

  return (
    <>
      <SettingsRow
        isShowInfo={isShowInfo}
        handleShowInfo={handleShowInfo}
        collection={collection}
        setIsReversed={setIsReversed}
        handleIsModalActive={handleIsModalActive}
        options={options}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <div className={styles.container}>
        {isShowInfo && (
          <CollectionInfo
            collection={collection}
            uniqueCategories={uniqueCategories}
          />
        )}
        <div className={styles.content}>
          {sortedCards.length === 0 && (
            <NoneMessage>You have not added any cards yet</NoneMessage>
          )}
          <ItemsList>
            {sortedCards?.map((card) => (
              <CardItem
                card={card}
                key={card.id}
                deleteCard={deleteCard}
                isDeletingCard={isDeletingCard}
                cards={cards}
              />
            ))}
          </ItemsList>
          <Modal isModalActive={isModalActive}>
            <FormAddCard
              handleIsModalActive={handleIsModalActive}
              collectionId={collectionId}
              cards={cards}
            />
          </Modal>
        </div>
      </div>
    </>
  )
}
