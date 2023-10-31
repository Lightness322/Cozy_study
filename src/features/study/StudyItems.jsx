import { useState } from "react"

import { useGetCollections } from "../collections/useGetCollections"
import { useFilterStudy } from "./useFilterStudy"

import { sortAndFilterStudy } from "../../utils/sortAndFilterStudy"

import SettingsStudy from "./SettingsStudy"
import Spinner from "../../ui/Spinner"
import ItemsList from "../../ui/ItemsList"
import StudyItem from "./StudyItem"
import NoneMessage from "../../ui/NoneMessage"

export default function StudyItems() {
  const [selectedCollections, setSelectedCollections] = useState([])
  const [isReversed, setIsReversed] = useState(false)

  const { collections, isLoadingGetting, gettingError } = useGetCollections()

  const { searchParams, setSearchParams, options } = useFilterStudy(collections)

  //Filtration
  let sortedStudyItems

  if (collections) {
    sortedStudyItems = [...collections]?.filter(
      (collection) => collection.activeCards > 0
    )

    sortedStudyItems = sortAndFilterStudy(
      sortedStudyItems,
      isReversed,
      searchParams
    )
  }

  if (isLoadingGetting) return <Spinner />

  if (gettingError) return <div>{gettingError.message}</div>

  return (
    <div>
      <SettingsStudy
        setIsReversed={setIsReversed}
        options={options}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        selectedCollections={selectedCollections}
      />
      {sortedStudyItems.length === 0 && (
        <NoneMessage>There are no collections available for study</NoneMessage>
      )}
      <ItemsList length={collections.length}>
        {sortedStudyItems?.map((collection) => (
          <StudyItem
            key={collection.id}
            collection={collection}
            selectedCollections={selectedCollections}
            setSelectedCollections={setSelectedCollections}
          />
        ))}
      </ItemsList>
    </div>
  )
}
