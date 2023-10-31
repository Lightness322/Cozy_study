import { MdExpandCircleDown } from "react-icons/md"
import Button from "../ui/Button"
import ProgressBar from "./ProgressBar"
import SortAndFilters from "./SortAndFilters"

import styles from "./SettingsRow.module.scss"

export default function SettingsRow({
  collection,
  isShowInfo,
  handleShowInfo,
  setIsReversed,
  handleIsModalActive,
  options,
  searchParams,
  setSearchParams,
}) {
  const currentSort = searchParams.get("sort_by")

  return (
    <div className={styles.settings_row}>
      <SortAndFilters
        options={options}
        currentSort={currentSort}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        setIsReversed={setIsReversed}
      />
      {!options?.categories && (
        <div className={styles.settings_column}>
          <div className={styles.name_row}>
            <span className={styles.name}>{collection.name}</span>
            <button
              className={`${styles.button} ${isShowInfo ? styles.active : ""}`}
              onClick={handleShowInfo}
            >
              <MdExpandCircleDown size={20} color="#297cbc" />
            </button>
          </div>
          <ProgressBar
            totalCards={collection.totalCards}
            learnedTwoTimesQty={collection.learnedTwoTimesQty}
          />
        </div>
      )}
      <Button look="main" onClick={handleIsModalActive}>
        {options?.categories ? "Create collection" : "Create card"}
      </Button>
    </div>
  )
}
