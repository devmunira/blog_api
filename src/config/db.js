import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

export const connectMongoDB = async () => {
    try {
      let connectionString = process.env.MONGOOSE_STRING;
    //   connectionString = connectionString.replace('<username>', process.env.MONGO_USER);
    //   connectionString = connectionString.replace('<password>', process.env.MONGO_PASSWORD);
  
      await mongoose.connect(connectionString, {
        dbName: process.env.DB_NAME,
        serverSelectionTimeoutMS: 5000,
        autoIndex: false,
      });
  
      console.log(`Database connected`.bgGreen.red);
    } catch (error) {
      console.log(error.message.bgRed.green);
    }
  };
  