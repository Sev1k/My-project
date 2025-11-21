import { Outlet } from "react-router-dom";

function Booking() {
  return (
    <div>
      <div className="booking-container">
        <Outlet />
      </div>
    </div>
  );
}

export default Booking;
