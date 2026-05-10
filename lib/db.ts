import environment from "@/config/environment";
import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(environment.DATABASE_URL, {
      dbName: "apotek",
    });
    return Promise.resolve("Database connected");
  } catch (error) {
    return Promise.reject(error);
  }
};

export default dbConnect;
