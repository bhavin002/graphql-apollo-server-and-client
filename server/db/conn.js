import mongoose from "mongoose";

const db = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/graphql");
        console.log('Connected to MongoDB Successfully');
    } catch (error) {
        console.log(error);
    }
}

export default db;