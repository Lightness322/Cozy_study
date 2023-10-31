import { useNavigate } from "react-router-dom"

import { addEnding } from "../../utils/helpers"

import Button from "../../ui/Button"
import SortAndFilters from "../../ui/SortAndFilters"

import styles from "./SettingsStudy.module.scss"

export default function SettingsStudy({
  setIsReversed,
  options,
  searchParams,
  setSearchParams,
  selectedCollections,
}) {
  const navigate = useNavigate()

  const currentSort = searchParams.get("sort_by")

  const selectedQty = selectedCollections.length

  function handleStartStudy() {
    navigate(`/study/${selectedCollections.join("-")}`)
  }

  return (
    <div className={styles.settings_row}>
      <SortAndFilters
        options={options}
        currentSort={currentSort}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        setIsReversed={setIsReversed}
      />
      <div className={styles.quantity}>
        {addEnding(selectedQty, "collection") + " selected"}
      </div>
      <Button
        look="main"
        disabled={selectedQty === 0}
        onClick={handleStartStudy}
      >
        Start Study
      </Button>
    </div>
  )
}
