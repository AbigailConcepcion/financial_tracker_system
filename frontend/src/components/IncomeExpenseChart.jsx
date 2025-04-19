import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import { Bar } from "react-chartjs-2";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const IncomeExpenseChart = ({ data }) => {
  const isLoading =
    !data || !data.labels || !data.income || !data.expense;

  if (isLoading) {
    return (
      <Card className="shadow border-0 rounded-3 mb-4">
        <Card.Body className="d-flex flex-column align-items-center justify-content-center py-5">
          <Card.Title className="fs-5 fw-bold mb-3 text-primary">
            Income vs Expense
          </Card.Title>
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading chart data...</span>
          </Spinner>
          <div className="text-muted mt-2">Loading chart data...</div>
        </Card.Body>
      </Card>
    );
  }

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Income",
        data: data.income,
        backgroundColor: "#4caf50",
        borderRadius: 4,
      },
      {
        label: "Expense",
        data: data.expense,
        backgroundColor: "#f44336",
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#333",
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#555",
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#555",
        },
        grid: {
          color: "#eee",
        },
      },
    },
  };

  return (
    <Card className="shadow border-0 rounded-3 mb-4">
      <Card.Body>
        <Card.Title className="fs-5 fw-bold mb-4 text-primary">
          Income vs Expense
        </Card.Title>
        <Row>
          <Col>
            <div className="bg-white p-3 rounded shadow-sm">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default IncomeExpenseChart;
