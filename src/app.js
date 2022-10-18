import express from "express";
import morgan from "morgan";
import productsRoutes from "./routes/products.routes";
import authRoutes from "./routes/auth.routes.js";
import { createRoles } from "./libs/initialSetup";
// order to have the concepts separated
const app = express();
//cuando inicie la app se crean automaticamente los roles
createRoles();
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);
export default app;
