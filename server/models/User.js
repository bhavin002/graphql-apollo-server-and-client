import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: [true, "First Name is Required"]
    },
    lname: {
        type: String,
        required: [true, 'Last name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
})
const User = mongoose.model("User", UserSchema);
export default User;