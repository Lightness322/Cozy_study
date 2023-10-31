import { useState } from "react"

import { useUpdateRating } from "./useUpdateRating"

import { TbStar, TbStarFilled } from "react-icons/tb"

import styles from "./Rating.module.scss"

export default function Rating({ publicCollection, userId }) {
  const { id: publicCollectionId, ratingArr } = publicCollection

  const [isLiked, setIsLiked] = useState(ratingArr.includes(userId))

  const { handleUpdateRating, rating } = useUpdateRating({
    publicCollectionId,
    ratingArr,
    userId,
    isLiked,
    setIsLiked,
  })

  return (
    <div className={styles.rating}>
      <button className={styles.icon} onClick={handleUpdateRating}>
        {isLiked ? (
          <TbStarFilled size={20} color="#297cbc" />
        ) : (
          <TbStar size={20} color="#297cbc" />
        )}
      </button>
      <strong className={styles.number}>{rating.current}</strong>
    </div>
  )
}
