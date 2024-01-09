import { useState } from "react"
import { useGetUser } from "../hooks/useGetUser"

import Header from "./Header"
import Button from "./Button"

import collection from "/collection.png"
import question from "/question.png"

import styles from "./Intro.module.scss"

export default function Intro() {
  const [isLoginModalActive, setIsLoginModalActive] = useState(false)
  const [isSignUpModalActive, setIsSignUpModalActive] = useState(false)

  const user = useGetUser()

  return (
    <>
      <Header
        isLoginModalActive={isLoginModalActive}
        setIsLoginModalActive={setIsLoginModalActive}
        isSignUpModalActive={isSignUpModalActive}
        setIsSignUpModalActive={setIsSignUpModalActive}
      />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.title}>
            Welcome to &quot;Cozy Study&quot;! This app will help you to make
            the learning process more convenient, interesting and effective.
          </div>
          <div className={styles.subtitle}>
            The main idea of application is to provide an opportunity to create
            and use flash cards to remember information. Flash cards are small
            cards with questions or definitions written on one side and answers
            or explanations on the other side.
          </div>
          <ul>
            <li className={styles.two_columns}>
              <p>
                With our application, you can create your own collections of
                flash cards on any topic or subject on the{" "}
                <span>collections page</span>.
              </p>
              <img src={collection} />
            </li>
            <li className={styles.two_columns}>
              <p>
                On the <span>study page</span>, you can select one or more
                collections for training. The question that you don&apos;t know
                will be sent for repetition and will be available at the next
                training. If you are sure about the question, then it will be
                inactive for several days (
                <span>you can change quantity in settings</span>) or completed (
                <span>depends on card status</span>).
              </p>
              <img src={question} />
            </li>
            <li>
              <p className={styles.last_paragraph}>
                We also offer the opportunity to share your sets of flash cards
                with other users. You can upload your collections to our
                platform and download collections from other users on the
                <span> community page</span>. This will help you expand your
                knowledge and find new interesting topics to study.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
