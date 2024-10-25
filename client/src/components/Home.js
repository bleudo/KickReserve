import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../services/api";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import ReservationForm from "./user-reservations/ReservationForm";
import UserReservations from "./user-reservations/UserReservations";
import { FaFutbol } from "react-icons/fa";

function Home() {
  const [fields, setFields] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [userUUID, setUserUUID] = useState("");

  useEffect(() => {
    API.getAllFields()
      .then(setFields)
      .catch((error) => toast.error("Error obtaining fields"));
  }, []);

  useEffect(() => {
    let storedUUID = localStorage.getItem("userUUID");
    if (!storedUUID) {
      storedUUID = uuidv4();
      localStorage.setItem("userUUID", storedUUID);
    }
    setUserUUID(storedUUID);
    fetchUserReservations(storedUUID);
  }, []);

  const fetchUserReservations = async (uuid) => {
    console.log("fetchUserReservations - userUUID:", uuid);
    if (!uuid) {
      console.error("userUUID is undefined in fetchUserReservations");
      return;
    }
    try {
      const userReservations = await API.getReservationsByUserUUID(uuid);
      const activeReservations = userReservations.filter(
        (reservation) => reservation.current_status !== "passed"
      );
      setReservations(activeReservations);
    } catch (error) {
      console.error("Error obtaining user reservations:", error);
      toast.error("Error obtaining reservations");
    }
  };

  const handleReservationCreated = (newReservation) => {
    setReservations((prevReservations) => [
      ...prevReservations,
      newReservation,
    ]);
    console.log("handleReservationCreated - userUUID:", userUUID);
    fetchUserReservations(userUUID);
  };

  const handleCancelReservation = (reservationId) => {
    setReservations((prevReservations) =>
      prevReservations.filter((r) => r.reservation_id !== reservationId)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-12 text-green-800 flex items-center justify-center">
          <FaFutbol className="mr-4 text-5xl" />
          Book your field
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ReservationForm
            fields={fields}
            onReservationCreated={handleReservationCreated}
            userUUID={userUUID}
          />
          <UserReservations
            reservations={reservations}
            fields={fields}
            onCancelReservation={handleCancelReservation}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default Home;
