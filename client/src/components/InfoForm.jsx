import { useSelector, useDispatch } from "react-redux";
import { setCustomerInfo, nextStep } from "../store/bookingSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";

const InfoForm = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const customerInfo = useSelector((state) => state.booking.customerInfo);

  const [fullName, setFullName] = useState(customerInfo.fullName);
  const [email, setEmail] = useState(customerInfo.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setCustomerInfo({ fullName, email }));
    dispatch(nextStep());
    navigate("/booking/service");
  };

  return (
    <Container className="py-5">
      <Card
        className="shadow-sm mx-auto"
        style={{ maxWidth: "500px", backgroundColor: "#FFF8F3" }}
      >
        <Card.Body className="p-4">
          <h2
            style={{ color: "#8B6F6F", fontWeight: "600" }}
            className="text-center mb-4"
          >
            Your Information
          </h2>
          <p style={{ color: "#C89595" }}>
            Step 1 of 4: Let's get to know you!
          </p>

          <Form onSubmit={handleSubmit}>
            {/* Full Name Input */}
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#8B6F6F" }}>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                size="lg"
                style={{
                  backgroundColor: "#F7ECE1",
                  border: "2px solid #E8B4B8",
                  borderRadius: "10px",
                }}
              />
            </Form.Group>

            {/* Email Input */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold" style={{ color: "#8B6F6F" }}>
                Email Address
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                size="lg"
                style={{
                  backgroundColor: "#F7ECE1",
                  border: "2px solid #E8B4B8",
                  borderRadius: "10px",
                }}
              />
              <Form.Text style={{ color: "#C89595" }}>
                We'll send your booking confirmation here ✨
              </Form.Text>
            </Form.Group>

            {/* Continue Button */}
            <Button
              type="submit"
              size="lg"
              className="w-100 border-0 fw-bold"
              style={{
                backgroundColor: "#E8B4B8",
                color: "#8B6F6F",
                borderRadius: "10px",
                padding: "12px",
                fontSize: "1.1rem",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#C89595";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#E8B4B8";
                e.target.style.transform = "translateY(0)";
              }}
            >
              Continue to Services →
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default InfoForm;
