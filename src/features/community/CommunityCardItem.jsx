import { useState } from "react"

import { RiFileTextFill } from "react-icons/ri"
import Modal from "../../ui/Modal"
import Button from "../../ui/Button"

import styles from "./CommunityCardItem.module.scss"

export default function CommunityCardItem({ card }) {
  const [isModalActive, setIsModalActive] = useState()

  const { question, answer } = card

  function handleIsModalActive() {
    setIsModalActive((isActive) => !isActive)
  }

  return (
    <li className={styles.li}>
      <div className={styles.top_row}>
        <span style={{ opacity: `${answer ? "100" : "0"}` }}>
          <RiFileTextFill size={22} color="#297cbc" />
        </span>
      </div>
      <div className={styles.name}>{question}</div>
      <div className={styles.bottom_row}>
        <Button
          look="main"
          fontSize="1.4rem"
          onClick={() => setIsModalActive(true)}
          disabled={!answer}
        >
          Answer
        </Button>
      </div>
      <Modal
        isModalActive={isModalActive}
        handleIsModalActive={handleIsModalActive}
      >
        <div className={styles.answer_container}>
          <div className={styles.question}>{question}</div>
          <div className={styles.answer}>{answer}</div>
        </div>
      </Modal>
    </li>
  )
}
