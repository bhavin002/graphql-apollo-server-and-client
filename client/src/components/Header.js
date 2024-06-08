import React from 'react'
import { NavLink } from 'react-router-dom';
import "../style/Header.css";
import { useAuth } from '../context/auth';

const Header = () => {
    const { auth, logIn } = useAuth();
    const logOut = () => {
        localStorage.removeItem("authItem");
        logIn("");
    }

    return (
        <div className="header">
            <div className="container">
                <div className="row py-2">
                    <div className="col-md-6">
                        <NavLink to="/" className="headerLink" style={{ fontSize: "40px" }}>QuotesApp</NavLink>
                    </div>
                    <div className="col-md-6 d-flex justify-content-end pt-3">
                        {
                            auth.token ? <>
                                <NavLink to="/profile" className="headerLink px-4 pt-2">Profile</NavLink>
                                <NavLink to="/createquotes" className="headerLink px-4 pt-2">CreateQuotes</NavLink>
                                <button className='btn btn-danger px-4' onClick={logOut}>LogOut</button>
                            </> : <>
                                <NavLink to="/login" className="headerLink px-4">Login</NavLink>
                                <NavLink to="/register" className="headerLink px-4">Register</NavLink>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;