import useUtilsFunction from "@/hooks/useUtilsFunction";
import { useState } from "react";
import { Line } from "react-chartjs-2";

const SaleChart = ({ salesReport }) => {
  const { getNumberTwo } = useUtilsFunction();
  const [activeButton, setActiveButton] = useState({
    title: "Sales",
    color: "blue",
  });

  const handleClick = ({ title, color }) => {
    setActiveButton({ title, color });
  };

  const barOptions = {
    data: {
      labels: salesReport?.map((or) => or.date),
      datasets: [
        activeButton.title === "Sales"
          ? {
              label: "Sales",
              data: salesReport?.map((or) => getNumberTwo(or.total)),
              borderColor: "#3B82F6",
              backgroundColor: "#3B82F6",
              borderWidth: 3,
              yAxisID: "y",
            }
          : {
              label: "Order",
              data: salesReport?.map((or) => or.order),
              borderColor: "#F97316",
              backgroundColor: "#F97316",
              borderWidth: 3,
              yAxisID: "y",
            },
      ],
    },
    options: {
      responsive: true,
    },
    legend: {
      display: false,
    },
  };

  return (
    <>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-4">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <button
              onClick={() => handleClick({ title: "Sales", color: "blue" })}
              type="button"
              className={`inline-block p-2 rounded-t-lg border-b-2 border-transparent ${
                activeButton.title === "Sales"
                  ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                  : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }  focus:outline-none`}
            >
              Sales
            </button>
          </li>

          <li className="mr-2">
            <button
              onClick={() => handleClick({ title: "Orders", color: "red" })}
              type="button"
              className={`inline-block p-2 rounded-t-lg border-b-2 border-transparent ${
                activeButton.title === "Orders"
                  ? "text-orange-500 border-orange-500 dark:text-orange-500 dark:border-orange-500"
                  : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }  focus:outline-none`}
            >
              Orders
            </button>
          </li>
        </ul>
      </div>

      <Line {...barOptions} />
    </>
  );
};

export default SaleChart;
