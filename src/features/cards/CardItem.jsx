import { useState } from "react"
import { useParams } from "react-router-dom"

import { RiFileTextFill } from "react-icons/ri"
import { TbClockFilled, TbTrashX } from "react-icons/tb"
import LearnedStatusIcon from "../../ui/LearnedStatusIcon"
import Button from "../../ui/Button"
import Modal from "../../ui/Modal"
import DeleteConfirm from "../../ui/DeleteConfirm"
import UpdateCardForm from "./UpdateCardForm"

import styles from "./CardItem.module.scss"

export default function CardItem({ card, deleteCard, isDeletingCard, cards }) {
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false)
  const [isUpdateModalActive, setIsUpdateModalActive] = useState(false)

  const { collectionId } = useParams()

  const { question, answer, id: cardId, learnedTimes, isWaiting } = card

  function handleDeleteModalActive() {
    setIsDeleteModalActive((isActive) => !isActive)
  }

  function handleUpdateModalActive() {
    setIsUpdateModalActive((isActive) => !isActive)
  }

  return (
    <li className={styles.li}>
      <div className={styles.top_row}>
        <span style={{ opacity: `${answer ? "100" : "0"}` }}>
          <RiFileTextFill size={22} color="#297cbc" />
        </span>
        <div>
          <LearnedStatusIcon learnedTimes={learnedTimes} />
          <span style={{ opacity: `${isWaiting ? "100" : "0"}` }}>
            <TbClockFilled size={22} color="#297cbc" />
          </span>
        </div>
      </div>
      <div className={styles.name}>{question}</div>
      <div className={styles.bottom_row}>
        <button onClick={() => setIsDeleteModalActive(true)}>
          <TbTrashX size={25} color="#DF004F" />
        </button>
        <Button
          look="main"
          fontSize="1.6rem"
          onClick={() => setIsUpdateModalActive(true)}
        >
          Edit
        </Button>
      </div>
      <Modal small={true} isModalActive={isDeleteModalActive}>
        <DeleteConfirm
          deleteFn={deleteCard}
          isDeleting={isDeletingCard}
          collectionId={collectionId}
          cardId={cardId}
          cards={cards}
          handleDeleteModalActive={handleDeleteModalActive}
        />
      </Modal>
      <Modal small={true} isModalActive={isUpdateModalActive}>
        <UpdateCardForm
          isUpdateModalActive={isUpdateModalActive}
          handleUpdateModalActive={handleUpdateModalActive}
          collectionId={collectionId}
          card={card}
          cards={cards}
        />
      </Modal>
    </li>
  )
}
