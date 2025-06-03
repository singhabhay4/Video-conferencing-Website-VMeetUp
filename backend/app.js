
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import { connectToSocket } from "./src/controllers/socketManager.js";
import cors from "cors";
const app = express();
import userRoutes from "./src/routes/users.routes.js";
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors())
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({ extended: true, limit: "40kb" }));
app.use("/api/v1/users" , userRoutes);
app.get("/", (req, res) => {
  res.send(`<h1>Backend Is Working Fine!!</h1>`);
});

const start = async () => {
  try {
    const connectionDb = await mongoose.connect(
      "mongodb+srv://abhaysinghid4420:abhay2004@vmeetup.a21otg3.mongodb.net/"
    );
    console.log("Database Connected Successfully");
    server.listen(app.get("port"), () => {
      console.log("Server is running on port 8000");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};
start();
