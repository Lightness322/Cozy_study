import styles from "./ProgressBar.module.scss"

export default function ProgressBar({ totalCards, learnedTwoTimesQty }) {
  const percentage =
    totalCards && Math.round((learnedTwoTimesQty / totalCards) * 100)

  return (
    <div className={styles.container}>
      <div
        className={styles.bar}
        style={{
          width: `${percentage}%`,
        }}
      ></div>
      <div className={styles.text}>{percentage} %</div>
    </div>
  )
}
