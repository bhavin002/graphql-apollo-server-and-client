import jwt from "jsonwebtoken";

const context = ({ req }) => {
    const token = req.headers.authorization;
    if (token) {
        const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
        return { _id: decodeToken._id }
    }
}

export default context;