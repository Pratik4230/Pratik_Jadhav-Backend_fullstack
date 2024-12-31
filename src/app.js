import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

// import routes
import makeUser from "./controllers/auth.js";
import overRouter from "./routes/over.js";
import score from "./routes/score.js";
import Score from "./models/score.model.js";
import Over from "./models/over.model.js";

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());

app.use("/over", overRouter);
app.use("/score", score);

app.post("/makeuser", makeUser);
app.post("/reset", async (req, res) => {
  try {
    await Over.deleteMany({});
    await Score.deleteMany({});

    res.status(200).json({ message: "Database reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to reset database" });
  }
});

export default app;
