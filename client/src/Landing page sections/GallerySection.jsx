import { useNavigate } from "react-router-dom";
import nails1 from "./photos/nails-1.jpeg";
import nails2 from "./photos/nails-2.jpeg";
import nails3 from "./photos/nails-3.jpeg";

const GallerySection = ({ images = [nails1, nails2, nails3] }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundColor: "#FFF8F3",
        minHeight: "100vh",
        paddingTop: "80px",
        paddingBottom: "80px",
      }}
    >
      <div className="container" style={{ maxWidth: "1200px" }}>
        {/* Section Header */}
        <div className="text-center mb-5">
          <h2
            className="display-4 fw-bold"
            style={{
              color: "#8B6F6F",
              marginBottom: "1rem",
            }}
          >
            Explore Our Work
          </h2>
          <div
            style={{
              width: "80px",
              height: "4px",
              backgroundColor: "#E8B4B8",
              margin: "0 auto 1.5rem",
              borderRadius: "2px",
            }}
          ></div>
          <p
            style={{
              color: "#C89595",
              fontSize: "1.2rem",
            }}
          >
            Discover our services, view our portfolio, and book your perfect
            appointment
          </p>
        </div>

        {/* Gallery Cards */}
        <div className="row g-4">
          {/* Card 1 - Services */}
          <div className="col-md-4">
            <div
              className="card border-0 overflow-hidden shadow-lg"
              style={{
                height: "500px",
                borderRadius: "20px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(139, 111, 111, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(139, 111, 111, 0.15)";
              }}
            >
              <div className="position-relative h-100">
                <img
                  src={nails1}
                  className="card-img h-100"
                  alt="Our Services"
                  style={{
                    objectFit: "cover",
                  }}
                />
                <div
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 40%, rgba(139, 111, 111, 0.9))",
                  }}
                ></div>
                <div className="card-img-overlay d-flex flex-column justify-content-end p-4">
                  <div
                    className="mb-2"
                    style={{
                      fontSize: "2rem",
                    }}
                  >
                    💅
                  </div>
                  <h4
                    className="card-title fw-bold mb-3"
                    style={{
                      color: "#FFF8F3",
                      fontSize: "1.8rem",
                    }}
                  >
                    Our Services
                  </h4>
                  <a
                    href="/services"
                    className="btn fw-bold"
                    style={{
                      backgroundColor: "#E8B4B8",
                      color: "#8B6F6F",
                      border: "none",
                      borderRadius: "12px",
                      padding: "12px 30px",
                      fontSize: "1rem",
                      width: "fit-content",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#FFF8F3";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#E8B4B8";
                    }}
                  >
                    View Services →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 - Lookbook */}
          <div className="col-md-4">
            <div
              className="card border-0 overflow-hidden shadow-lg"
              style={{
                height: "500px",
                borderRadius: "20px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(139, 111, 111, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(139, 111, 111, 0.15)";
              }}
            >
              <div className="position-relative h-100">
                <img
                  src={nails2}
                  className="card-img h-100"
                  alt="Lookbook"
                  style={{
                    objectFit: "cover",
                  }}
                />
                <div
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 40%, rgba(139, 111, 111, 0.9))",
                  }}
                ></div>
                <div className="card-img-overlay d-flex flex-column justify-content-end p-4">
                  <div
                    className="mb-2"
                    style={{
                      fontSize: "2rem",
                    }}
                  >
                    ✨
                  </div>
                  <h4
                    className="card-title fw-bold mb-3"
                    style={{
                      color: "#FFF8F3",
                      fontSize: "1.8rem",
                    }}
                  >
                    Our Lookbook
                  </h4>
                  <button
                    onClick={() => navigate("/lookbook")}
                    className="btn fw-bold"
                    style={{
                      backgroundColor: "#E8B4B8",
                      color: "#8B6F6F",
                      border: "none",
                      borderRadius: "12px",
                      padding: "12px 30px",
                      fontSize: "1rem",
                      width: "fit-content",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#FFF8F3";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#E8B4B8";
                    }}
                  >
                    View Gallery →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 - Book Now */}
          <div className="col-md-4">
            <div
              className="card border-0 overflow-hidden shadow-lg"
              style={{
                height: "500px",
                borderRadius: "20px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(139, 111, 111, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(139, 111, 111, 0.15)";
              }}
            >
              <div className="position-relative h-100">
                <img
                  src={nails3}
                  className="card-img h-100"
                  alt="Book Now"
                  style={{
                    objectFit: "cover",
                  }}
                />
                <div
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 40%, rgba(139, 111, 111, 0.9))",
                  }}
                ></div>
                <div className="card-img-overlay d-flex flex-column justify-content-end p-4">
                  <div
                    className="mb-2"
                    style={{
                      fontSize: "2rem",
                    }}
                  >
                    📅
                  </div>
                  <h4
                    className="card-title fw-bold mb-3"
                    style={{
                      color: "#FFF8F3",
                      fontSize: "1.8rem",
                    }}
                  >
                    Book Appointment
                  </h4>
                  <a
                    href="/booking"
                    className="btn fw-bold"
                    style={{
                      backgroundColor: "#E8B4B8",
                      color: "#8B6F6F",
                      border: "none",
                      borderRadius: "12px",
                      padding: "12px 30px",
                      fontSize: "1rem",
                      width: "fit-content",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#FFF8F3";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#E8B4B8";
                    }}
                  >
                    Book Now →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
