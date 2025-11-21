import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedService,
  nextStep,
  previousStep,
} from "../store/bookingSlice";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button, Row, Col, Badge } from "react-bootstrap";

function ServicesSelection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get currently selected service from Redux
  const selectedService = useSelector((state) => state.booking.selectedService);

  // List of services
  const services = [
    {
      id: 1,
      name: "Classic Manicure",
      price: 70,
      duration: "45 min",
      description: "Traditional nail care and polish",
    },
    {
      id: 2,
      name: "Gel Manicure",
      price: 100,
      duration: "60 min",
      description: "Long-lasting gel polish",
    },
    {
      id: 3,
      name: "Classic Pedicure",
      price: 70,
      duration: "45 min",
      description: "Relaxing foot care treatment",
    },
    {
      id: 4,
      name: "Full Set Acrylic",
      price: 120,
      duration: "90 min",
      description: "Complete acrylic nail application",
    },
    {
      id: 5,
      name: "Nail Art",
      price: 140,
      duration: "60 min",
      description: "Creative custom nail designs",
    },
  ];

  const handleServiceSelect = (service) => {
    dispatch(setSelectedService(service));
  };

  const handleContinue = () => {
    if (selectedService) {
      dispatch(nextStep());
      navigate("/booking/datetime");
    }
  };

  const handleBack = () => {
    dispatch(previousStep());
    navigate("/booking/info");
  };

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
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>💆‍♀️</div>
          <h2 style={{ color: "#8B6F6F", fontWeight: "600" }}>
            Choose Your Perfect Service
          </h2>
          <p style={{ color: "#C89595", fontSize: "1.1rem" }}>
            Step 2 of 4: Select the treatment you desire
          </p>
        </div>

        {/* Services Grid */}
        <Row className="g-4 mb-5">
          {services.map((service) => (
            <Col key={service.id} xs={12} md={6} lg={4}>
              <Card
                className={`h-100 border-0 shadow-sm ${
                  selectedService?.id === service.id ? "shadow-lg" : ""
                }`}
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    selectedService?.id === service.id ? "#E8B4B8" : "#F7ECE1",
                  border:
                    selectedService?.id === service.id
                      ? "3px solid #C89595"
                      : "3px solid transparent",
                  borderRadius: "15px",
                  transition: "all 0.3s ease",
                  transform:
                    selectedService?.id === service.id
                      ? "translateY(-5px)"
                      : "translateY(0)",
                }}
                onClick={() => handleServiceSelect(service)}
                onMouseEnter={(e) => {
                  if (selectedService?.id !== service.id) {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.backgroundColor = "#FFF8F3";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedService?.id !== service.id) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.backgroundColor = "#F7ECE1";
                  }
                }}
              >
                <Card.Body className="d-flex flex-column p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                        {service.emoji}
                      </div>
                      <Card.Title
                        className="mb-0"
                        style={{
                          color:
                            selectedService?.id === service.id
                              ? "#8B6F6F"
                              : "#8B6F6F",
                          fontWeight: "600",
                        }}
                      >
                        {service.name}
                      </Card.Title>
                    </div>
                    {selectedService?.id === service.id && (
                      <Badge
                        style={{
                          backgroundColor: "#C89595",
                          color: "#FFF8F3",
                          fontSize: "0.85rem",
                          padding: "0.5rem 0.8rem",
                          borderRadius: "20px",
                        }}
                      >
                        ✓ Selected
                      </Badge>
                    )}
                  </div>

                  <Card.Text
                    className="flex-grow-1 mb-3"
                    style={{ color: "#8B6F6F" }}
                  >
                    {service.description}
                  </Card.Text>

                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <span style={{ color: "#C89595", fontWeight: "500" }}>
                      <i className="bi bi-clock"></i> {service.duration}
                    </span>
                    <span
                      className="h5 mb-0 fw-bold"
                      style={{ color: "#8B6F6F" }}
                    >
                      ${service.price}
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Navigation Buttons */}
        <div
          className="d-flex justify-content-between align-items-center gap-3"
          style={{ maxWidth: "700px", margin: "0 auto" }}
        >
          <Button
            size="lg"
            className="border-0 fw-bold"
            onClick={handleBack}
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
            onClick={handleContinue}
            disabled={!selectedService}
            className="flex-grow-1 border-0 fw-bold"
            style={{
              backgroundColor: selectedService ? "#E8B4B8" : "#D3D3D3",
              color: selectedService ? "#8B6F6F" : "#999",
              borderRadius: "10px",
              padding: "12px",
              fontSize: "1.1rem",
              transition: "all 0.3s ease",
              cursor: selectedService ? "pointer" : "not-allowed",
            }}
            onMouseEnter={(e) => {
              if (selectedService) {
                e.target.style.backgroundColor = "#C89595";
                e.target.style.transform = "translateY(-2px)";
              }
            }}
            onMouseLeave={(e) => {
              if (selectedService) {
                e.target.style.backgroundColor = "#E8B4B8";
                e.target.style.transform = "translateY(0)";
              }
            }}
          >
            {selectedService
              ? "Continue to Date & Time →"
              : "Please select a service"}
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default ServicesSelection;
