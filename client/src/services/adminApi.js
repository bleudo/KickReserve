import axios from "axios";

const API_URL = "http://localhost:5000/api";

const API_FOR_ADMIN = {
  registerAdminUser: async (adminData) => {
    try {
      const response = await axios.post(`${API_URL}/admin/register`, adminData);
      return response.data;
    } catch (error) {
      console.error(
        "Error detallado:",
        error.response ? error.response.data : error.message
      );
      throw new Error(
        error.response
          ? error.response.data.error
          : "Error al crear el administrador"
      );
    }
  },

  authenticateAdminUser: async (credentials) => {
    try {
      const response = await axios.post(
        `${API_URL}/admin/authenticate`,
        credentials
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response.data.error ||
          "Error al autenticar el usuario administrador"
      );
    }
  },

  getReservationsByDateAdmin: async (date) => {
    try {
      const response = await axios.get(`${API_URL}/admin/dashboard/${date}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response.data.error || "Error al obtener reservas para admin"
      );
    }
  },

  updateReservationAdmin: async (date, start_time, reservation_id) => {
    try {
      const response = await axios.put(
        `${API_URL}/admin/dashboard/${reservation_id}`,
        { date, start_time }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating reservation", error);
      throw new Error(
        error.response.data.error || "Error updating reservation"
      );
    }
  },

  getAvailableHoursAdmin: async (fieldId, date) => {
    try {
      const response = await axios.get(
        `${API_URL}/admin/dashboard/${fieldId}/${date}`
      );
      return response.data;
    } catch (error) {
      console.error("Error en getAvailableHours:", error);
      throw new Error(
        error.response.data.error || "Error al obtener horas disponibles"
      );
    }
  },
};

export default API_FOR_ADMIN;
