import { Pie } from "react-chartjs-2";

//internal import
import useAsync from "@/hooks/useAsync";
import OrderServices from "@/services/OrderServices";

const RevenueChart = () => {
  const { data } = useAsync(OrderServices.getBestSellerProductChart);

  const PieOption = {
    data: {
      datasets: [
        {
          data: data?.bestSellingProduct?.map((selling) => selling.count),
          backgroundColor: ["#10B981", "#3B82F6", "#F97316", "#0EA5E9"],
          label: "Dataset 1",
        },
      ],
      labels: data?.bestSellingProduct?.map((selling) => selling._id),
    },
    options: {
      responsive: true,
      cutoutPercentage: 80,
    },
    legend: {
      display: false,
    },
  };

  return (
    <div>
      <Pie {...PieOption} className="chart" />
    </div>
  );
};

export default RevenueChart;
