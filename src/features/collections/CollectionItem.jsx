import { useEffect, useState } from "react"

import { useUpdateCollection } from "./useUpdateCollection"
import { useCheckUpdate } from "./useCheckUpdate"

import { Link } from "react-router-dom"
import { TbTrashX } from "react-icons/tb"
import Modal from "../../ui/Modal"
import CollectionQuantityRow from "../../ui/CollectionQuantityRow"
import Button from "../../ui/Button"
import DeleteConfirm from "../../ui/DeleteConfirm"

import styles from "./CollectionItem.module.scss"

export default function CollectionItem({
  collection,
  deleteCollection,
  isDeleting,
  inactiveDays,
}) {
  const [isModalActive, setIsModalActive] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false)

  const { updateCollection } = useUpdateCollection()

  useCheckUpdate({
    collection,
    isUpdated,
    inactiveDays,
    setIsUpdated,
  })

  const {
    name,
    id: collectionId,
    activeCards,
    totalCards,
    learnedTwoTimesQty,
    isCompleted,
  } = collection

  useEffect(() => {
    if (!isCompleted && totalCards > 0 && learnedTwoTimesQty === totalCards) {
      updateCollection({ collection: { ...collection, isCompleted: true } })
    }
  }, [
    collectionId,
    totalCards,
    learnedTwoTimesQty,
    updateCollection,
    collection,
    isCompleted,
  ])

  function handleDeleteModalActive() {
    setIsModalActive((isActive) => !isActive)
  }

  return (
    <li
      className={`${styles.li} ${
        collection.isCompleted ? styles.completed : ""
      } ${collection.activeCards > 0 ? styles.active : ""}`}
    >
      <CollectionQuantityRow collection={collection} />
      <div className={styles.name}>{name}</div>
      <div className={styles.actions}>
        <div className={styles.edits}>
          <button onClick={() => setIsModalActive(true)}>
            <TbTrashX size={25} color="#DF004F" />
          </button>
          <Link to={`${collectionId}`}>
            <Button look="additional" fontSize="1.4rem" fontWeight="500">
              Edit
            </Button>
          </Link>
        </div>
        <Link to={`/study/${collectionId}`}>
          <Button
            disabled={activeCards === 0 ? true : false}
            look="main"
            fontSize="1.4rem"
            fontWeight="500"
          >
            Study ({activeCards})
          </Button>
        </Link>
      </div>
      <Modal small={true} isModalActive={isModalActive}>
        <DeleteConfirm
          deleteFn={deleteCollection}
          isDeleting={isDeleting}
          collectionId={collectionId}
          handleDeleteModalActive={handleDeleteModalActive}
        />
      </Modal>
    </li>
  )
}
