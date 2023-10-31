import Button from "./Button"
import Spinner from "./Spinner"

import styles from "./DeleteConfirm.module.scss"

export default function DeleteConfirm({
  deleteFn,
  isDeleting,
  collectionId,
  cardId,
  cards,
  handleDeleteModalActive,
}) {
  return (
    <div>
      <div className={styles.title}>Are you sure?</div>
      <div className={styles.row}>
        <Button
          look="main"
          onClick={() => {
            handleDeleteModalActive()
            deleteFn({ collectionId, cardId, cards })
          }}
        >
          {isDeleting ? <Spinner inButton={true} /> : "Delete"}
        </Button>
        <Button look="back" onClick={handleDeleteModalActive}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
