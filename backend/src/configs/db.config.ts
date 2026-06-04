import mongoose from "mongoose";

const connectDatabase = async () => {
  const dataBaseUrl = process.env.DATABASE_URI;

  if (!dataBaseUrl) {
    console.log("Database url not found");
    throw new Error("Database url not found");
  }

  try {
    await mongoose.connect(dataBaseUrl);
    console.log("Database connected");
  } catch (err: any) {
    console.log(`Database error: ${err.message ? err.message : "No message"}`);
  }
};

export default connectDatabase;
