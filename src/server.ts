import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import emailRouter from "./routes/emailRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(cors());

app.use("/api", emailRouter);

app.listen(PORT, () => {
  console.log("🚀 Servidor executando!");
});
