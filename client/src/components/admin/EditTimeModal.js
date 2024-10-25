import React, { useState, useEffect } 
 from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';

const EditTimeModal = ({ isOpen, onClose, reservation, availableHours, onUpdate }) => {
  const [editDate, setEditDate] = useState('');
  const [editTime, setEditTime] = useState('');

  useEffect(() => {
    if (reservation) {
      setEditDate(reservation.date);
      setEditTime(reservation.start_time);
    }
  }, [reservation]);

  const handleSubmit = () => {
    onUpdate(editDate, editTime);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl"
      >
        <h3 className="text-lg font-medium text-green-800 mb-4">Editar Reserva</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-green-700 flex items-center">
              <FaCalendarAlt className="mr-2 text-green-600" /> Fecha
            </label>
            <input
              type="date"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-green-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-700 flex items-center">
              <FaClock className="mr-2 text-green-600" /> Hora
            </label>
            <select
              value={editTime}
              onChange={(e) => setEditTime(e.target.value)}
              className="mt-1 block w-full rounded-md border-green-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
            >
              <option value="">Selecciona una hora</option>
              {availableHours.map(hour => (
                <option key={hour} value={hour}>{hour}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-4 py-2 border border-green-300 rounded-md text-sm font-medium text-green-700 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cancelar
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Actualizar Reserva
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EditTimeModal;