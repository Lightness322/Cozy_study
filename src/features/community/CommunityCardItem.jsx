import { useState } from "react"

import { RiFileTextFill } from "react-icons/ri"
import Modal from "../../ui/Modal"
import Button from "../../ui/Button"

import styles from "./CommunityCardItem.module.scss"

export default function CommunityCardItem({ card }) {
  const [isModalActive, setIsModalActive] = useState()

  const { question, answer } = card

  const formatAnswerArr = answer.split("\n")

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
        {answer ? (
          <Button
            look="main"
            fontSize="1.4rem"
            onClick={() => setIsModalActive(true)}
          >
            Answer
          </Button>
        ) : (
          <div style={{ opacity: `${answer ? "100" : "0"}` }}>_</div>
        )}
      </div>
      <Modal
        isModalActive={isModalActive}
        handleIsModalActive={handleIsModalActive}
      >
        <div className={styles.answer_container}>
          <div className={styles.question}>{question}</div>
          <div className={styles.answer}>
            {formatAnswerArr.map((subString, index) => {
              if (index === formatAnswerArr.length - 1) {
                return <span key={index}>{subString}</span>
              }
              return (
                <span key={index}>
                  {subString}
                  <br />
                </span>
              )
            })}
          </div>
          <Button look="main" onClick={handleIsModalActive}>
            Close
          </Button>
        </div>
      </Modal>
    </li>
  )
}
