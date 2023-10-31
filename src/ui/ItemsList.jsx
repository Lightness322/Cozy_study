import styles from "./ItemsList.module.scss"

export default function ItemsList({ children }) {
  return <ul className={styles.ul}>{children}</ul>
}
