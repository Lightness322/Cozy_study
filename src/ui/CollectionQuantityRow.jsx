import { TbCards, TbClockFilled } from "react-icons/tb"
import { PiCheckFatFill, PiCheckFatLight } from "react-icons/pi"

import styles from "./CollectionQuantityRow.module.scss"

export default function CollectionQuantityRow({ collection }) {
  const {
    totalCards,
    notLearnedQty,
    learnedOneTimeQty,
    learnedTwoTimesQty,
    cards,
  } = collection

  const isWaitingQty = cards
    ? cards.filter((card) => card.isWaiting === true).length
    : 0

  return (
    <div className={styles.quantity}>
      <div className={styles.total} title="total cards">
        <TbCards size={22} color="#297cbc" />
        &nbsp;<strong>{totalCards}</strong>
      </div>
      <div className={styles.check_column}>
        <p>
          <PiCheckFatFill size={22} color="green" />
          <PiCheckFatFill size={22} color="green" />
          &nbsp;<strong>{learnedTwoTimesQty}</strong>
        </p>
        <div className={styles.check_column_row}>
          <p>
            <PiCheckFatFill size={22} color="green" />
            &nbsp;<strong>{learnedOneTimeQty}</strong>
          </p>
          <p>
            <TbClockFilled size={22} color="#297cbc" />
            &nbsp;<strong>{isWaitingQty}</strong>
          </p>
        </div>
        <p>
          <PiCheckFatLight size={22} color="#808080" />
          &nbsp;<strong>{notLearnedQty}</strong>
        </p>
      </div>
    </div>
  )
}
