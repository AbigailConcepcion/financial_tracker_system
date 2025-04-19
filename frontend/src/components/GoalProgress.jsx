import React, { useState } from "react";
import { Button, Card, Col, Modal, ProgressBar, Row } from "react-bootstrap";

const GoalProgress = ({ progress, goalName }) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  return (
    <>
      <Card className="shadow-sm border-0 rounded-3 bg-white mb-4">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={8}>
              <Card.Title className="mb-2 fw-semibold fs-5">{goalName}</Card.Title>
              <ProgressBar
                now={progress}
                label={`${progress}%`}
                className="rounded-pill"
                variant={progress >= 80 ? "success" : "info"}
              />
            </Col>
            <Col md={4} className="text-md-end mt-3 mt-md-0">
              <Button variant="outline-primary" size="sm" onClick={handleModalShow}>
                View Details
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Modal */}
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>{goalName} Progress</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-2">You're currently at <strong>{progress}%</strong> of your goal.</p>
          <p>Keep saving consistently to reach your target! Set milestones, track spending, and stay focused.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GoalProgress;
