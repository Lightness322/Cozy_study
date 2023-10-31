import { useState } from "react"

import { useDeleteCollection } from "./useDeleteCollection"
import { useGetCollections } from "./useGetCollections"
import { useFilterCollections } from "./useFilterCollections"
import { useGetUser } from "../../hooks/useGetUser"

import { sortAndFilterCollections } from "../../utils/sortAndFilterCollections"

import CollectionItem from "./CollectionItem"
import Modal from "../../ui/Modal"
import SettingsRow from "../../ui/SettingsRow"
import ItemsList from "../../ui/ItemsList"
import Spinner from "../../ui/Spinner"
import FormAddCollection from "./FormAddCollection"
import NoneMessage from "../../ui/NoneMessage"
import { getUniqueCategories } from "../../utils/helpers"

export default function CollectionItems() {
  const [isModalActive, setIsModalActive] = useState(false)
  const [isReversed, setIsReversed] = useState(false)

  const { user } = useGetUser()

  const { collections, isLoadingGetting, gettingError } = useGetCollections()

  const { deleteCollection, isDeleting } = useDeleteCollection()

  const { searchParams, setSearchParams, options } =
    useFilterCollections(collections)

  const inactiveDays = Number(user.user_metadata.inactiveDays)

  function handleIsModalActive() {
    setIsModalActive((isModalActive) => !isModalActive)
  }

  //Filtration
  let sortedCollection

  if (collections) {
    sortedCollection = sortAndFilterCollections(
      collections,
      isReversed,
      searchParams
    )
  }
  if (isLoadingGetting) return <Spinner />

  if (gettingError) return <div>{gettingError.message}</div>

  const uniqueCategories = getUniqueCategories(collections)

  return (
    <div>
      <SettingsRow
        setIsReversed={setIsReversed}
        handleIsModalActive={handleIsModalActive}
        options={options}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      {sortedCollection.length === 0 &&
        (searchParams.get("status") === "completed" ? (
          <NoneMessage>You have not complete any collections yet</NoneMessage>
        ) : (
          <NoneMessage>You have not added any collections yet</NoneMessage>
        ))}
      <ItemsList>
        {sortedCollection?.map((collection) => (
          <CollectionItem
            key={collection.id}
            collection={collection}
            deleteCollection={deleteCollection}
            isDeleting={isDeleting}
            inactiveDays={inactiveDays}
          />
        ))}
      </ItemsList>
      <Modal
        isModalActive={isModalActive}
        handleIsModalActive={handleIsModalActive}
      >
        <FormAddCollection
          isModalActive={isModalActive}
          handleIsModalActive={handleIsModalActive}
          uniqueCategories={uniqueCategories}
        />
      </Modal>
    </div>
  )
}
