import React, { useEffect, useState } from 'react';
import { Alert, Spinner } from 'react-bootstrap'; // To show loading/error states
import { Line } from 'react-chartjs-2';
import axiosInstance from '../services/axiosInstance'; // 👈 use custom instance

const TrendsChartComponent = ({ month, category }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axiosInstance
      .get('/transactions/') // 👈 baseURL is already set
      .then((res) => {
        const transactions = res.data.filter((tx) => {
          const matchMonth = month ? tx.date.startsWith(month) : true;
          const matchCategory = category ? tx.category.id === parseInt(category) : true;
          return matchMonth && matchCategory;
        });

        const grouped = {};
        transactions.forEach((tx) => {
          const date = new Date(tx.date);
          const m = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          if (!grouped[m]) grouped[m] = { income: 0, expense: 0 };

          const amount = parseFloat(tx.amount);
          if (tx.category.is_income) {
            grouped[m].income += amount;
          } else {
            grouped[m].expense += amount;
          }
        });

        const labels = Object.keys(grouped).sort();
        const income = labels.map((m) => grouped[m].income);
        const expense = labels.map((m) => grouped[m].expense);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Income',
              data: income,
              fill: false,
              borderColor: 'green',
              tension: 0.3,
            },
            {
              label: 'Expense',
              data: expense,
              fill: false,
              borderColor: 'red',
              tension: 0.3,
            },
          ],
        });
      })
      .catch((err) => {
        console.error('Error loading transactions:', err);
        setError('Failed to load transaction data.');
      })
      .finally(() => setLoading(false));
  }, [month, category]);

  return (
    <div style={{ width: '100%', maxWidth: 800, margin: '40px auto' }}>
      <h3>Income & Expense Trends</h3>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" variant="primary" />
          <p className="ms-3">Loading chart data...</p>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : chartData ? (
        <Line data={chartData} />
      ) : (
        <p>No data available for the selected filters.</p>
      )}
    </div>
  );
};

export default TrendsChartComponent;
