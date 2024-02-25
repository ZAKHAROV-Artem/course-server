import express, { Application } from "express";
import cors from "cors";
import "dotenv/config";
import { Server } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "./types";

const PORT = process.env.PORT || 8080;
const app: Application = express();

app.use(cors());

const expressServer = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const io = new Server<ClientToServerEvents, ServerToClientEvents>(
  expressServer,
  {
    cors: {
      origin: [process.env.CLIENT_URL || "http://localhost:3000"],
      methods: ["GET", "POST"],
    },
  }
);

app.get("*", (req, res) => {
  res.redirect(process.env.CLIENT_URL || "http://localhost:3000");
});
