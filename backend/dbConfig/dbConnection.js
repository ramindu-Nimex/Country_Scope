import mongoose from "mongoose";

// implement the connection to the database
const dbConnection = async () => {
    try {
        const dbConnection = await mongoose.connect(process.env.MONGO_DB_URL).then(() => {
            console.log('DB Connected Successfully');
        }) 
    } catch (error) {
        console.log("DB Error: " + error);
    }
}

export default dbConnection;