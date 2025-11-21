import axios from "axios";
import ServicesSelection from "./ServicesSelection";
import { useDispatch } from "react-redux";
import { setEditingBooking } from "../store/bookingSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const EditCancelPage = () => {
  const [showComponent, setShowComponent] = useState(false);
  const params = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchBookingForEdit = async () => {
    try {
      const token = params.get("token");
      if (!token) {
        alert("token is missing");
        return;
      }

      const { data } = await axios.get(
        `http://localhost:3000/bookings/manage/${token}`
      );
      console.log(data.booking);
      dispatch(setEditingBooking(data.booking));
    } catch (error) {
      console.error(error);
      alert("Could not load booking");
    }
  };

  useEffect(() => {
    fetchBookingForEdit();
  }, []);

  const handleCancel = async () => {
    try {
      const token = params.get("token");

      if (!token) {
        alert("Token is missing!");
        return;
      }
      const response = await axios.delete(
        `http://localhost:3000/bookings/manage/${token}`
      );
      alert("Booking was cancelled");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  const handleEdit = () => {
    setShowComponent(!showComponent);
  };
  return (
    <div>
      <Button
        onClick={handleCancel}
        type="submit"
        size="lg"
        className="w-100 border-0 fw-bold"
        style={{
          backgroundColor: "#E8B4B8",
          color: "#8B6F6F",
          borderRadius: "10px",
          padding: "12px",
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
        Cancel
      </Button>

      <Button
        onClick={handleEdit}
        type="submit"
        size="lg"
        className="w-100 border-0 fw-bold"
        style={{
          backgroundColor: "#E8B4B8",
          color: "#8B6F6F",
          borderRadius: "10px",
          padding: "12px",
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
        Edit
      </Button>
      {showComponent && <ServicesSelection />}
    </div>
  );
};

export default EditCancelPage;
