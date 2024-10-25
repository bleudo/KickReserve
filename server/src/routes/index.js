import reservationRoutes from "./reservationRoutes.js";
import fieldsRoutes from "./fieldRoutes.js";
import adminUsersRoutes from "./adminUserRoutes.js";

export const setupRoutes = (app) => {
  app.use("/api", reservationRoutes);
  app.use("/api", fieldsRoutes);
  app.use("/api", adminUsersRoutes);
};
