import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap"; // Import Row and Col
import Dashboard from "../components/Dashboard";
import Filters from "../components/Filters";
import GoalProgress from "../components/GoalProgress";
import IncomeExpenseChart from "../components/IncomeExpenseChart";
import TrendsChartComponent from "../components/TrendsChart";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../services/axiosInstance"; // Custom Axios instance

const DashboardPage = () => {
  const { token, user, logout, isLoading, error } = useAuth();
  const [month, setMonth] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [months, setMonths] = useState([]);

  useEffect(() => {
    if (token) {
      axiosInstance
        .get("/categories/")
        .then((res) => setCategories(res.data))
        .catch((err) => console.error("Error fetching categories:", err));

      axiosInstance
        .get("/transactions/")
        .then((res) => {
          const allMonths = [...new Set(res.data.map((tx) => tx.month))];
          setMonths(allMonths);
        })
        .catch((err) => console.error("Error fetching transactions:", err));
    }
  }, [token]);

  return (
    <Container fluid>
      <motion.h1
        className="fw-bold text-primary mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Finance Dashboard
      </motion.h1>

      {/* Display Error Message */}
      {error && <div className="alert alert-danger">{error}</div>}

      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>Loading data...</p>
        </div>
      ) : (
        <>
          <Filters
            month={month}
            setMonth={setMonth}
            category={category}
            setCategory={setCategory}
            categories={categories}
            months={months}
          />

          <Row className="gy-4 my-3">
            <Col md={6} lg={4}>
              <div className="p-3 bg-white rounded shadow-sm">
                <h5 className="mb-3">Monthly Goals</h5>
                <GoalProgress token={token} month={month} category={category} />
              </div>
            </Col>
            <Col md={6} lg={4}>
              <div className="p-3 bg-white rounded shadow-sm">
                <h5 className="mb-3">Income vs Expense</h5>
                <IncomeExpenseChart token={token} month={month} category={category} />
              </div>
            </Col>
            <Col md={6} lg={4}>
              <div className="p-3 bg-white rounded shadow-sm">
                <h5 className="mb-3">Trends</h5>
                <TrendsChartComponent token={token} month={month} category={category} />
              </div>
            </Col>
          </Row>

          <div className="p-3 bg-white rounded shadow-sm mt-4">
            <h5 className="mb-3">Transactions Overview</h5>
            <Dashboard token={token} month={month} category={category} />
          </div>
        </>
      )}

      <Button variant="danger" onClick={logout}>Logout</Button>
    </Container>
  );
};

export default DashboardPage;
