import User from "../models/User.js";
import Quote from "../models/Quote.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApolloError, UserInputError } from "apollo-server";

const resolvers = {
    Query: {
        users: async () => await User.find({}),
        quotes: async () => await Quote.find({}).populate("author", "_id fname"),
        user: async (_, { _id }) => await User.findOne({ _id }),
        quote: async (_, { author }) => await Quote.find({ author }),
        userProfile: async (_, args, { _id }) => await User.findById({_id})
    },
    User: {
        quotes: async (parent) => await Quote.find({ author: parent._id })
    },
    Mutation: {
        signUpUser: async (_, { signUpInfo }) => {
            const isUniqe = await User.findOne({ email: signUpInfo.email })
            if (isUniqe) {
                throw new UserInputError("The Email already exist!");
            }
            if (!isUniqe) {
                const hashPassword = await bcrypt.hash(signUpInfo.password, 10);
                const user = new User({
                    ...signUpInfo,
                    password: hashPassword
                })
                return await user.save();
            }
        },
        signInUser: async (_, { signInInfo }) => {
            const isValidEmail = await User.findOne({ email: signInInfo.email })
            if (isValidEmail) {
                const isValidPassword = await bcrypt.compare(signInInfo.password, isValidEmail.password);
                if (isValidPassword) {
                    const token = jwt.sign({ _id: isValidEmail._id }, process.env.SECRET_KEY, { expiresIn: "7d" })
                    return { token };
                } else {
                    throw new UserInputError("Password does not match");
                }
            } else {
                throw new UserInputError("Email does not exists");
            }
        },
        createQuote: async (_, { createQuoteInfo }, { _id }) => {
            if (!_id) {
                throw new ApolloError('You Must Be LogIn!');
            }
            const newQuote = new Quote({
                ...createQuoteInfo,
                author: _id
            })
            await newQuote.save();
            return "Saved Successfully"
        },
        updateUser: async (_, { UpdateUserInfo }, { _id }) => {
            if (!_id) { throw new ApolloError('You Must Be LogIn!'); }
            try {
                await User.findByIdAndUpdate({ _id }, { $set: { ...UpdateUserInfo, } }, { new: true });
                return "update user successfully"
            } catch (error) {
                console.log(error);
            }
        }
    }
}

export default resolvers;