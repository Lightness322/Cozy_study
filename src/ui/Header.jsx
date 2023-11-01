import { useQuery } from "@tanstack/react-query"

import { getCurrentUser } from "../services/apiAuth"

import { NavLink } from "react-router-dom"
import Logo from "./Logo"
import User from "../features/user/User"
import Button from "./Button"
import Modal from "./Modal"
import LoginForm from "../features/authentication/LoginForm"
import SignupForm from "../features/authentication/SignupForm"

import styles from "./Header.module.scss"
import { useOutside } from "../hooks/useOutside"

export default function Header({
  isLoginModalActive,
  setIsLoginModalActive,
  isSignUpModalActive,
  setIsSignUpModalActive,
}) {
  const { refMenu, refBtn, isMenuActive, setIsMenuActive } = useOutside(false)

  const { data: user } = useQuery(["currentUser"], getCurrentUser)

  function handleLoginModal() {
    setIsLoginModalActive((isActive) => !isActive)
  }

  function handleSignupModal() {
    setIsSignUpModalActive((isActive) => !isActive)
  }

  function handleMenu() {
    setIsMenuActive((isActive) => !isActive)
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {user ? (
          <>
            <nav className={styles.nav}>
              <Logo />
              <button
                ref={refBtn}
                className={`${styles.menu_icon} ${
                  isMenuActive ? styles.active : ""
                }`}
                onClick={handleMenu}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
              <ul
                className={`${styles.ul} ${isMenuActive ? styles.active : ""}`}
                ref={refMenu}
              >
                <li onClick={handleMenu}>
                  <NavLink to="/collections">Collections</NavLink>
                </li>
                <li onClick={handleMenu}>
                  <NavLink to="/study">Study</NavLink>
                </li>
                <li onClick={handleMenu}>
                  <NavLink to="/community">Community</NavLink>
                </li>
              </ul>
            </nav>
            <User user={user} />
          </>
        ) : (
          <>
            <nav className={styles.nav}>
              <Logo />
              <ul
                className={styles.ul_buttons}
                style={{ justifyContent: "end" }}
              >
                <li>
                  <Button look="main" onClick={handleLoginModal}>
                    Login
                  </Button>
                </li>
                <li>
                  <Button look="additional" onClick={handleSignupModal}>
                    Sign Up
                  </Button>
                </li>
              </ul>
            </nav>
            <Modal
              isModalActive={isLoginModalActive}
              handleIsModalActive={() => {
                setIsLoginModalActive(false)
                setIsSignUpModalActive(false)
              }}
            >
              <LoginForm handleLoginModal={handleLoginModal} />
            </Modal>
            <Modal
              isModalActive={isSignUpModalActive}
              handleIsModalActive={() => {
                setIsLoginModalActive(false)
                setIsSignUpModalActive(false)
              }}
            >
              <SignupForm handleSignupModal={handleSignupModal} />
            </Modal>
          </>
        )}
      </div>
    </header>
  )
}
