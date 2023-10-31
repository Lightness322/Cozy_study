import styles from "./StudyItem.module.scss"

export default function StudyItem({
  collection,
  selectedCollections,
  setSelectedCollections,
}) {
  const { name, id: collectionId, activeCards } = collection

  function handleSelect() {
    const indexOfId = selectedCollections.findIndex(
      (collection) => collection === collectionId
    )

    selectedCollections.includes(collectionId)
      ? setSelectedCollections((selectedCollections) =>
          selectedCollections.filter((collection, i) => i !== indexOfId)
        )
      : setSelectedCollections((selectedCollections) => [
          ...selectedCollections,
          collectionId,
        ])
  }

  return (
    <li
      className={`${styles.li} ${
        selectedCollections.includes(collectionId)
          ? styles.selected
          : styles.notSelected
      }`}
      onClick={handleSelect}
    >
      <div className={styles.name}>{name}</div>
      <div>
        <strong>({activeCards})</strong> cards to study
      </div>
    </li>
  )
}
