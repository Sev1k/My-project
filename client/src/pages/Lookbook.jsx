// Lookbook.jsx
import { useState, useEffect } from "react";

const images = import.meta.glob("./gallery/*.{jpeg,jpg,png}", { eager: true });

const Lookbook = () => {
  const imageList = Object.values(images).map((img) => img.default);
  const [selectedImage, setSelectedImage] = useState(null);

  // Close modal on Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
            Our Lookbook
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
            Browse our collection of stunning nail designs and get inspired for
            your next appointment
          </p>
        </div>

        {/* Grid: Bootstrap row + responsive columns */}
        <div className="row g-4">
          {imageList.map((src, i) => (
            <div key={i} className="col-6 col-sm-4 col-md-3">
              {/* .ratio makes the box square */}
              <div
                className="ratio ratio-1x1 overflow-hidden position-relative shadow"
                style={{
                  cursor: "pointer",
                  borderRadius: "15px",
                  border: "3px solid #F7ECE1",
                  transition: "all 0.3s ease",
                }}
                onClick={() => setSelectedImage(src)}
                aria-label={`Open image ${i + 1}`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.borderColor = "#E8B4B8";
                  e.currentTarget.style.boxShadow =
                    "0 10px 30px rgba(139, 111, 111, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.borderColor = "#F7ECE1";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <img
                  src={src}
                  alt={`nail look ${i + 1}`}
                  className="w-100 h-100 img-fluid object-fit-cover"
                  style={{
                    transition: "transform .3s ease",
                  }}
                />
                {/* Hover Overlay */}
                <div
                  className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                  style={{
                    backgroundColor: "rgba(232, 180, 184, 0)",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(232, 180, 184, 0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(232, 180, 184, 0)";
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-5 pt-4">
          <div
            className="card border-0 shadow-lg mx-auto"
            style={{
              backgroundColor: "#F7ECE1",
              borderRadius: "20px",
              padding: "40px",
              maxWidth: "700px",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>💖</div>
            <h3
              className="fw-bold mb-3"
              style={{
                color: "#8B6F6F",
                fontSize: "1.8rem",
              }}
            >
              Love what you see?
            </h3>
            <p
              className="mb-4"
              style={{
                color: "#8B6F6F",
                fontSize: "1.1rem",
              }}
            >
              Book your appointment today and let's create something beautiful
              together!
            </p>
            <a
              href="/booking"
              className="btn btn-lg fw-bold"
              style={{
                backgroundColor: "#E8B4B8",
                color: "#8B6F6F",
                border: "none",
                borderRadius: "12px",
                padding: "14px 40px",
                fontSize: "1.2rem",
                transition: "all 0.3s ease",
                display: "inline-block",
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
              Book Your Appointment →
            </a>
          </div>
        </div>
      </div>

      {/* Modal overlay (controlled by React state) */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            zIndex: 1050,
            backgroundColor: "rgba(139, 111, 111, 0.95)",
            backdropFilter: "blur(5px)",
          }}
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-transparent"
            style={{ maxWidth: "90%", maxHeight: "90%" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="position-relative">
              <img
                src={selectedImage}
                alt="Selected nail"
                className="img-fluid"
                style={{
                  display: "block",
                  maxHeight: "90vh",
                  margin: "0 auto",
                  borderRadius: "20px",
                  border: "4px solid #F7ECE1",
                  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
                }}
              />

              {/* Close button */}
              <button
                type="button"
                className="btn fw-bold position-absolute"
                style={{
                  top: -15,
                  right: -15,
                  backgroundColor: "#E8B4B8",
                  color: "#8B6F6F",
                  borderRadius: "50%",
                  width: "45px",
                  height: "45px",
                  fontSize: "1.3rem",
                  border: "3px solid #FFF8F3",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
                  transition: "all 0.3s ease",
                }}
                aria-label="Close"
                onClick={() => setSelectedImage(null)}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#C89595";
                  e.target.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#E8B4B8";
                  e.target.style.transform = "scale(1)";
                }}
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lookbook;
