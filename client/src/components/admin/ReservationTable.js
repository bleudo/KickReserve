import React from "react";
import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";

const ReservationTable = ({ reservations, onCancel, onEditTime }) => {
  if (reservations.length === 0) {
    return (
      <p className="text-green-600 text-center py-4">
        No reservations found for the selected date.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-green-200">
        <thead className="bg-green-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-green-500 uppercase tracking-wider">
              Campo
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-green-500 uppercase tracking-wider">
              Fecha
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-green-500 uppercase tracking-wider">
              Hora
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-green-500 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-green-500 uppercase tracking-wider">
              Teléfono
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-green-500 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-green-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-green-200">
          {reservations.map((reservation) => (
            <motion.tr
              key={reservation.reservation_id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-900">
                {reservation.field_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-900">
                {reservation.formattedDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-900">
                {reservation.start_time.slice(0, 5)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-900">
                {reservation.user_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-900">
                {reservation.user_phone}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-900">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    reservation.current_status === "active"
                      ? "bg-green-100 text-green-800"
                      : reservation.current_status === "passed"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {reservation.current_status === "active"
                    ? "Activa"
                    : reservation.current_status === "passed"
                    ? "Vencida"
                    : "Cancelada"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {reservation.current_status === "active" && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onEditTime(reservation)}
                      className="text-green-600 hover:text-green-900 mr-2"
                      title="Editar hora"
                    >
                      <FaEdit />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onCancel(reservation.reservation_id)}
                      className="text-red-600 hover:text-red-900 mr-2"
                      title="Cancelar reserva"
                    >
                      <FaTrash />
                    </motion.button>
                  </>
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationTable;
