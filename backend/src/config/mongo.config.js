import dotenv from 'dotenv';
dotenv.config(); 
import mongoose, { connect } from "mongoose";

const mongoUrl = process.env.DATABASE;

if (!mongoUrl) {
  throw new Error('MONGO_URL is not defined');
}

connect(mongoUrl)
  .then(() => console.log("Connected to Mongoose successfully!"))
  .catch((err) => console.error(`Mongo Error: connect:::`, err));

export default mongoose