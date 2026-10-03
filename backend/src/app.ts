import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import searchRoutes from "./routes/search.routes";
import { swaggerSpec } from "./config/swagger";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173"
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("API funcionando");
});

app.use("/api/search", searchRoutes);

app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

export default app;