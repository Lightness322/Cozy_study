import { useState } from "react"
import { useDeletePublicCollection } from "./useDeletePublicCollection"

import { Link } from "react-router-dom"
import { TbCards, TbTrashX } from "react-icons/tb"
import Button from "../../ui/Button"
import Rating from "./Rating"
import Modal from "../../ui/Modal"
import DeleteConfirm from "../../ui/DeleteConfirm"

import styles from "./CommunityItem.module.scss"

export default function CommunityItem({ publicCollection, userId, isByMe }) {
  const [isModalActive, setIsModalActive] = useState(false)

  const { deleteCollection, isDeleting } = useDeletePublicCollection()

  const { name, id: publicCollectionId, cards, createdAt } = publicCollection

  function handleDeleteModalActive() {
    setIsModalActive((isActive) => !isActive)
  }

  const totalCards = cards.length

  return (
    <li className={styles.li}>
      <div className={styles.top_row}>
        <div className={styles.total}>
          <TbCards size={20} color="#297cbc" />
          &nbsp;<strong>{totalCards}</strong>
        </div>
        <div className={styles.date}>
          {new Date(createdAt).toLocaleDateString()}
        </div>
      </div>
      <div className={styles.name}>{name}</div>
      <div className={styles.actions}>
        {isByMe && (
          <button
            className={styles.delete}
            onClick={() => setIsModalActive(true)}
          >
            <TbTrashX size={25} color="#DF004F" />
          </button>
        )}
        <Link to={`/community/${publicCollectionId}`}>
          <Button look="main" fontSize="1.4rem" fontWeight="500">
            Open
          </Button>
        </Link>
        <Rating publicCollection={publicCollection} userId={userId} />
      </div>
      <Modal small={true} isModalActive={isModalActive}>
        <DeleteConfirm
          deleteFn={deleteCollection}
          isDeleting={isDeleting}
          collectionId={publicCollectionId}
          handleDeleteModalActive={handleDeleteModalActive}
        />
      </Modal>
    </li>
  )
}
