import SortAndFilters from "../../ui/SortAndFilters"

import styles from "./SettingsCommunity.module.scss"

export default function SettingsCommunity({
  setIsReversed,
  options,
  searchParams,
  setSearchParams,
  isByMe,
  handleIsByMe,
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
      >
        <div className={styles.filter}>
          <span>Published by me</span>
          <input type="checkbox" checked={isByMe} onChange={handleIsByMe} />
        </div>
      </SortAndFilters>
    </div>
  )
}
