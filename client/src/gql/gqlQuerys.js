import { gql } from "@apollo/client";

const GET_ALL_QUOTES = gql`
query getAllQuotes{
  quotes{
    _id
    title
    desc
    author{
      _id
      fname
    }
  }
}
`;

const GET_PROFILE = gql`
query getUserByAuthorization{
  userProfile{
    fname
    lname
    email
    quotes{
      _id
      title
      desc
    }
  }
}
`

const GET_USER_BY_ID = gql`
query getUserById($userID:ID!){
  user(_id:$userID){
    fname
    lname
    email
    quotes{
      _id
      title
      desc
    }
  }
}`

export { GET_ALL_QUOTES, GET_PROFILE, GET_USER_BY_ID };