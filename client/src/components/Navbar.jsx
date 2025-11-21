const Navbar = () => {
  return (
    <>
      <nav
        className="navbar sticky-top navbar-expand-lg navbar-light shadow-sm"
        style={{
          backgroundColor: "#FFF8F3",
          borderBottom: "1px solid #F7ECE1",
        }}
      >
        <div className="container">
          {/* Brand/Logo */}
          <a
            className="navbar-brand fw-bold"
            href="/"
            style={{
              color: "#8B6F6F",
              fontSize: "1.5rem",
              letterSpacing: "0.5px",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#C89595")}
            onMouseLeave={(e) => (e.target.style.color = "#8B6F6F")}
          >
            💅 Mili's Nails
          </a>

          {/* Mobile Toggle Button */}
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{
              color: "#8B6F6F",
            }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center gap-1">
              <li className="nav-item">
                <a
                  className="nav-link fw-semibold"
                  href="/"
                  style={{
                    color: "#8B6F6F",
                    padding: "8px 20px",
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    fontSize: "0.95rem",
                    letterSpacing: "0.3px",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#F7ECE1";
                    e.target.style.color = "#C89595";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "#8B6F6F";
                  }}
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link fw-semibold"
                  href="/lookbook"
                  style={{
                    color: "#8B6F6F",
                    padding: "8px 20px",
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    fontSize: "0.95rem",
                    letterSpacing: "0.3px",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#F7ECE1";
                    e.target.style.color = "#C89595";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "#8B6F6F";
                  }}
                >
                  Lookbook
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link fw-semibold"
                  href="/services"
                  style={{
                    color: "#8B6F6F",
                    padding: "8px 20px",
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    fontSize: "0.95rem",
                    letterSpacing: "0.3px",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#F7ECE1";
                    e.target.style.color = "#C89595";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "#8B6F6F";
                  }}
                >
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="btn fw-semibold"
                  href="/booking"
                  style={{
                    backgroundColor: "#E8B4B8",
                    color: "#8B6F6F",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 24px",
                    fontSize: "0.95rem",
                    letterSpacing: "0.3px",
                    transition: "all 0.3s ease",
                    marginLeft: "8px",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#C89595";
                    e.target.style.transform = "translateY(-1px)";
                    e.target.style.boxShadow =
                      "0 4px 12px rgba(200, 149, 149, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#E8B4B8";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  Book Now
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
