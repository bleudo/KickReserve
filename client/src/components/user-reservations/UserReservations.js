import React from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import API from "../../services/api";
import { FaFutbol, FaCalendarAlt, FaClock } from "react-icons/fa";

function UserReservations({ reservations, fields, onCancelReservation }) {
  const handleCancel = async (id) => {
    try {
      await API.cancelReservation(id);
      onCancelReservation(id);
      toast.info("Reservation cancelled");
    } catch (error) {
      toast.error("Error cancelling reservation");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];

    return `${dayOfWeek} ${day} of ${month}`;
  };

  const formatTime = (timeString) => {
    return timeString.slice(0, 5);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white p-6 rounded-lg shadow-md transition duration-300 ease-in-out"
    >
      <h2 className="text-2xl font-semibold mb-6 text-green-800 flex items-center">
        <FaFutbol className="mr-2" />
        Your Reservations
      </h2>
      {reservations.length === 0 ? (
        <p className="text-green-600 text-center py-4">
          You have no active reservations.
        </p>
      ) : (
        <ul className="space-y-4">
          {reservations.map((reservation) => {
            const field = fields.find(
              (f) => f.field_id === reservation.field_id
            );
            const formattedDate = formatDate(reservation.date);
            const formattedStartTime = formatTime(reservation.start_time);

            return (
              <motion.li
                key={reservation.reservation_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex justify-between items-center p-4 bg-green-50 rounded-md transition duration-300 ease-in-out hover:bg-green-100"
              >
                <div>
                  <p className="font-medium text-green-800 flex items-center">
                    <FaFutbol className="mr-2" />
                    {field ? field.name : "Field not found"}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <FaCalendarAlt className="mr-2" />
                    {formattedDate}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <FaClock className="mr-2" />
                    {formattedStartTime}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Status: {reservation.current_status}
                  </p>
                </div>
                {reservation.current_status === "active" && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCancel(reservation.reservation_id)}
                    className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded-full hover:bg-red-200 transition duration-300 ease-in-out"
                  >
                    Cancel
                  </motion.button>
                )}
              </motion.li>
            );
          })}
        </ul>
      )}
    </motion.div>
  );
}

export default UserReservations;
