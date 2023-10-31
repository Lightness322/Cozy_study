import styles from "./NoneMessage.module.scss"

export default function NoneMessage({ children }) {
  return <div className={styles.message}>{children}</div>
}
