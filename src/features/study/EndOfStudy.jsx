import { useGetUser } from "../../hooks/useGetUser"

import { Link } from "react-router-dom"
import { PiCheckFatFill, PiCheckFatLight } from "react-icons/pi"
import { TbClockFilled } from "react-icons/tb"
import Button from "../../ui/Button"

import styles from "./EndOfStudy.module.scss"

export default function EndOfStudy({ toRepeat, toWaiting, toLearned }) {
  const { user } = useGetUser()

  const inactiveDays = +user.user_metadata.inactiveDays

  return (
    <div className={styles.container}>
      <h1>Training results</h1>
      <div className={styles.rows}>
        {toRepeat.current.length > 0 && (
          <div>
            <div className={styles.row}>
              <span className={styles.title}>
                These questions should be repeated:
              </span>
              <span className={styles.icon}>
                <PiCheckFatLight size={25} color="#808080" />
              </span>
            </div>
            <div className={styles.questions}>
              {toRepeat.current.map((question, index) => (
                <p key={index}>{question}</p>
              ))}
            </div>
          </div>
        )}
        {toWaiting.current.length > 0 && (
          <div>
            <div className={styles.row}>
              <span className={styles.title}>
                These questions will be inactive for {inactiveDays} days:
              </span>
              <span className={styles.icon}>
                <PiCheckFatFill size={25} color="green" />
                &nbsp;
                <TbClockFilled size={25} color="#297cbc" />
              </span>
            </div>
            <div className={styles.questions}>
              {toWaiting.current.map((question, index) => (
                <p key={index}>{question}</p>
              ))}
            </div>
          </div>
        )}
        {toLearned.current.length > 0 && (
          <div>
            <div className={styles.row}>
              <span className={styles.title}>
                These questions are completed:
              </span>
              <span className={styles.icon}>
                <PiCheckFatFill size={25} color="green" />
                <PiCheckFatFill size={25} color="green" />
              </span>
            </div>
            <div className={styles.questions}>
              {toLearned.current.map((question, index) => (
                <p key={index}>{question}</p>
              ))}
            </div>
          </div>
        )}
      </div>
      <Link to="/collections">
        <Button look="main">End study</Button>
      </Link>
    </div>
  )
}
