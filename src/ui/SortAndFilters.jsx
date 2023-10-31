import { useState } from "react"

import { firstLetterToUpperCase } from "../utils/helpers"

import { MdExpandCircleDown } from "react-icons/md"
import { TbArrowsUpDown } from "react-icons/tb"

import styles from "./SortAndFilters.module.scss"

export default function SortAndFilters({
  options,
  currentSort,
  searchParams,
  setSearchParams,
  setIsReversed,
  children,
}) {
  const [isShowFilters, setIsShowFilters] = useState(false)

  function handleShowInfo() {
    setIsShowFilters((isShow) => !isShow)
  }

  return (
    <>
      <div className={styles.filter_button}>
        <span>Filter settings</span>
        <button
          className={`${styles.button} ${isShowFilters ? styles.active : ""}`}
          onClick={handleShowInfo}
        >
          <MdExpandCircleDown size={20} color="#297cbc" />
        </button>
      </div>
      <div
        className={`${styles.settings_column} ${
          isShowFilters ? styles.active : ""
        }`}
      >
        <div className={styles.sort_row}>
          <label>
            <span>Sort by</span>
            <span className={styles.select_wrapper}>
              <select
                name="filter"
                defaultValue={
                  options.sort
                    .filter((option) => option.value === currentSort)
                    .at(0)?.value
                }
                onChange={(e) => {
                  const params = e.target.value
                  searchParams.set("sort_by", params)
                  setSearchParams(searchParams)
                  setIsReversed(false)
                }}
              >
                {options.sort.map((option) => (
                  <option key={option.label} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </span>
            <button
              className={styles.reverse_button}
              onClick={() => {
                setIsReversed((isReversed) => !isReversed)
              }}
            >
              <TbArrowsUpDown size={20} color="#297cbc" />
            </button>
          </label>
          {options?.categories && (
            <label>
              <span>Category</span>
              <span className={styles.select_wrapper}>
                <select
                  name="category"
                  defaultValue={options.categories
                    .filter(
                      (category) => category === searchParams.get("category")
                    )
                    .at(0)}
                  onChange={(e) => {
                    const params = e.target.value.toLowerCase()
                    searchParams.set("category", params)
                    setSearchParams(searchParams)
                  }}
                >
                  {options.categories.map((category) => {
                    if (category !== null) {
                      return (
                        <option value={category} key={category}>
                          {firstLetterToUpperCase(category)}
                        </option>
                      )
                    }
                  })}
                </select>
              </span>
            </label>
          )}
          {options?.status && (
            <label>
              <span>Status</span>
              <span className={styles.select_wrapper}>
                <select
                  name="filter"
                  defaultValue={
                    options.status
                      .filter(
                        (option) => option.value === searchParams.get("status")
                      )
                      .at(0)?.value || "all"
                  }
                  onChange={(e) => {
                    const params = e.target.value.toLowerCase()
                    searchParams.set("status", params)
                    setSearchParams(searchParams)
                  }}
                >
                  {options.status.map((status) => (
                    <option value={status.value} key={status.label}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </span>
            </label>
          )}
        </div>
        <input
          className={styles.select}
          type="search"
          name="search"
          placeholder="search..."
          defaultValue={searchParams.get("search")}
          onChange={(e) => {
            const params = e.target.value.toLowerCase()
            searchParams.set("search", params)
            setSearchParams(searchParams)
          }}
        />
        {children}
      </div>
    </>
  )
}
