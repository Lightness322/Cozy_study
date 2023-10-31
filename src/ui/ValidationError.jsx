import styles from "./ValidationError.module.scss"

export default function ValidationError({ children }) {
  return <div className={styles.field}>{children}</div>
}
