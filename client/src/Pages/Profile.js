import React, { useEffect } from 'react'
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PROFILE } from '../gql/gqlQuerys';

const Profile = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!auth?.token) {
            navigate("/login");
        }
    })

    const { loading, error, data } = useQuery(GET_PROFILE);
    if (loading) return <h1>Loading...</h1>
    if (error) { console.log(error); }

    return (
        <div className="container m-5 p-3 text-center">
            <div className="row">
                <div className="col-12">
                    <img src={`https://robohash.org/${data.userProfile.fname}.png`} alt="profile" width="130px" style={{ border: "2px solid black", padding: "10px", borderRadius: "50%" }} />
                    <h1 className="title my-3">{data.userProfile.fname} {data.userProfile.lname}</h1>
                    <h2 className="lead my-3">{data.userProfile.email}</h2>
                </div>
            </div>
            {
                data.userProfile.quotes.map((quote) => {
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

export default Profile;