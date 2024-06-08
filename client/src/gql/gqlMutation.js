import { gql } from "@apollo/client";

const SIGNUP_USER = gql`
mutation signUpUser($newUser:signUp!){
    user:signUpUser(signUpInfo:$newUser){
      fname
    }
  }
`;

const SIGNIN_USER = gql`
mutation signInUser($newUser:signIn!){
    token:signInUser(signInInfo:$newUser){
        token
    }
  }`

const CREATE_QUOTE = gql`
mutation createQuote($newQuote:createQuote!){
  createQuote(createQuoteInfo:$newQuote)
}
`
export { SIGNUP_USER, SIGNIN_USER,CREATE_QUOTE };