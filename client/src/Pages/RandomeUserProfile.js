import React from 'react'
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../gql/gqlQuerys';

const RandomeUserProfile = () => {
    const { id } = useParams();
    console.log(id);
    const { loading, error, data } = useQuery(GET_USER_BY_ID, {
        variables: {
            userID: id
        }
    });
    if (loading) return <h1>Loading...</h1>
    if (error) { console.log(error); }
    if (data) { console.log(data); }
    return (
        <div className="container m-5 p-3 text-center">
            <div className="row">
                <div className="col-12">
                    <img src={`https://robohash.org/${data.user.fname}.png`} alt="profile" width="130px" style={{ border: "2px solid black", padding: "10px", borderRadius: "50%" }} />
                    <h1 className="title my-3">{data.user.fname} {data.user.lname}</h1>
                    <h2 className="lead my-3">{data.user.email}</h2>
                </div>
            </div>
            {
                data.user.quotes.map((quote) => {
                    return (
                        <div className="row mt-4" key={quote._id}>
                            <div className="col-6">
                                <p className="lead">{quote.title}</p>
                            </div>
                            <div className="col-6">
                                <p className="title">{quote.desc}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default RandomeUserProfile;