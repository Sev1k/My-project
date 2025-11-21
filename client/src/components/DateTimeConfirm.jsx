import { useDispatch, useSelector } from "react-redux";
import { setDateTime, nextStep, previousStep } from "../store/bookingSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Form,
  Button,
  Card,
  Row,
  Col,
  Alert,
} from "react-bootstrap";

function DateTimeConfirm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedDate, selectedTime, selectedService } = useSelector(
    (state) => state.booking
  );

  const [date, setDate] = useState(selectedDate);
  const [time, setTime] = useState(selectedTime);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  const today = new Date().toISOString().split("T")[0];

  const handleContinue = () => {
    if (date && time) {
      dispatch(setDateTime({ date, time }));
      dispatch(nextStep());
      navigate("/booking/confirmation");
    }
  };

  const handleBack = () => {
    dispatch(previousStep());
    navigate("/booking/service");
  };

  useEffect(() => {
    if (date) {
      fetchSlots(date);
    }
  }, [date]);

  const fetchSlots = async (date) => {
    setLoading(true);
    setError("");
    setTime("");
    try {
      const res = await axios.get("http://localhost:3000/bookings/available", {
        params: { date: date, serviceDuration: selectedService?.duration },
      });
      console.log("Backend response:", res.data);

      setAvailableSlots(res.data.slots);
    } catch (error) {
      console.error("Error fetching slots:", error);
      setError(
        error.response?.data?.message ||
          "Unable to load available times. Please try again."
      );
      setAvailableSlots([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (date && selectedService) {
      fetchSlots(date);
    }
  }, [date, selectedService]);

  console.log("Current state - loading:", loading);
  console.log("Current state - availableSlots:", availableSlots);
  console.log("Current state - error:", error);

  return (
    <div
      style={{
        backgroundColor: "#FFF8F3",
        minHeight: "100vh",
        paddingBottom: "3rem",
      }}
    >
      <Container className="py-5">
        <div className="text-center mb-5">
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📅</div>
          <h2 style={{ color: "#8B6F6F", fontWeight: "600" }}>
            Pick Your Perfect Time
          </h2>
          <p style={{ color: "#C89595", fontSize: "1.1rem" }}>
            Step 3 of 4: When would you like to visit us?
          </p>
        </div>

        <Card
          className="shadow-lg mx-auto border-0"
          style={{
            maxWidth: "700px",
            backgroundColor: "#F7ECE1",
            borderRadius: "20px",
          }}
        >
          <Card.Body className="p-5">
            {/* Service Info */}
            {selectedService && (
              <Alert
                className="mb-4 border-0"
                style={{
                  backgroundColor: "#E8B4B8",
                  color: "#8B6F6F",
                  borderRadius: "15px",
                }}
              >
                <div className="d-flex align-items-center gap-2">
                  <span style={{ fontSize: "1.5rem" }}>
                    {selectedService.emoji || "💅"}
                  </span>
                  <div>
                    <strong style={{ fontSize: "1.1rem" }}>
                      {selectedService.name}
                    </strong>
                    <div style={{ color: "black" }}>
                      Duration: {selectedService.duration} • $
                      {selectedService.price}
                    </div>
                  </div>
                </div>
              </Alert>
            )}

            {/* Date Picker */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold h5" style={{ color: "#8B6F6F" }}>
                📆 Select Date
              </Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => {
                  const selected = new Date(e.target.value);
                  const day = selected.getDay(); // 0=Sun, 6=Sat

                  if (day === 5) {
                    alert(
                      "Saturdays are not available. Please choose another day."
                    );
                    return; // Do NOT set date
                  }

                  setDate(e.target.value);
                }}
                min={today}
                required
                size="lg"
                style={{
                  backgroundColor: "#FFF8F3",
                  border: "2px solid #E8B4B8",
                  borderRadius: "10px",
                  color: "#8B6F6F",
                }}
              />
              <Form.Text style={{ color: "#C89595" }}>
                Choose any available date starting from today
              </Form.Text>
            </Form.Group>
            {/* {Error } */}
            {error && (
              <Alert variant="danger" className="mb-3">
                {error}
              </Alert>
            )}
            {/* Time Picker */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold h5" style={{ color: "#8B6F6F" }}>
                🕐 Select Time
              </Form.Label>
              <Row className="g-3">
                {loading ? (
                  <Col xs={12} className="text-center">
                    <div style={{ color: "#8B6F6F" }}>
                      Loading available times...
                    </div>
                  </Col>
                ) : availableSlots.length > 0 ? (
                  availableSlots.map((slot) => (
                    <Col key={slot} xs={6} sm={4}>
                      <Button
                        className="w-100 border-0 fw-bold"
                        size="lg"
                        onClick={() => setTime(slot)}
                        style={{
                          backgroundColor:
                            time === slot ? "#C89595" : "#FFF8F3",
                          color: time === slot ? "#FFF8F3" : "#8B6F6F",
                          border:
                            time === slot
                              ? "2px solid #C89595"
                              : "2px solid #E8B4B8",
                          borderRadius: "10px",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          if (time !== slot) {
                            e.target.style.backgroundColor = "#E8B4B8";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (time !== slot) {
                            e.target.style.backgroundColor = "#FFF8F3";
                          }
                        }}
                      >
                        {time === slot && "✓ "}
                        {slot}
                      </Button>
                    </Col>
                  ))
                ) : (
                  <Col xs={12} className="text-center">
                    <Alert variant="warning">
                      No available slots for this date. Please select another
                      date.
                    </Alert>
                  </Col>
                )}
              </Row>
              <Form.Text style={{ color: "#C89595" }}>
                Select your preferred appointment time
              </Form.Text>
            </Form.Group>

            {/* Selected Summary */}
            {date && time && (
              <Alert
                className="mb-4 border-0"
                style={{
                  backgroundColor: "#B8A5A5",
                  color: "#FFF8F3",
                  borderRadius: "15px",
                }}
              >
                <strong style={{ fontSize: "1.1rem" }}>
                  ✨ Your Selection:
                </strong>
                <div className="mt-2">
                  {new Date(date + "T00:00:00").toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  at {time}
                </div>
              </Alert>
            )}

            {/* Navigation Buttons */}
            <div className="d-flex gap-3">
              <Button
                size="lg"
                onClick={handleBack}
                className="border-0 fw-bold"
                style={{
                  backgroundColor: "#B8A5A5",
                  color: "#FFF8F3",
                  borderRadius: "10px",
                  padding: "12px 30px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#8B6F6F";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#B8A5A5";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                ← Back
              </Button>
              <Button
                size="lg"
                className="flex-grow-1 border-0 fw-bold"
                onClick={handleContinue}
                disabled={!date || !time}
                style={{
                  backgroundColor: date && time ? "#E8B4B8" : "#D3D3D3",
                  color: date && time ? "#8B6F6F" : "#999",
                  borderRadius: "10px",
                  padding: "12px",
                  fontSize: "1.1rem",
                  transition: "all 0.3s ease",
                  cursor: date && time ? "pointer" : "not-allowed",
                }}
                onMouseEnter={(e) => {
                  if (date && time) {
                    e.target.style.backgroundColor = "#C89595";
                    e.target.style.transform = "translateY(-2px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (date && time) {
                    e.target.style.backgroundColor = "#E8B4B8";
                    e.target.style.transform = "translateY(0)";
                  }
                }}
              >
                Continue to Confirmation →
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default DateTimeConfirm;
