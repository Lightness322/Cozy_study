import { useEffect, useRef, useState } from "react"

export function useOutside(initialValue) {
  const [isMenuActive, setIsMenuActive] = useState(initialValue)

  const refMenu = useRef(null)
  const refBtn = useRef(null)

  function handleClickOutside(e) {
    if (refBtn.current && refBtn.current.contains(e.target)) {
      return null
    }
    if (refMenu.current && !refMenu.current.contains(e.target)) {
      setIsMenuActive(false)
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true)

    return () => document.removeEventListener("click", handleClickOutside, true)
  }, [])

  return { refMenu, refBtn, isMenuActive, setIsMenuActive }
}
