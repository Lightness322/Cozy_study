import { useReducer, useRef } from "react"
import { useNavigate } from "react-router-dom"

import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

import Modal from "../../ui/Modal"
import Buttons from "./Buttons"
import Button from "../../ui/Button"
import TopRowCard from "./TopRowCard"
import EndOfStudy from "./EndOfStudy"

import styles from "./CardsSwiper.module.scss"

function reducer(state, action) {
  if (action.type === "endStudy") {
    return {
      isModalActive: !state.isModalActive,
    }
  }
}

export default function CardsSwiper({ cards }) {
  const [{ isModalActive }, dispatch] = useReducer(reducer, {
    isModalActive: false,
  })

  const navigate = useNavigate()

  const activeCards = [...cards].filter((card) => card.isActive === true)

  const counter = useRef(0)
  const toRepeat = useRef([])
  const toWaiting = useRef([])
  const toLearned = useRef([])

  return (
    <div className={styles.container}>
      {!isModalActive && (
        <>
          <Swiper
            allowTouchMove={false}
            className={styles.swiper}
            slidesPerView={1}
            speed={350}
            keyboard={{
              enabled: true,
            }}
            pagination={{
              type: "fraction",
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
          >
            {activeCards.map((card) => (
              <SwiperSlide className={styles["swiper-slide"]} key={card.id}>
                <TopRowCard card={card} />
                <Buttons
                  collectionId={card.collectionId}
                  card={card}
                  activeCards={activeCards}
                  cards={cards}
                  counter={counter}
                  toRepeat={toRepeat}
                  toWaiting={toWaiting}
                  toLearned={toLearned}
                  dispatch={dispatch}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={styles.button}>
            <Button
              look="back"
              onClick={() => {
                if (
                  toRepeat.current.length === 0 &&
                  toWaiting.current.length === 0 &&
                  toLearned.current.length === 0
                ) {
                  navigate("/collections")
                } else {
                  dispatch({ type: "endStudy" })
                }
              }}
            >
              End study
            </Button>
          </div>
        </>
      )}
      <Modal isModalActive={isModalActive}>
        <EndOfStudy
          toRepeat={toRepeat}
          toWaiting={toWaiting}
          toLearned={toLearned}
        />
      </Modal>
    </div>
  )
}
