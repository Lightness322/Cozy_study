import { useState } from "react"

import { useAddPublicCollection } from "./useAddPublicCollection"

import { TbCards } from "react-icons/tb"
import { PiCheckFatFill, PiCheckFatLight } from "react-icons/pi"
import Modal from "../../ui/Modal"
import FormUpdateCollection from "./FormUpdateCollection"
import Button from "../../ui/Button"
import Spinner from "../../ui/Spinner"

import styles from "./CollectionInfo.module.scss"

export default function CollectionInfo({ collection, uniqueCategories }) {
  const [isModalActive, setIsModalActive] = useState(false)

  const { addPublicCollection, isAddingPublicCollection, userId } =
    useAddPublicCollection()

  const {
    name,
    description,
    category,
    cards,
    totalCards,
    notLearnedQty,
    learnedOneTimeQty,
    learnedTwoTimesQty,
  } = collection

  function handleIsModalActive() {
    setIsModalActive((isActive) => !isActive)
  }

  function handleAddPublicCollection() {
    addPublicCollection({
      name,
      description,
      totalCards,
      cards: cards.map((card) => {
        return { id: card.id, answer: card.answer, question: card.question }
      }),
      userId,
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.first_column}>
          <div>
            <span className={styles.parameter}>Category:</span>
            {category ? <span>{category}</span> : <span>&mdash;</span>}
          </div>
          <div>
            <span className={styles.parameter}>Description:</span>
            {description ? <span>{description}</span> : <span>&mdash;</span>}
          </div>
        </div>
        <div className={styles.second_column}>
          <div className={styles.row_parameter}>
            <span className={styles.icon}>
              <TbCards size={20} color="#297cbc" />
            </span>
            <span className={styles.parameter}>Total cards</span>
            <strong>{totalCards}</strong>
          </div>
          <div className={styles.row_parameter}>
            <span className={styles.icon}>
              <PiCheckFatLight size={20} color="#808080" />
            </span>
            <span className={styles.parameter}>Not learned</span>
            <strong>{notLearnedQty}</strong>
          </div>
          <div className={styles.row_parameter}>
            <span className={styles.icon}>
              <PiCheckFatFill size={20} color="green" />
            </span>
            <span className={styles.parameter}>In learning</span>
            <strong>{learnedOneTimeQty}</strong>
          </div>
          <div className={styles.row_parameter}>
            <span className={styles.icon}>
              <PiCheckFatFill size={20} color="green" />
              <PiCheckFatFill size={20} color="green" />
            </span>
            <span className={styles.parameter}>Learned</span>
            <strong>{learnedTwoTimesQty}</strong>
          </div>
        </div>
      </div>
      <div className={styles.edit}>
        <Button look="main" fontSize="1.6rem" onClick={handleIsModalActive}>
          Edit collection
        </Button>
      </div>
      <div className={styles.share}>
        <Button
          disabled={totalCards < 10}
          look="additional"
          fontSize="1.6rem"
          onClick={handleAddPublicCollection}
        >
          {isAddingPublicCollection ? (
            <Spinner inButton={true} />
          ) : (
            "Share with the community"
          )}
        </Button>
        {totalCards < 10 && (
          <div className={styles.notice}>
            The collection must contain
            <br />
            at least 10 cards
          </div>
        )}
      </div>
      <Modal
        isModalActive={isModalActive}
        handleIsModalActive={handleIsModalActive}
      >
        <FormUpdateCollection
          isModalActive={isModalActive}
          handleIsModalActive={handleIsModalActive}
          collection={collection}
          uniqueCategories={uniqueCategories}
        />
      </Modal>
    </div>
  )
}
