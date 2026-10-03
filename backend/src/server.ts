import express from "express";
import cors from "cors";
import searchRoutes from "./routes/search.routes";

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API funcionando");
});

app.use("/api/search", searchRoutes);

app.listen(3000, () => {
  console.log("Server rodando");
});