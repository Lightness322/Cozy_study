import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function Diagram({
  notLearnedQty,
  learnedOneTimeQty,
  learnedTwoTimesQty,
}) {
  const data = {
    labels: [],
    datasets: [
      {
        label: "cards quantity",
        data: [notLearnedQty, learnedOneTimeQty, learnedTwoTimesQty],
        backgroundColor: ["#FF6384", "#FFCD56", "#4BC0C0"],
        borderWidth: 1,
      },
    ],
  }
  return <Pie data={data} />
}
