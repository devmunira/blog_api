import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()


let URL = process.env.MONGOOSE_STRING
URL = URL.replace('<username>' , process.env.MONGO_USER)
URL = URL.replace('<password>' , process.env.MONGO_PASSWORD)


// CONNECT WITH MONOGODB WITH MONGOOSE
export const connectMongoDB = async () => {
	try {
        await mongoose.connect(URL, { dbName: process.env.DB_NAME });
	    console.log(`Database connected`.bgGreen.red);
    } catch (error) {
        console.log(error.message.bgRed.green)
    }
};
