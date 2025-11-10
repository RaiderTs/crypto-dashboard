"use client";

import { FC } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

import { ChartDataPoint, TimeRange } from "@/lib/types";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface CryptoChartProps {
  data: ChartDataPoint[];
  currencyName: string;
  lineColor: string;
  timeRange: TimeRange;
  theme: "light" | "dark";
}

const getXAxisFormats = (timeRange: TimeRange) => {
  switch (timeRange) {
    case "10m":
    case "30m":
    case "1h":
      return {
        tooltipFormat: "HH:mm:ss",
        labelFormat: "HH:mm",
      };
    case "1D":
      return {
        tooltipFormat: "dd MMM HH:mm",
        labelFormat: "HH:mm",
      };
    case "1M":
      return {
        tooltipFormat: "dd MMM yyyy",
        labelFormat: "dd MMM",
      };
    default:
      return {
        tooltipFormat: "dd MMM yyyy",
        labelFormat: "dd MMM",
      };
  }
};

const CryptoChart: FC<CryptoChartProps> = ({
  data,
  currencyName,
  lineColor,
  timeRange,
  theme,
}) => {
  const { tooltipFormat, labelFormat } = getXAxisFormats(timeRange);

  const series = [
    {
      name: currencyName,
      data: data,
    },
  ];

  const options: ApexOptions = {
    chart: {
      height: "100%",
      type: "area",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      foreColor: theme === "dark" ? "#a0a0a0" : "#6b7280",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: [lineColor],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
    grid: {
      borderColor: theme === "dark" ? "#2d2d2d" : "#e5e7eb",
      strokeDashArray: 3,
    },
    xaxis: {
      type: "datetime",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        format: labelFormat,
        style: {
          colors: theme === "dark" ? "#a0a0a0" : "#6b7280",
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => `$${Number(value).toLocaleString()}`,
        style: {
          colors: theme === "dark" ? "#a0a0a0" : "#6b7280",
        },
      },
    },
    tooltip: {
      theme: theme,
      x: {
        format: tooltipFormat,
      },
      y: {
        formatter: (value) => `$${Number(value).toLocaleString()}`,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
      markers: {
        fillColors: [lineColor],
      },
    },
  };

  return (
    <div className="w-full h-96 bg-surface p-4 rounded-xl shadow-2xl border border-border">
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height="100%"
      />
    </div>
  );
};

export default CryptoChart;
