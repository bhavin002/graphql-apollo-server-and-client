import { useQuery } from '@apollo/client';
import React from 'react'
import { GET_ALL_QUOTES } from '../gql/gqlQuerys';
import { useNavigate } from 'react-router-dom';

const Quotes = () => {

  //get all quote by using fetch method with graphql query

  // useEffect(() => {
  //   fetch("http://localhost:4000/",
  //     {
  //       method: 'POST',
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         query: `query getAllQuotes{
  //       quotes{
  //         title
  //         desc
  //         author{
  //           fname
  //         }
  //       }
  //     }
  //     `
  //       })
  //     }).then(res => res.json()).then(data => console.log(data))
  // }, [])

  // get specific user quote using pass the id as variable

  // useEffect(() => {
  //   fetch("http://localhost:4000/",
  //     {
  //       method: 'POST',
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         query: `query getUserById($userID:ID!){
  //           user(_id:$userID){
  //             fname
  //             lname
  //             quotes{
  //               title
  //               desc
  //             }
  //           }
  //         }`,
  //         variables: {
  //           userID: "64ba6f8d7eac7ff70a076b4d"
  //         }
  //       })
  //     }).then(res => res.json()).then(data => console.log(data))
  // }, [])


  const { loading, error, data } = useQuery(GET_ALL_QUOTES);
  const navigate = useNavigate();
  if (loading) return <h1>Loading...</h1>
  if (error) { console.log(error); }

  const randomUser = (id) => {
    navigate(`/profile/${id}`);
  }


  return (
    <div className="container mt-5">
      {
        data.quotes.map((quote) => {
          return (
            <div className="row" key={quote._id}>
              <div className="col-2">
                <p className="lead">{quote.title}</p>
              </div>
              <div className="col-9">
                <p className="title">{quote.desc}</p>
              </div>
              <div className="col-1">
                <p className="lead" style={{ cursor: "pointer" }} onClick={() => { randomUser(quote.author._id) }}>~{quote.author.fname}</p>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Quotes;