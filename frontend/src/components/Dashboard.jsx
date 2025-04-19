import { motion } from "framer-motion";
import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import ChartComponent from "./ChartComponent";
import Filters from "./Filters";
import GoalProgress from "./GoalProgress";
import IncomeExpenseChart from "./IncomeExpenseChart";

const Dashboard = ({ filtersData, setFiltersData, categories, months }) => {
  // Safe default fallback in case filtersData is undefined
  const safeFilters = filtersData || { month: "", category: "" };

  return (
    <Container fluid className="py-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Goals Section */}
        <Row className="mb-4">
          <Col md={4} className="mb-4 mb-md-0">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-sm border-0 rounded">
                <Card.Body>
                  <Card.Title className="mb-3">Goals</Card.Title>
                  <GoalProgress progress={60} goalName="Save for Vacation" />
                  <GoalProgress progress={30} goalName="Emergency Fund" />
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          {/* Income vs Expense Chart */}
          <Col md={8}>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-sm border-0 rounded">
                <Card.Body>
                  <Card.Title className="mb-3">Income vs Expense</Card.Title>
                  <IncomeExpenseChart
                    data={{
                      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
                      income: [500, 700, 800, 600, 750],
                      expense: [300, 450, 500, 350, 400],
                    }}
                  />
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>

        {/* Filters and Trend Chart Section */}
        <Row>
          <Col md={4} className="mb-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-sm border-0 rounded">
                <Card.Body>
                  <Card.Title className="mb-3">Filters</Card.Title>
                  <Filters
                    month={safeFilters.month}
                    setMonth={(value) =>
                      setFiltersData({ ...safeFilters, month: value })
                    }
                    category={safeFilters.category}
                    setCategory={(value) =>
                      setFiltersData({ ...safeFilters, category: value })
                    }
                    categories={categories}
                    months={months}
                  />
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          <Col md={8}>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-sm border-0 rounded">
                <Card.Body>
                  <Card.Title className="mb-3">Monthly Trend</Card.Title>
                  <ChartComponent />
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </motion.div>
    </Container>
  );
};

export default Dashboard;
