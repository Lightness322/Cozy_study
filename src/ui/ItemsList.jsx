import styles from "./ItemsList.module.scss"

export default function ItemsList({ children, smallCard = false }) {
  return <ul className={smallCard ? styles.ul_small : styles.ul}>{children}</ul>
}
