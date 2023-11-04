import { useState } from "react"

import LearnedStatusIcon from "../../ui/LearnedStatusIcon"
import Button from "../../ui/Button"

import styles from "./TopRowCard.module.scss"

export default function TopRowCard({ card }) {
  const [isShowAnswer, setIsShowAnswer] = useState(false)

  const { answer, learnedTimes } = card

  const formatAnswerArr = answer.split("\n")

  return (
    <>
      <div className={styles.top_row}>
        {answer ? (
          <Button
            look="main"
            fontSize="1.5rem"
            onClick={() => setIsShowAnswer((isShow) => !isShow)}
          >
            {isShowAnswer ? "show question" : "show answer"}
          </Button>
        ) : (
          <div></div>
        )}
        <LearnedStatusIcon learnedTimes={learnedTimes} />
      </div>
      <div className={styles.text}>
        {isShowAnswer ? (
          formatAnswerArr.map((subString, index) => {
            if (index === formatAnswerArr.length - 1) {
              return <span key={index}>{subString}</span>
            }
            return (
              <span key={index}>
                {subString}
                <br />
              </span>
            )
          })
        ) : (
          <span className={styles.question}>{card.question}</span>
        )}
      </div>
    </>
  )
}
