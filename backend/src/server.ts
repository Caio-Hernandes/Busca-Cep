import express from "express";
import cors from "cors";
import searchRoutes from "./routes/search.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.get("/", (req, res) => {
  res.send("API funcionando");
});

app.use("/api/search", searchRoutes);

app.listen(3000, () => {
  console.log("Server rodando");
});