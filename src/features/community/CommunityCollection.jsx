import { useState } from "react"
import { useParams } from "react-router-dom"

import { useGetPublicCollections } from "./useGetPublicCollections"

import ItemsList from "../../ui/ItemsList"
import CommunityCardItem from "./CommunityCardItem"
import Button from "../../ui/Button"
import Modal from "../../ui/Modal"
import FormAddCollectionFromCommunity from "./FormAddCollectionFromCommunity"
import Spinner from "../../ui/Spinner"

import styles from "./CommunityCollection.module.scss"

export default function CommunityCollection() {
  const [isModalActive, setIsModalActive] = useState(false)

  const { publicCollectionId } = useParams()

  const { publicCollections, isLoadingGetting, gettingError } =
    useGetPublicCollections()

  function handleIsModalActive() {
    setIsModalActive((isActive) => !isActive)
  }

  if (isLoadingGetting)
    return (
      <div>
        <Spinner />
      </div>
    )

  if (gettingError) return <div>{gettingError.message}</div>

  const publicCollection = publicCollections
    .filter(
      (publicCollection) => `${publicCollection.id}` === `${publicCollectionId}`
    )
    .at(0)

  const { name, description, cards, createdAt } = publicCollection

  return (
    <>
      <div className={styles.container}>
        <div className={styles.info}>
          <div className={styles.column}>
            <div className={styles.name}>{name}</div>
            <div className={styles.date}>
              Created: {new Date(createdAt).toLocaleDateString()}
            </div>
          </div>
          <div className={styles.description_block}>
            <span className={styles.title}>Description:</span>
            {description ? (
              <span className={styles.text}>{description}</span>
            ) : (
              <span>&mdash;</span>
            )}
          </div>
          <Button look="main" onClick={handleIsModalActive}>
            Add to collections
          </Button>
        </div>
        <ItemsList>
          {cards?.map((card) => (
            <CommunityCardItem key={card.id} card={card} />
          ))}
        </ItemsList>
        <Modal
          isModalActive={isModalActive}
          handleIsModalActive={handleIsModalActive}
        >
          <FormAddCollectionFromCommunity
            isModalActive={isModalActive}
            handleIsModalActive={handleIsModalActive}
            name={name}
            description={description}
            cards={cards}
          />
        </Modal>
      </div>
    </>
  )
}
