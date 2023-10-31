import { useRef } from "react"
import { useMutation } from "@tanstack/react-query"

import { updatePublicCollection as updateHandler } from "../../services/apiPublicCollections"

import toast from "react-hot-toast"

export function useUpdateRating({
  publicCollectionId,
  ratingArr,
  userId,
  isLiked,
  setIsLiked,
}) {
  const { mutate: updateRating } = useMutation({
    mutationFn: updateHandler,
    onError: (error) => {
      console.log(error)
      toast.error("There was an error with rating updating")
    },
  })

  const rating = useRef(Array.from(new Set(ratingArr)).length)

  function handleUpdateRating() {
    if (isLiked) {
      rating.current -= 1
      updateRating({
        ratingArr: ratingArr.filter((id) => id !== userId),
        collectionId: publicCollectionId,
      })
      setIsLiked(false)
    } else {
      rating.current += 1
      updateRating({
        ratingArr: Array.from(new Set([...ratingArr, userId])),
        collectionId: publicCollectionId,
      })
      setIsLiked(true)
    }
  }

  return { handleUpdateRating, rating }
}
