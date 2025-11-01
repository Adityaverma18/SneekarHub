import mongoose from "mongoose";

const connectDB = async() =>{
    try {
        mongoose.connection.on('connected', () =>{
            console.log("Database Connected")
        })
        await mongoose.connect(process.env.MONGODB_URI + "sneekarHub");

    } catch (error) {
        console.log("MongoDb connection failed: ",error)
    }
}

export default connectDB; 