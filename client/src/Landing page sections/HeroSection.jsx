import vid from "./photos/mov.mp4";

const HeroSection = () => {
  return (
    <div className="position-relative vh-100 overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
      >
        <source src={vid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Soft gradient overlay matching color scheme */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background:
            "linear-gradient(to bottom, rgba(139, 111, 111, 0.4), rgba(232, 180, 184, 0.5))",
        }}
      ></div>

      {/* Content on top of video */}
      <div className="container h-100 d-flex flex-column justify-content-center align-items-center text-center position-relative">
        <div
          style={{
            backgroundColor: "rgba(247, 236, 225, 0.95)",
            padding: "60px 80px",
            borderRadius: "30px",
            maxWidth: "900px",
            boxShadow: "0 20px 60px rgba(139, 111, 111, 0.3)",
          }}
        >
          <div
            className="mb-3 d-inline-block"
            style={{
              backgroundColor: "#E8B4B8",
              color: "#8B6F6F",
              padding: "8px 24px",
              borderRadius: "20px",
              fontSize: "0.9rem",
              fontWeight: "600",
            }}
          >
            ✨ Premium Nail Care Experience
          </div>

          <h1
            className="display-3 fw-bold mb-4"
            style={{
              color: "#8B6F6F",
            }}
          >
            Welcome to Elegance
          </h1>

          <p
            className="lead mb-3"
            style={{
              color: "#8B6F6F",
              fontSize: "1.3rem",
              lineHeight: "1.6",
            }}
          >
            Where beauty meets artistry. Experience personalized nail care that
            makes you feel confident and beautiful.
          </p>

          <p
            className="mb-5"
            style={{
              color: "#C89595",
              fontSize: "1.1rem",
            }}
          >
            Professional Russian manicure techniques and custom nail art designs
          </p>

          <a
            href="/booking"
            className="btn btn-lg fw-bold"
            style={{
              backgroundColor: "#E8B4B8",
              color: "#8B6F6F",
              border: "none",
              borderRadius: "15px",
              padding: "18px 50px",
              fontSize: "1.3rem",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(232, 180, 184, 0.4)",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#C89595";
              e.target.style.transform = "translateY(-3px)";
              e.target.style.boxShadow = "0 6px 20px rgba(200, 149, 149, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#E8B4B8";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(232, 180, 184, 0.4)";
            }}
          >
            Book Your Appointment →
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
