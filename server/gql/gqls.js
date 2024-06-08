import { gql } from "apollo-server" // gql for create schema

const typeDefs = gql`
    type Query{
        users:[User]
        quotes:[QuoteWithFname]
        user(_id:ID!):User
        quote(author:ID!):[Quote]
        userProfile:User
    }

    type QuoteWithFname{
        _id:String
        title:String,
        desc:String,
        author:IdName
    }
    
    type IdName{
        _id:String,
        fname:String
    }

    type User{
        _id:ID!
        fname:String!
        lname:String!
        email: String!
        password:String!
        quotes:[Quote]
    }
    type Quote{
        _id:ID!
        title:String!
        desc:String!
        author:String!
    }
    
    type Token{
        token:String
    }

    type Mutation{
        signUpUser(signUpInfo:signUp!):User
        signInUser(signInInfo:signIn!):Token
        createQuote(createQuoteInfo:createQuote!):String
        updateUser(UpdateUserInfo:updateUserInfo!):String
    }

    input signIn{
        email:String!
        password:String!
    }

    input signUp{
        fname:String!
        lname:String!
        email:String!
        password:String!
    }

    input updateUserInfo{
        fname:String!
        lname:String!
    }

    input createQuote{
        title:String!
        desc:String!
    }
`
export default typeDefs;