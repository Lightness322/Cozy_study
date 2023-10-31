import { Outlet } from "react-router-dom"
import Header from "./Header"

import styles from "./AppLayout.module.scss"

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.container}>
        <Outlet />
      </div>
    </div>
  )
}
