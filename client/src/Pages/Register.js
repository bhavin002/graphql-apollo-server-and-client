import React, { useState } from 'react'
import { Toaster, toast } from "react-hot-toast";
import "../style/Form.css";
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../gql/gqlMutation';


const Register = () => {

  // const [signUpUser, { data, error, loading }] = useMutation(SIGNUP_USER);
  const [signUpUser] = useMutation(SIGNUP_USER);

  const [info, setInfo] = useState({
    fname: "",
    lname: "",
    email: "",
    password: ""
  })

  const handleChangeInfo = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value
    })
  }


  const crtAc = async (e) => {
    e.preventDefault();
    const { fname, lname, email, password } = info;
    if (!fname || !lname || !email || !password) {
      toast.error("All Fields Are Required");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      toast.error("Enter The Valid Email")
    } else {
      try {
        const {data} = await signUpUser({
          variables: {
            newUser: info
          }
        })
        toast.success(data.user.fname);
        setInfo({ ...info, fname: "", lname: "", email: "", password: "" });
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
            <h1 className='logo'>Create Account</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor='fname'>Enter your Fname</label>
              <input type="text" className="form-control" onChange={handleChangeInfo} value={info.fname} name='fname' id='fname' placeholder="First name" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor='lname'>Enter your Lname</label>
              <input type="text" className="form-control" onChange={handleChangeInfo} value={info.lname} name='lname' id='lname' placeholder="Last name" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor='email'>Email</label>
              <input type="email" className="form-control" onChange={handleChangeInfo} value={info.email} name='email' id='email' placeholder="Email address" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor='password'>Password</label>
              <input type="password" className="form-control" onChange={handleChangeInfo} value={info.password} name='password' id='password' placeholder="Password" />
            </div>
          </div>
        </div>
        <button className='btnRegister mt-3 w-100' onClick={crtAc}>Create Account</button>
      </form>
      <Toaster />
    </div>
  )
}

export default Register;