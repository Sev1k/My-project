// Services.jsx
import nails1 from "../Landing page sections/photos/nails-1.jpeg";
import nails2 from "../Landing page sections/photos/nails-2.jpeg";
import nails3 from "../Landing page sections/photos/nails-3.jpeg";

const Services = () => {
  const services = [
    {
      image: nails1,
      emoji: "💅",
      title: "Classic Manicure",
      description:
        "Experience our signature classic manicure with expert nail shaping, cuticle care, and your choice of premium polish for a timeless, elegant finish.",
      duration: "45 min",
      price: "$35",
    },
    {
      image: nails2,
      emoji: "✨",
      title: "Russian Manicure",
      description:
        "Our specialized Russian manicure technique provides precise cuticle work and long-lasting results with a flawless, professional finish.",
      duration: "60 min",
      price: "$55",
    },
    {
      image: nails3,
      emoji: "🎨",
      title: "Gel Extensions & Art",
      description:
        "Custom gel extensions with intricate nail art designs. Express your unique style with our creative and durable gel nail services.",
      duration: "90 min",
      price: "$75",
    },
  ];

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
            Our Services
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
            Premium nail care services tailored to your unique style
          </p>
        </div>

        {/* Services Grid */}
        <div className="row g-4">
          {services.map((service, index) => (
            <div key={index} className="col-md-4">
              <div
                className="card border-0 shadow-lg h-100"
                style={{
                  backgroundColor: "#F7ECE1",
                  borderRadius: "20px",
                  overflow: "hidden",
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
                <div
                  style={{
                    height: "280px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <img
                    src={service.image}
                    className="card-img-top"
                    alt={service.title}
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.transform = "scale(1.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.transform = "scale(1)")
                    }
                  />
                  {/* Emoji Badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "15px",
                      right: "15px",
                      backgroundColor: "#FFF8F3",
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.5rem",
                      boxShadow: "0 4px 10px rgba(139, 111, 111, 0.2)",
                    }}
                  >
                    {service.emoji}
                  </div>
                </div>

                <div className="card-body p-4">
                  <h5
                    className="card-title fw-bold mb-3"
                    style={{
                      color: "#8B6F6F",
                      fontSize: "1.5rem",
                    }}
                  >
                    {service.title}
                  </h5>

                  <p
                    className="card-text mb-4"
                    style={{
                      color: "#8B6F6F",
                      fontSize: "1rem",
                      lineHeight: "1.6",
                    }}
                  >
                    {service.description}
                  </p>

                  {/* Duration and Price */}
                  <div
                    className="d-flex justify-content-between align-items-center mb-4"
                    style={{
                      backgroundColor: "#FFF8F3",
                      padding: "12px 20px",
                      borderRadius: "12px",
                      border: "2px solid #E8B4B8",
                    }}
                  >
                    <span
                      style={{
                        color: "#8B6F6F",
                        fontWeight: "600",
                        fontSize: "0.95rem",
                      }}
                    >
                      ⏱️ {service.duration}
                    </span>
                    <span
                      style={{
                        color: "#C89595",
                        fontWeight: "700",
                        fontSize: "1.2rem",
                      }}
                    >
                      {service.price}
                    </span>
                  </div>

                  <a
                    href="/booking"
                    className="btn w-100 fw-bold"
                    style={{
                      backgroundColor: "#E8B4B8",
                      color: "#8B6F6F",
                      border: "none",
                      borderRadius: "12px",
                      padding: "14px",
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
                    Book Now →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
