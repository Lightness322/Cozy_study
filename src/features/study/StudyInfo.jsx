import { useState } from "react"

import { useGetStudyCollections } from "./useGetStudyCollections"

import { getPropertiesOfCollections } from "../../utils/helpers"

import Diagram from "../../ui/Diagram"
import Button from "../../ui/Button"
import CardsSwiper from "./CardsSwiper"

import styles from "./StudyInfo.module.scss"

export default function StudyInfo() {
  const [isStudying, setIsStudying] = useState(false)

  const { collections } = useGetStudyCollections()

  const {
    names,
    cards,
    notLearnedQty,
    learnedOneTimeQty,
    learnedTwoTimesQty,
    totalCards,
  } = getPropertiesOfCollections(collections)

  function handleStudying() {
    setIsStudying((isStudying) => !isStudying)
  }

  return (
    <div className={styles.container}>
      {isStudying ? (
        <CardsSwiper cards={cards} />
      ) : (
        <>
          <div className={styles.row}>
            <div className={styles.names}>
              {names.map((name, i) => (
                <h2 key={i}>{name}</h2>
              ))}
            </div>
            <div className={styles.diagram_container}>
              <Diagram
                notLearnedQty={notLearnedQty}
                learnedOneTimeQty={learnedOneTimeQty}
                learnedTwoTimesQty={learnedTwoTimesQty}
              />
            </div>
            <div className={styles.column}>
              <p>
                Total cards<span>{totalCards}</span>
              </p>
              <p className={styles.not_learned}>
                Not Learned<span>{notLearnedQty}</span>
              </p>
              <p className={styles.one_learned}>
                Learned Once<span>{learnedOneTimeQty}</span>
              </p>
              <p className={styles.two_learned}>
                Completed<span>{learnedTwoTimesQty}</span>
              </p>
            </div>
          </div>
          <div className={styles.button}>
            <Button look="main" onClick={handleStudying}>
              Start study
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
