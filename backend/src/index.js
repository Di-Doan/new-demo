import dotenv from 'dotenv';
dotenv.config(); 
import express from "express";
import pkg from "body-parser";
import UserRouter from "./router/user.router.js";
import GiftRouter from "./router/gift.router.js";
import AuthRouter from "./router/auth.router.js";
import ContactRouter from "./router/contact.router.js"
import "./config/mongo.config.js";

// Import 3rd party libraries
import cors from "cors";
import helmet from "helmet";

const { json, urlencoded } = pkg;
const app = express();
const port = process.env.PORT || 8080;

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow methods you use
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.options('*', cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(helmet());

app.use(json());
app.use(urlencoded({ extended: true }));

// routes
app.use("/api/user", UserRouter);
app.use("/api/gift", GiftRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/contact", ContactRouter)
app.use("/api/*", (req, res) => res.status(404).json({ message: "API not found" }));

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
