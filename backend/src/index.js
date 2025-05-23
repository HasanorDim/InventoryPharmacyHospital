import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
// Route Path
// import { app } from "./lib/socket.js";

import authroute from "./routes/auth.routes.js";
import productroute from "./routes/product.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow credentials
  })
);

app.use("/api/auth", authroute);
app.use("/api/product", productroute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (res, req) => {
    res.sendFile(path.join(__dirname, "../frontend", "dis", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`This Server is running on http://localhost:${PORT}`);
});
