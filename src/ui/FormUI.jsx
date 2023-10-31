import styles from "./FormUI.module.scss"

export default function FormUI({ onSubmit, children }) {
  return (
    <form noValidate className={styles.form} tabIndex={0} onSubmit={onSubmit}>
      {children}
    </form>
  )
}
