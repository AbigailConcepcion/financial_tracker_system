import { motion } from 'framer-motion'; // Importing Framer Motion for animations
import React, { useContext } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext'; // Authentication context
import './Home.css'; // Importing CSS for the page

const Home = () => {
  // Accessing the user context to show personalized content
  const { user } = useContext(AuthContext);

  return (
    <Container fluid className="home-container py-5">
      {/* Animated heading */}
      <Row className="text-center">
        <Col>
          <motion.h1
            className="display-3 fw-bold text-primary mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Welcome to the Finance Tracker
          </motion.h1>

          <motion.p
            className="lead text-muted mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Track your expenses, set goals, and take control of your finances.
          </motion.p>

          {/* Welcome message based on user status */}
          {user ? (
            <motion.p
              className="fs-4 text-success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Hello, {user.username}! Let's manage your finances.
            </motion.p>
          ) : (
            <motion.p
              className="fs-4 text-warning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Please sign in to start tracking your finances.
            </motion.p>
          )}

          {/* Call to Action Button with Hover Effect */}
          <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <Button
              variant="primary"
              size="lg"
              href={user ? "/dashboard" : "/login"}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {user ? "Go to Dashboard" : "Login / Signup"}
            </Button>
          </motion.div>
        </Col>
      </Row>

      {/* Feature Cards with Hover Effect */}
      <motion.div
        className="mt-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <Row>
          <Col md={4}>
            <Card className="shadow-sm border-0 rounded">
              <Card.Body>
                <Card.Title className="h5">Track Your Income & Expenses</Card.Title>
                <Card.Text>
                  Get insights into your spending habits and track your income versus expenses with easy-to-understand charts.
                </Card.Text>
                <Button variant="link" href="/dashboard" className="p-0">
                  Learn More
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm border-0 rounded">
              <Card.Body>
                <Card.Title className="h5">Set & Achieve Your Goals</Card.Title>
                <Card.Text>
                  Create financial goals, track your progress, and stay motivated to save money for what matters most.
                </Card.Text>
                <Button variant="link" href="/dashboard" className="p-0">
                  Learn More
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm border-0 rounded">
              <Card.Body>
                <Card.Title className="h5">Insights & Reports</Card.Title>
                <Card.Text>
                  Dive deeper into your financial health with powerful reports and insights that show where you can improve.
                </Card.Text>
                <Button variant="link" href="/dashboard" className="p-0">
                  Learn More
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </motion.div>
    </Container>
  );
};

export default Home;
