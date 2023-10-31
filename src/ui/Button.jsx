import styles from "./Button.module.scss"

export default function Button({
  onClick,
  children,
  look,
  type,
  fontSize = "1.8rem",
  fontWeight = "600",
  disabled = false,
}) {
  return (
    <button
      type={type ? type : undefined}
      style={{ fontSize, fontWeight }}
      className={`${styles.button} ${styles[look]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
