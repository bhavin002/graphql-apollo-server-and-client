import mongoose from "mongoose";

const QuoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    desc: {
        type: String,
        required: [true, "Desc Is Required"]
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})
const Quote = mongoose.model("Quote", QuoteSchema);
export default Quote;