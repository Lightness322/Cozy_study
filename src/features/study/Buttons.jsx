import { useSwiper } from "swiper/react"

import { useUpdateCardAndCollection } from "./useUpdateCardAndCollection"
import { useNextSlide } from "./useNextSlide"

import Button from "../../ui/Button"

import styles from "./Buttons.module.scss"

export default function Buttons({ ...props }) {
  const swiper = useSwiper()

  const { updateCard } = useUpdateCardAndCollection({})

  const { handleSlideRepeat, handleSlideConfirm } = useNextSlide({
    ...props,
    swiper,
    updateCard,
  })

  return (
    <div className={styles.buttons}>
      <div className={styles.element}>
        <Button look="additional" onClick={handleSlideRepeat}>
          Repeat
        </Button>
      </div>
      <div className={styles.element}>
        <Button look="main" onClick={handleSlideConfirm}>
          I know it!
        </Button>
      </div>
    </div>
  )
}
