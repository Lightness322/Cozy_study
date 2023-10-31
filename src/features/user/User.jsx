import { useState } from "react"
import { useLogOut } from "./useLogOus"

import { RiLogoutBoxRFill, RiSettings4Fill } from "react-icons/ri"
import FormUserSetting from "./FormUserSetting"
import Modal from "../../ui/Modal"
import Button from "../../ui/Button"
import Spinner from "../../ui/Spinner"

import styles from "./User.module.scss"

export default function User({ user }) {
  const [isChangeable, setIsChangeable] = useState(false)
  const [isModalActive, setIsModalActive] = useState(false)
  const [isLogOutModalActive, setIsLogOutModalActive] = useState(false)

  const { handleLogOut, isLoggingOut } = useLogOut()

  const nickname = user.user_metadata.nickname

  function handleIsModalActive() {
    setIsModalActive((isActive) => !isActive)
    setIsChangeable(false)
  }

  function handleIsLogOutModalActive() {
    setIsLogOutModalActive((isActive) => !isActive)
  }

  return (
    <div className={styles.row}>
      <div className={styles.name}>{nickname}</div>
      <button className={styles.button} onClick={handleIsModalActive}>
        <RiSettings4Fill color="#297cbc" size={30} />
      </button>
      <button className={styles.button} onClick={handleIsLogOutModalActive}>
        <RiLogoutBoxRFill color="#297cbc" size={30} />
      </button>
      <Modal
        isModalActive={isModalActive}
        handleIsModalActive={handleIsModalActive}
      >
        <FormUserSetting
          isChangeable={isChangeable}
          setIsChangeable={setIsChangeable}
          isModalActive={isModalActive}
          handleIsModalActive={handleIsModalActive}
          user={user}
        />
      </Modal>
      <Modal small={true} isModalActive={isLogOutModalActive}>
        <div>
          <div className={styles.title}>Are you sure to log out?</div>
          <div className={styles.confirm}>
            <Button look="main" onClick={handleLogOut}>
              {isLoggingOut ? <Spinner inButton={true} /> : "Log out"}
            </Button>
            <Button look="back" onClick={handleIsLogOutModalActive}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
