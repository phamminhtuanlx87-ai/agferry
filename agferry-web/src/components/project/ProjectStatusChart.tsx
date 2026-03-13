import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

export default function ProjectStatusChart() {

  const series = [24, 12, 12, 8];

  const options: ApexOptions = {
    chart: {
      type: "donut",
      height: 320,
    },

    labels: [
      "Hoàn thành",
      "Đang thi công",
      "Đang quyết toán",
      "Dự toán",
    ],

    colors: ["#059669", "#334155", "#f97316", "#f59e0b"],

    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Tổng",
              formatter: () => "48 C.Trình",
            },
          },
        },
      },
    },

    legend: {
      position: "bottom",
    },
  };

  return (
    <div>
      <Chart options={options} series={series} type="donut" height={320} />
    </div>
  );
}