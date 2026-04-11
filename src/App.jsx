import React, { useState } from "react";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import BookAppointment from "./pages/BookAppointment";
import MyAppointments from "./pages/MyAppointments";
import Navbar from "./components/Navbar";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const navigate = (p, data = null) => {
    setPage(p);
    if (data) setSelectedDoctor(data);
    window.scrollTo(0, 0);
  };

  const addAppointment = (appt) => {
    setAppointments((prev) => [...prev, { ...appt, id: Date.now() }]);
  };

  const cancelAppointment = (id) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Cancelled" } : a))
    );
  };

  return (
    <div className="app">
      <Navbar page={page} navigate={navigate} appointmentCount={appointments.filter(a => a.status !== "Cancelled").length} />
      <main className="main-content">
        {page === "home" && <Home navigate={navigate} />}
        {page === "doctors" && <Doctors navigate={navigate} />}
        {page === "book" && (
          <BookAppointment
            doctor={selectedDoctor}
            navigate={navigate}
            addAppointment={addAppointment}
          />
        )}
        {page === "appointments" && (
          <MyAppointments appointments={appointments} navigate={navigate} cancelAppointment={cancelAppointment} />
        )}
      </main>
    </div>
  );
}
