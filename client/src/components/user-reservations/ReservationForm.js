import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaFutbol,
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaPhone,
} from "react-icons/fa";
import { toast } from "react-toastify";
import API from "../../services/api";
import FieldSelector from "../../components/admin/FieldSelector";

function ReservationForm({ fields, onReservationCreated, userUUID }) {
  const [selectedFieldId, setSelectedFieldId] = useState("");
  const [date, setDate] = useState("");
  const [availableHours, setAvailableHours] = useState([]);
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const formattedToday = today.toISOString().split("T")[0];
    setMinDate(formattedToday);
    setDate(formattedToday);
  }, []);

  useEffect(() => {
    const fetchAvailableHours = async () => {
      if (selectedFieldId && date) {
        try {
          const hours = await API.getAvailableHoursForFieldAndDate(
            selectedFieldId,
            date
          );
          setAvailableHours(hours);
        } catch (error) {
          console.error("Error getting hours:", error);
          toast.error("Error getting available hours");
        }
      }
    };

    fetchAvailableHours();
  }, [selectedFieldId, date]);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value) || value === "") {
      setPhone(value);
    } else {
      toast.error("Only numbers are accepted in this field");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFieldId || !date || !time || !name || !lastName || !phone) {
      toast.error("Please complete all fields.");
      return;
    }

    const startHour = parseInt(time.slice(0, 2), 10);
    const endHour = (startHour + 1) % 24;
    const end_time = `${endHour.toString().padStart(2, "0")}:00`;

    if (!userUUID) {
      console.error("Error: User UUID not found");
      toast.error("Error: User UUID not found");
      return;
    }

    const reservationData = {
      field_id: selectedFieldId,
      date,
      start_time: time,
      end_time,
      user_name: name,
      user_lastname: lastName,
      user_phone: phone,
      user_uuid: userUUID,
    };

    console.log("Reservation data before sending:", reservationData);

    try {
      const newReservation = await API.createReservation(reservationData);
      onReservationCreated(newReservation);
      toast.success("Reservation created successfully");
      const updatedHours = await API.getAvailableHoursForFieldAndDate(
        selectedFieldId,
        date
      );
      setAvailableHours(updatedHours);

      resetForm();
    } catch (error) {
      console.error("Error creating reservation:", error);
      toast.error(
        "Error creating reservation: " +
          (error.response?.data?.error || error.message || "Please try again")
      );
    }
  };

  const resetForm = () => {
    setSelectedFieldId("");
    setDate("");
    setTime("");
    setName("");
    setLastName("");
    setPhone("");
  };

  const handleFieldChange = (fieldId) => {
    setSelectedFieldId(fieldId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 p-6 rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-lg border border-gray-200"
    >
      <h2 className="text-2xl font-semibold mb-6 text-green-800 flex items-center">
        <FaFutbol className="mr-2" />
        Book Your Field
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FieldSelector
          fields={fields}
          selectedField={selectedFieldId}
          onFieldChange={handleFieldChange}
        />
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="date"
            className="text-sm font-medium text-green-700 flex items-center"
          >
            <FaCalendarAlt className="mr-2" />
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={minDate}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md bg-white shadow-sm"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="time"
            className="text-sm font-medium text-green-700 flex items-center"
          >
            <FaClock className="mr-2" />
            Time
          </label>
          <select
            id="time"
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md bg-white shadow-sm"
          >
            <option value="">Select a time</option>
            {availableHours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-medium text-green-700 flex items-center"
          >
            <FaUser className="mr-2" />
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md bg-white shadow-sm"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="lastName"
            className="text-sm font-medium text-green-700 flex items-center"
          >
            <FaUser className="mr-2" />
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md bg-white shadow-sm"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="phone"
            className="text-sm font-medium text-green-700 flex items-center"
          >
            <FaPhone className="mr-2" />
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={phone}
            onChange={handlePhoneChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md bg-white shadow-sm"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
        >
          Create Reservation
        </motion.button>
      </form>
    </motion.div>
  );
}

export default ReservationForm;
