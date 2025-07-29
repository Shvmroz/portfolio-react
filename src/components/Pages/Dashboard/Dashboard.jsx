import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
} from "@mui/material";
import { Icon } from "@iconify/react";
import Chart from "react-apexcharts";
import { salesData, chartData } from "../../../data/dummyData";

const StatCard = ({ title, value, growth, icon, color }) => (
  <Card sx={{ backgroundColor: `${color}.soft` }}>
    <CardContent>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography color="textSecondary" gutterBottom variant="body2">
            {title}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            {value}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Icon
              icon="material-symbols:trending-up"
              style={{ fontSize: 16, color: "#4CAF50", marginRight: 4 }}
            />
            <Typography variant="caption" color="success.main">
              +{growth}%
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 60,
            height: 60,
            borderRadius: "50%",
            backgroundColor: `${color}.light`,
            color: `${color}.main`,
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const [period, setPeriod] = useState("daily");

  const handlePeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setPeriod(newPeriod);
    }
  };

  const currentData = salesData[period];

  const revenueChartOptions = {
    chart: {
      type: "area",
      height: 350,
      toolbar: { show: false },
    },
    colors: ["#EB5E28"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.1,
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    xaxis: {
      categories: chartData.revenue.categories,
    },
    yaxis: {
      labels: {
        formatter: (value) => `Rs ${value.toLocaleString()}`,
      },
    },
    tooltip: {
      y: {
        formatter: (value) => `Rs ${value.toLocaleString()}`,
      },
    },
  };

  const ordersChartOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: true },
    },
    colors: ["#C04410"],
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: "20%",
      },
    },
    dataLabels: {
      enabled: false,  // <-- hides the text on bars
    },
    xaxis: {
      categories: chartData.orders.categories,
    },
    yaxis: {
      labels: {
        formatter: (value) => Math.round(value),
      },
    },
    responsive: [
      {
        breakpoint: 960,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "50%", 
            },
          },
        },
      },
    ],
  };
  

  const topProductsChartOptions = {
    chart: {
      type: "donut",
      height: 350,
    },
    // colors: ["#8E24AA", "#E91E63", "#00ACC1", "#4CAF50", "#FF9800"],
    colors: ["#FFD6B0", "#FFA873", "#FF7A3D", "#EB5E28", "#B93D0F"],
    labels: chartData.topProducts.map((product) => product.name),
    legend: {
      position: "bottom",
    },
    tooltip: {
      y: {
        formatter: (value) => `${value} sales`,
      },
    },
  };

  return (
    <Box sx={{ width: "100vw", maxWidth: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Dashboard
        </Typography>

        <ToggleButtonGroup
          value={period}
          exclusive
          onChange={handlePeriodChange}
          size="small"
        >
          <ToggleButton value="daily">Daily</ToggleButton>
          <ToggleButton value="weekly">Weekly</ToggleButton>
          <ToggleButton value="monthly">Monthly</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Stats Cards */}
      <div className="row mb-md-3">
        <div className="col-xs-12 col-md-6 col-lg-3 mb-2">
          <StatCard
            title="Revenue"
            value={`Rs ${currentData.revenue.toLocaleString()}`}
            growth={currentData.growth}
            icon={
              <Icon
                icon="material-symbols:attach-money"
                width={30}
                height={30}
              />
            }
            color="primary"
          />
        </div>
        <div className="col-xs-12 col-md-6 col-lg-3 mb-2">
          <StatCard
            title="Orders"
            value={currentData.orders}
            growth={currentData.growth}
            icon={
              <Icon
                icon="material-symbols:shopping-cart"
                width={30}
                height={30}
              />
            }
            color="info"
          />
        </div>
        <div className="col-xs-12 col-md-6 col-lg-3 mb-2">
          <StatCard
            title="Customers"
            value={currentData.customers}
            growth={currentData.growth}
            icon={<Icon icon="pepicons-print:people" width={30} height={30} />}
            color="success"
          />
        </div>
        <div className="col-xs-12 col-md-6 col-lg-3 mb-2">
          <StatCard
            title="Growth"
            value={`${currentData.growth}%`}
            growth={currentData.growth}
            icon={
              <Icon
                icon="material-symbols:trending-up"
                width={30}
                height={30}
              />
            }
            color="warning"
          />
        </div>
      </div>

      {/* Charts */}
      <div className="row">
        <div className="col-12 col-lg-8 mb-4">
          <Paper
            sx={{
              p: { xs: 1, md: 3 },
              borderRadius: 2,
              width: "100%",
              height: "100%",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Revenue Trend
            </Typography>
            <Chart
              options={revenueChartOptions}
              series={chartData.revenue.series}
              type="area"
              height={350}
            />
          </Paper>
        </div>

        <div className="col-12 col-lg-4 mb-4">
          <Paper
            sx={{
              p: { xs: 1, md: 3 },
              borderRadius: 2,
              width: "100%",
              height: "100%",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Top Products
            </Typography>
            <Chart
              options={topProductsChartOptions}
              series={chartData.topProducts.map((product) => product.sales)}
              type="donut"
              height={350}
            />
          </Paper>
        </div>

        <div className="col-12 mb-3">
          <Paper sx={{ p: { xs: 1, md: 3 }, borderRadius: 2, width: "100%" }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Orders Overview
            </Typography>
            <Chart
              options={ordersChartOptions}
              series={chartData.orders.series}
              type="bar"
              height={350}
            />
          </Paper>
        </div>
      </div>
    </Box>
  );
};

export default Dashboard;
