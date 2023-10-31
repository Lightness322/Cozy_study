import styles from "./Modal.module.scss"

export default function Modal({
  isModalActive,
  handleIsModalActive,
  children,
  small = false,
}) {
  return (
    <div
      className={`${styles.modal} ${isModalActive ? styles.active : ""}`}
      onClick={handleIsModalActive}
    >
      <div
        className={`${styles.content} ${small ? styles.small : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
