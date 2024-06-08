import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { Toaster, toast } from "react-hot-toast";
import { SIGNIN_USER } from '../gql/gqlMutation';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

const Login = () => {

  const [signInUser] = useMutation(SIGNIN_USER);

  const { logIn } = useAuth();

  const [info, setInfo] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate();

  const handleChangeInfo = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value
    })
  }

  const signIn = async (e) => {
    e.preventDefault();
    const { email, password } = info;
    if (!email || !password) {
      toast.error("All Fields Are Required");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      toast.error("Enter The Valid Email")
    } else {
      try {
        const { data } = await signInUser({
          variables: {
            newUser: info
          }
        });
        localStorage.setItem("authItem", data.token.token);
        logIn(data.token.token);
        setInfo({ ...info, email: "", password: "" });
        navigate("/");
      } catch (error) {
        toast.error(error.message);
      }
    }
  }

  return (
    <div className="container d-flex justify-content-center">
      <form className="form border m-4 p-5" autoComplete='off'>
        <div className="row">
          <div className="col-md-12">
            <h1 className='logo'>Sign In</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-control" onChange={handleChangeInfo} value={info.email} name='email' placeholder="Email address" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" onChange={handleChangeInfo} value={info.password} name='password' placeholder="Password" />
            </div>
          </div>
        </div>
        <button className='btnLogin mt-3 w-100' onClick={signIn}>Login</button>
      </form>
      <Toaster />
    </div>
  )
}

export default Login;