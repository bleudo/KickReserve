import axios from "axios";

const API_URL = "http://localhost:5000/api";

const API = {
  createReservation: async (reservationData) => {
    try {
      const response = await axios.post(`${API_URL}/reserve`, reservationData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error || "Error al crear la reserva");
    }
  },

  getAvailableHoursForFieldAndDate: async (fieldId, date) => {
    try {
      const response = await axios.get(
        `${API_URL}/available-hours/${Number(fieldId)}/${date}`
      );
      console.log("Available hours response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error en getAvailableHours:", error);
      throw new Error(
        error.response?.data?.error || "Error al obtener horas disponibles"
      );
    }
  },

  getReservationsByUserUUID: async (user_uuid) => {
    try {
      if (!user_uuid) {
        throw new Error("user_uuid is undefined");
      }
      const response = await axios.get(`${API_URL}/reservations/${user_uuid}`);
      return response.data;
    } catch (error) {
      console.error("Error en getReservationsByUserUUID", error);
      throw new Error(
        error.response?.data?.error || "Error al obtener reservas del usuario"
      );
    }
  },

  cancelReservation: async (reservationId) => {
    try {
      const response = await axios.delete(`${API_URL}/cancel/${reservationId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response.data.error || "Error al cancelar la reserva"
      );
    }
  },

  getReservationsByFieldAndDate: async (fieldId, date) => {
    try {
      const response = await axios.get(
        `${API_URL}/reservations/${fieldId}/${date}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error || "Error al obtener reservas");
    }
  },

  getAllFields: async () => {
    try {
      const response = await axios.get(`${API_URL}/fields`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response.data.error || "Error al obtener los campos"
      );
    }
  },
};

export default API;
