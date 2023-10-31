import { Link } from "react-router-dom"

import logo from "/logo.png"

import styles from "./Logo.module.scss"

export default function Logo() {
  return (
    <Link to="/intro">
      <img className={styles.img} src={logo} />
    </Link>
  )
}
