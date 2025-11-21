import { useSelector, useDispatch } from "react-redux";
import { resetBooking, previousStep } from "../store/bookingSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import {
  Container,
  Card,
  Button,
  ListGroup,
  Alert,
  Spinner,
} from "react-bootstrap";

function ConfirmationPage() {
  const booking = useSelector((state) => state.booking);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setErrorMessage("");
    setError("");

    try {
      const payload = {
        customerInfo: {
          fullName: booking.customerInfo.fullName,
          email: booking.customerInfo.email,
        },
        service: {
          serviceId: booking.selectedService.id,
          serviceName: booking.selectedService.name,
          servicePrice: booking.selectedService.price,
          serviceDuration: booking.selectedService.duration,
        },
        appointment: {
          date: booking.selectedDate,
          time: booking.selectedTime,
        },
      };

      if (booking.isEditing) {
        try {
          const response = await axios.put(
            `http://localhost:3000/bookings/manage/${booking.editToken}`,
            payload
          );
          alert("Your booking has been updated successfuly 💕");
          console.log(response);
        } catch (error) {
          console.log("Issure with service");
          console.error(error.message);
        }
      } else {
        try {
          const res = await axios.post(
            "http://localhost:3000/bookings",
            payload
          );
          console.log("Booking created successfully: ", res.data);
          alert("✨ Booking confirmed! Check your email for confirmation.");
        } catch (error) {
          console.error(error.message);
          const message =
            error.response?.data?.message || "Failed to create booking";
          setErrorMessage(message);
          // Scroll to top to show error
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }

      dispatch(resetBooking());
      navigate("/");
    } catch (error) {
      console.error("Booking failed:", error);
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    dispatch(previousStep());
    navigate("/booking/datetime");
  };

  const formattedDate = new Date(booking.selectedDate).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div
      style={{
        backgroundColor: "#FFF8F3",
        minHeight: "100vh",
        paddingBottom: "3rem",
      }}
    >
      {errorMessage && (
        <div
          style={{
            backgroundColor: "#fee",
            border: "1px solid #c00",
            padding: "15px",
            borderRadius: "5px",
            marginBottom: "20px",
            color: "#c00",
          }}
        >
          <strong>Error:</strong> {errorMessage}
        </div>
      )}
      <Container className="py-5">
        <div className="text-center mb-5">
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✨</div>
          <h2 style={{ color: "#8B6F6F", fontWeight: "600" }}>Almost There!</h2>
          <p style={{ color: "#C89595", fontSize: "1.1rem" }}>
            Step 4 of 4: Review and confirm your booking
          </p>
        </div>

        <Card
          className="shadow-lg mx-auto border-0"
          style={{
            maxWidth: "700px",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              backgroundColor: "#E8B4B8",
              padding: "2rem",
              textAlign: "center",
            }}
          >
            <h4
              className="mb-0"
              style={{ color: "#8B6F6F", fontWeight: "600" }}
            >
              💅 Your Booking Summary
            </h4>
          </div>

          <Card.Body className="p-5" style={{ backgroundColor: "#F7ECE1" }}>
            {/* Error Alert */}
            {error && (
              <Alert
                variant="danger"
                dismissible
                onClose={() => setError("")}
                style={{
                  borderRadius: "15px",
                  border: "none",
                }}
              >
                {error}
              </Alert>
            )}

            {/* Customer Information */}
            <div className="mb-4">
              <h5
                className="border-bottom pb-3 mb-3"
                style={{ color: "#8B6F6F", fontWeight: "600" }}
              >
                <i className="bi bi-person-fill me-2"></i>
                Customer Information
              </h5>
              <ListGroup variant="flush">
                <ListGroup.Item
                  className="d-flex justify-content-between border-0"
                  style={{
                    backgroundColor: "#FFF8F3",
                    borderRadius: "10px",
                    marginBottom: "0.5rem",
                    padding: "1rem",
                  }}
                >
                  <strong style={{ color: "#8B6F6F" }}>Full Name:</strong>
                  <span style={{ color: "#C89595" }}>
                    {booking.customerInfo.fullName}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item
                  className="d-flex justify-content-between border-0"
                  style={{
                    backgroundColor: "#FFF8F3",
                    borderRadius: "10px",
                    padding: "1rem",
                  }}
                >
                  <strong style={{ color: "#8B6F6F" }}>Email:</strong>
                  <span style={{ color: "#C89595" }}>
                    {booking.customerInfo.email}
                  </span>
                </ListGroup.Item>
              </ListGroup>
            </div>

            {/* Service Details */}
            <div className="mb-4">
              <h5
                className="border-bottom pb-3 mb-3"
                style={{ color: "#8B6F6F", fontWeight: "600" }}
              >
                <i className="bi bi-scissors me-2"></i>
                Service Details
              </h5>
              <ListGroup variant="flush">
                <ListGroup.Item
                  className="d-flex justify-content-between align-items-center border-0"
                  style={{
                    backgroundColor: "#FFF8F3",
                    borderRadius: "10px",
                    marginBottom: "0.5rem",
                    padding: "1rem",
                  }}
                >
                  <strong style={{ color: "#8B6F6F" }}>Service:</strong>
                  <span style={{ color: "#C89595", fontWeight: "500" }}>
                    {booking.selectedService?.name}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item
                  className="d-flex justify-content-between align-items-center border-0"
                  style={{
                    backgroundColor: "#FFF8F3",
                    borderRadius: "10px",
                    marginBottom: "0.5rem",
                    padding: "1rem",
                  }}
                >
                  <strong style={{ color: "#8B6F6F" }}>Duration:</strong>
                  <span
                    className="border-0"
                    style={{
                      backgroundColor: "#FFB6A3", // Peachy coral
                      color: "#FFFFFF",
                      fontSize: "0.9rem",
                      padding: "0.5rem 1rem",
                      borderRadius: "20px",
                      fontWeight: "600",
                      boxShadow: "0 2px 8px rgba(255, 182, 163, 0.3)",
                    }}
                  >
                    {booking.selectedService?.duration}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item
                  className="d-flex justify-content-between align-items-center border-0"
                  style={{
                    backgroundColor: "#FFF8F3",
                    borderRadius: "10px",
                    padding: "1rem",
                  }}
                >
                  <strong style={{ color: "#8B6F6F" }}>Price:</strong>
                  <span
                    className="border-0"
                    style={{
                      backgroundColor: "#FFB6A3", // Peachy coral
                      color: "#FFFFFF",
                      fontSize: "0.9rem",
                      padding: "0.5rem 1rem",
                      borderRadius: "20px",
                      fontWeight: "600",
                      boxShadow: "0 2px 8px rgba(255, 182, 163, 0.3)",
                    }}
                  >
                    ${booking.selectedService?.price}
                  </span>
                </ListGroup.Item>
              </ListGroup>
            </div>

            {/* Appointment Schedule */}
            <div className="mb-4">
              <h5
                className="border-bottom pb-3 mb-3"
                style={{ color: "#8B6F6F", fontWeight: "600" }}
              >
                <i className="bi bi-calendar-check me-2"></i>
                Appointment Schedule
              </h5>
              <ListGroup variant="flush">
                <ListGroup.Item
                  className="d-flex justify-content-between border-0"
                  style={{
                    backgroundColor: "#FFF8F3",
                    borderRadius: "10px",
                    marginBottom: "0.5rem",
                    padding: "1rem",
                  }}
                >
                  <strong style={{ color: "#8B6F6F" }}>Date:</strong>
                  <span style={{ color: "#C89595", fontWeight: "500" }}>
                    {formattedDate}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item
                  className="d-flex justify-content-between align-items-center border-0"
                  style={{
                    backgroundColor: "#FFF8F3",
                    borderRadius: "10px",
                    padding: "1rem",
                  }}
                >
                  <strong style={{ color: "#8B6F6F" }}>Time:</strong>
                  <span
                    className="border-0"
                    style={{
                      backgroundColor: "#E8B4B8",
                      color: "#8B6F6F",
                      fontSize: "1rem",
                      padding: "0.5rem 1rem",
                      borderRadius: "20px",
                      fontWeight: "600",
                    }}
                  >
                    {booking.selectedTime}
                  </span>
                </ListGroup.Item>
              </ListGroup>
            </div>

            {/* Important Notice */}
            <Alert
              className="mb-4 border-0"
              style={{
                backgroundColor: "#E8B4B8",
                color: "#8B6F6F",
                borderRadius: "15px",
              }}
            >
              <strong>💌 Please Note:</strong> A confirmation email will be sent
              to <strong>{booking.customerInfo.email}</strong>. Please arrive 5
              minutes early for your appointment!
            </Alert>

            {/* Action Buttons */}
            <div className="d-flex gap-3">
              <Button
                size="lg"
                onClick={handleBack}
                disabled={isSubmitting}
                className="border-0 fw-bold"
                style={{
                  backgroundColor: "#B8A5A5",
                  color: "#FFF8F3",
                  borderRadius: "10px",
                  padding: "12px 30px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.target.style.backgroundColor = "#8B6F6F";
                    e.target.style.transform = "translateY(-2px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.target.style.backgroundColor = "#B8A5A5";
                    e.target.style.transform = "translateY(0)";
                  }
                }}
              >
                ← Back
              </Button>
              <Button
                size="lg"
                className="flex-grow-1 border-0 fw-bold"
                onClick={handleConfirm}
                disabled={isSubmitting}
                style={{
                  backgroundColor: isSubmitting ? "#D3D3D3" : "#C89595",
                  color: "#FFF8F3",
                  borderRadius: "10px",
                  padding: "12px",
                  fontSize: "1.1rem",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.target.style.backgroundColor = "#8B6F6F";
                    e.target.style.transform = "translateY(-2px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.target.style.backgroundColor = "#C89595";
                    e.target.style.transform = "translateY(0)";
                  }
                }}
              >
                {isSubmitting ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      className="me-2"
                    />
                    Confirming Your Appointment...
                  </>
                ) : (
                  "✨ Confirm Booking"
                )}
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default ConfirmationPage;
