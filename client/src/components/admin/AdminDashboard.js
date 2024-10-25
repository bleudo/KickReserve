import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API_FOR_ADMIN from "../../services/adminApi";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFutbol, FaUserCog, FaSignOutAlt } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DateSelector from "./DateSelector";
import EditTimeModal from "./EditTimeModal";
import NewUserModal from "./NewUserModal";
import ReservationTable from "./ReservationTable";

export default function AdminDashboard() {
  const [reservations, setReservations] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
  const [isEditTimeModalOpen, setIsEditTimeModalOpen] = useState(false);
  const [editingReservation, setEditingReservation] = useState(null);
  const [availableHours, setAvailableHours] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedDate) {
      fetchReservations();
    }
  }, [selectedDate]);

  const fetchReservations = async () => {
    try {
      if (!selectedDate || !isValidDate(selectedDate)) {
        toast.error("Please select a valid date");
        return;
      }
      const apiFormattedDate = formatDateForApi(selectedDate);
      const fetchedReservations =
        await API_FOR_ADMIN.getReservationsByDateAdmin(apiFormattedDate);
      setReservations(
        fetchedReservations.map((reservation) => ({
          ...reservation,
          formattedDate: formatDateForDisplay(reservation.date),
        }))
      );
    } catch (error) {
      console.error("Error fetching reservations:", error);
      toast.error(
        "Error fetching reservations: " + (error.message || "Please try again")
      );
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleCancel = async (reservationId) => {
    try {
      await API.cancelReservation(reservationId);
      setReservations(
        reservations.filter((r) => r.reservation_id !== reservationId)
      );
      toast.success("Reservation cancelled successfully");
    } catch (error) {
      console.error("Error cancelling reservation:", error);
      toast.error(
        "Error cancelling reservation: " +
          (error.message || "Please try again")
      );
    }
  };

  const handleEditTime = async (reservation) => {
    setEditingReservation(reservation);
    try {
      const hours = await API_FOR_ADMIN.getAvailableHoursAdmin(
        reservation.field_id,
        reservation.date
      );
      setAvailableHours(hours);
    } catch (error) {
      console.error("Error fetching available hours:", error);
      toast.error("Error fetching available hours");
    }
    setIsEditTimeModalOpen(true);
  };

  const handleUpdateReservation = async (formattedDate, editTime) => {
    try {
      await API_FOR_ADMIN.updateReservationAdmin(
        formattedDate,
        editTime,
        editingReservation.reservation_id
      );
      toast.success("Reservation updated successfully");
      setIsEditTimeModalOpen(false);
      fetchReservations();
    } catch (error) {
      console.error("Error updating reservation:", error);
      toast.error(
        "Error updating reservation: " +
          (error.response?.data?.error || error.message)
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  const formatDateForApi = (dateString) => {
    return dateString;
  };

  const formatDateForDisplay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200">
      <nav className="bg-green-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <FaFutbol className="h-8 w-8 text-white mr-2" />
              <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
            </div>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsNewUserModalOpen(true)}
                className="bg-white text-green-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-green-100 transition duration-300 flex items-center"
              >
                <FaUserCog className="mr-2" />
                New Admin
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-700 transition duration-300 flex items-center"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white overflow-hidden shadow-lg sm:rounded-lg"
          >
            <div className="p-6 bg-white border-b border-gray-200">
              <h3 className="text-2xl font-semibold text-green-800 mb-6">
                Reservations
              </h3>
              <DateSelector
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
              />
              <ReservationTable
                reservations={reservations}
                onCancel={handleCancel}
                onEditTime={handleEditTime}
              />
            </div>
          </motion.div>
        </div>
      </main>

      <EditTimeModal
        isOpen={isEditTimeModalOpen}
        onClose={() => setIsEditTimeModalOpen(false)}
        reservation={editingReservation}
        availableHours={availableHours}
        onUpdate={handleUpdateReservation}
      />

      <NewUserModal
        isOpen={isNewUserModalOpen}
        onClose={() => setIsNewUserModalOpen(false)}
      />

      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}
