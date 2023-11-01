import { useState } from "react"

import { useGetUser } from "../../hooks/useGetUser"
import { useGetPublicCollections } from "./useGetPublicCollections"
import { useFilterPublicCollections } from "./useFilterPublicCollections"

import { sortAndFilterPublicCollections } from "../../utils/sortAndFilterPublicCollections"

import ItemsList from "../../ui/ItemsList"
import Spinner from "../../ui/Spinner"
import NoneMessage from "../../ui/NoneMessage"
import CommunityItem from "./CommunityItem"
import SettingsCommunity from "./SettingCommunity"

export default function CommunityItems() {
  const [isReversed, setIsReversed] = useState(false)
  const [isByMe, setIsByMe] = useState(false)

  const { userId } = useGetUser()

  const { publicCollections, isLoadingGetting, gettingError } =
    useGetPublicCollections()

  const { searchParams, setSearchParams, options } =
    useFilterPublicCollections()

  function handleIsByMe() {
    setIsByMe((isByMe) => !isByMe)
  }

  let sortedPublicCollections

  if (publicCollections) {
    sortedPublicCollections = sortAndFilterPublicCollections(
      publicCollections,
      isReversed,
      searchParams,
      isByMe,
      userId
    )
  }
  if (isLoadingGetting) return <Spinner />

  if (gettingError) return <div>{gettingError.message}</div>

  return (
    <div>
      <SettingsCommunity
        setIsReversed={setIsReversed}
        options={options}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        isByMe={isByMe}
        handleIsByMe={handleIsByMe}
      />
      {sortedPublicCollections.length === 0 && (
        <NoneMessage>
          There are no public collections available to add
        </NoneMessage>
      )}
      <ItemsList smallCard={true}>
        {sortedPublicCollections?.map((publicCollection) => (
          <CommunityItem
            key={publicCollection.id}
            publicCollection={publicCollection}
            userId={userId}
            isByMe={isByMe}
          />
        ))}
      </ItemsList>
    </div>
  )
}
