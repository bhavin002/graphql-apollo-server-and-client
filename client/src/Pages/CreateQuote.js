import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { useMutation } from '@apollo/client';
import { CREATE_QUOTE } from '../gql/gqlMutation';
import { toast, Toaster } from 'react-hot-toast';
import { GET_ALL_QUOTES, GET_PROFILE, GET_USER_BY_ID } from '../gql/gqlQuerys';

const CreateQuote = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!auth.token) {
            navigate("/login");
        }
    })
    const [info, setInfo] = useState({
        title: "",
        desc: ""
    })
    const [createQuotes] = useMutation(CREATE_QUOTE, {
        refetchQueries: [{ query: GET_ALL_QUOTES }, { query: GET_PROFILE }, { query: GET_USER_BY_ID }]
    });
    const handleChangeInfo = (e) => {
        const { name, value } = e.target;
        setInfo({
            ...info,
            [name]: value
        })
    }

    const crtQuote = async (e) => {
        e.preventDefault();
        const { title, desc } = info;
        if (!title || !desc) {
            toast.error("All Fields Are Required");
        } else {
            try {
                const { data } = await createQuotes({
                    variables: {
                        newQuote: info
                    }
                })
                if (data) {
                    toast.success(data.createQuote)
                    setInfo({ ...info, title: "", desc: "" })
                }
            } catch (error) {
                toast.error(error.message)
            }
        }
    }

    return (
        <div className="container d-flex justify-content-center">
            <form className="form border m-4 p-5" autoComplete='off'>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor='title'>Title</label>
                            <input type="text" className="form-control" onChange={handleChangeInfo} value={info.title} name='title' id='title' placeholder="Title" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor='desc'>Description</label>
                            <input type="text" className="form-control" onChange={handleChangeInfo} value={info.desc} name='desc' id='desc' placeholder="Description" />
                        </div>
                    </div>
                </div>
                <button className='btnRegister mt-3 w-100' onClick={crtQuote}>Create Quote</button>
            </form>
            <Toaster />
        </div>
    )
}

export default CreateQuote;