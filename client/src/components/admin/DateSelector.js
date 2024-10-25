import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

const DateSelector = ({ selectedDate, onDateChange }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-green-700 mb-2 flex items-center">
        <FaCalendarAlt className="mr-2 text-green-600" />
        Seleccione la fecha para ver las reservas
      </label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
        className="p-2 border border-green-300 rounded-md focus:ring-green-500 focus:border-green-500 transition duration-300 w-full sm:w-auto bg-white text-green-800"
      />
    </div>
  );
};

export default DateSelector;