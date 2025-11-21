import { Route, Routes, Navigate } from "react-router-dom";
import Lookbook from "./pages/Lookbook";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import ConfirmationPage from "./components/ConfirmationPage";
import DateTimeConfirm from "./components/DateTimeConfirm";
import InfoForm from "./components/InfoForm";
import ServicesSelection from "./components/ServicesSelection";
import EditCancelPage from "./components/EditCancelPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Landing />} />
          <Route path="lookbook" element={<Lookbook />} />
          <Route path="services" element={<Services />} />
          <Route path="booking" element={<Booking />}>
            <Route index element={<Navigate to="info" replace />} />
            <Route path="info" element={<InfoForm />} />
            <Route path="service" element={<ServicesSelection />} />
            <Route path="datetime" element={<DateTimeConfirm />} />
            <Route path="confirmation" element={<ConfirmationPage />} />
            <Route path="manage" element={<EditCancelPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
