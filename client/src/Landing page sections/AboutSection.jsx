import milis from "./photos/milis.jpeg";

const AboutSection = () => {
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
          <h1
            className="display-4 fw-bold"
            style={{
              color: "#8B6F6F",
              marginBottom: "1rem",
            }}
          >
            About Me
          </h1>
          <div
            style={{
              width: "80px",
              height: "4px",
              backgroundColor: "#E8B4B8",
              margin: "0 auto",
              borderRadius: "2px",
            }}
          ></div>
        </div>

        {/* Content Card */}
        <div
          className="card shadow-lg border-0"
          style={{
            backgroundColor: "#F7ECE1",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <div className="row g-0">
            {/* Image Column */}
            <div className="col-lg-5">
              <div
                style={{
                  height: "100%",
                  minHeight: "400px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <img
                  src={milis}
                  alt="Mili - Nail Artist"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                />
                {/* Decorative overlay */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "100px",
                    background:
                      "linear-gradient(to top, rgba(232, 180, 184, 0.3), transparent)",
                  }}
                ></div>
              </div>
            </div>

            {/* Text Column */}
            <div className="col-lg-7">
              <div
                className="p-5"
                style={{
                  minHeight: "400px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  className="mb-4 d-inline-block"
                  style={{
                    backgroundColor: "#E8B4B8",
                    color: "#8B6F6F",
                    padding: "8px 20px",
                    borderRadius: "20px",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    width: "fit-content",
                  }}
                >
                  ✨ Professional Nail Artist
                </div>

                <h2
                  className="mb-4"
                  style={{
                    color: "#8B6F6F",
                    fontWeight: "600",
                    fontSize: "2rem",
                  }}
                >
                  Hi, I'm Mili! 👋
                </h2>

                <p
                  style={{
                    color: "#8B6F6F",
                    fontSize: "1.1rem",
                    lineHeight: "1.8",
                    marginBottom: "1.5rem",
                  }}
                >
                  I'm a passionate nail artist specializing in{" "}
                  <strong style={{ color: "#C89595" }}>
                    Russian manicure techniques
                  </strong>
                  . With years of experience and dedication to my craft, I
                  create beautiful, long-lasting nail art that makes my clients
                  feel confident and special.
                </p>

                <p
                  style={{
                    color: "#8B6F6F",
                    fontSize: "1.1rem",
                    lineHeight: "1.8",
                    marginBottom: "1.5rem",
                  }}
                >
                  Every appointment is personalized to your unique style and
                  needs. I believe that nail care is not just about beauty—it's
                  about self-care, confidence, and expressing yourself.
                </p>

                {/* Stats/Features */}
                <div className="row mt-4">
                  <div className="col-6 mb-3">
                    <div
                      className="p-3 text-center"
                      style={{
                        backgroundColor: "#FFF8F3",
                        borderRadius: "15px",
                        border: "2px solid #E8B4B8",
                      }}
                    >
                      <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                        🎓
                      </div>
                      <div
                        style={{
                          color: "#8B6F6F",
                          fontWeight: "600",
                          fontSize: "0.9rem",
                        }}
                      >
                        Certified Professional
                      </div>
                    </div>
                  </div>
                  <div className="col-6 mb-3">
                    <div
                      className="p-3 text-center"
                      style={{
                        backgroundColor: "#FFF8F3",
                        borderRadius: "15px",
                        border: "2px solid #E8B4B8",
                      }}
                    >
                      <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                        ⭐
                      </div>
                      <div
                        style={{
                          color: "#8B6F6F",
                          fontWeight: "600",
                          fontSize: "0.9rem",
                        }}
                      >
                        5-Star Rated
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  className="btn btn-lg fw-bold mt-3"
                  style={{
                    backgroundColor: "#E8B4B8",
                    color: "#8B6F6F",
                    border: "none",
                    borderRadius: "10px",
                    padding: "12px 30px",
                    fontSize: "1.1rem",
                    transition: "all 0.3s ease",
                    width: "fit-content",
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
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Elements */}
        <div className="row mt-5 g-4">
          <div className="col-md-4">
            <div
              className="text-center p-4"
              style={{
                backgroundColor: "white",
                borderRadius: "15px",
                border: "2px solid #F7ECE1",
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>💖</div>
              <h5 style={{ color: "#8B6F6F", fontWeight: "600" }}>Passion</h5>
              <p style={{ color: "#C89595", fontSize: "0.9rem" }}>
                Every nail design is crafted with love and attention to detail
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="text-center p-4"
              style={{
                backgroundColor: "white",
                borderRadius: "15px",
                border: "2px solid #F7ECE1",
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✨</div>
              <h5 style={{ color: "#8B6F6F", fontWeight: "600" }}>Quality</h5>
              <p style={{ color: "#C89595", fontSize: "0.9rem" }}>
                Premium products and techniques for beautiful, lasting results
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="text-center p-4"
              style={{
                backgroundColor: "white",
                borderRadius: "15px",
                border: "2px solid #F7ECE1",
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🌟</div>
              <h5 style={{ color: "#8B6F6F", fontWeight: "600" }}>
                Experience
              </h5>
              <p style={{ color: "#C89595", fontSize: "0.9rem" }}>
                Relaxing atmosphere where you can unwind and feel pampered
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
