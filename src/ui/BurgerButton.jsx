import styles from "./BurgerButton.module.scss"

export default function BurgerButton({ refBtn, isMenuActive, onClick }) {
  return (
    <button
      ref={refBtn}
      className={`${styles.menu_icon} ${isMenuActive ? styles.active : ""}`}
      onClick={onClick}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  )
}
