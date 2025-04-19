import React from "react";
import { Form } from "react-bootstrap";

const Filters = ({
  month = "",
  setMonth = () => {},
  category = "",
  setCategory = () => {},
  categories = [],
  months = [],
}) => {
  return (
    <div>
      {/* Month Selector */}
      <Form.Group className="mb-3">
        <Form.Label>Month</Form.Label>
        <Form.Select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          <option value="">Select Month</option>
          {(months || []).map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {/* Category Selector */}
      <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {(categories || []).map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    </div>
  );
};

export default Filters;
