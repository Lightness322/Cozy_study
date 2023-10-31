import { PiCheckFatFill, PiCheckFatLight } from "react-icons/pi"

export default function LearnedStatusIcon({ learnedTimes }) {
  return (
    <div>
      {learnedTimes === 0 && <PiCheckFatLight size="25" color="#808080" />}
      {learnedTimes === 1 && <PiCheckFatFill size="25" color="green" />}
      {learnedTimes === 2 && (
        <>
          <PiCheckFatFill size="25" color="green" />
          <PiCheckFatFill size="25" color="green" />
        </>
      )}
    </div>
  )
}
