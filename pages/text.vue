<template>
  <div
    class="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6"
  >
    <iframe
      src="https://metabase.fast.com.ph/public/dashboard/cc6c27ae-77cc-4a2c-a414-efaa4a195e2a?sitecode=FSC01"
      frameborder="0"
      class="w-screen h-screen"
      sandbox="allow-scripts allow-same-origin"
      aria-readonly="true"
    ></iframe>
  </div>
</template>

<script setup>
import { initFlowbite } from "flowbite";
import ApexCharts from "apexcharts";

// ApexCharts options and config
window.addEventListener("load", function () {
  let options = {
    chart: {
      height: "100%",
      maxWidth: "100%",
      type: "area",
      fontFamily: "Inter, sans-serif",
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#1C64F2",
        gradientToColors: ["#1C64F2"],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 6,
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: 0,
      },
    },
    series: [
      {
        name: "New users",
        data: [6500, 6418, 6456, 6526, 6356, 6456],
        color: "#1A56DB",
      },
    ],
    xaxis: {
      categories: [
        "01 February",
        "02 February",
        "03 February",
        "04 February",
        "05 February",
        "06 February",
        "07 February",
      ],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  };

  if (
    document.getElementById("area-chart") &&
    typeof ApexCharts !== "undefined"
  ) {
    const chart = new ApexCharts(
      document.getElementById("area-chart"),
      options
    );
    chart.render();
  }
});

onMounted(() => {
  initFlowbite();
});
</script>
