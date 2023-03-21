import React, {useEffect, useState} from 'react';
import {useSelector, dispatch} from '../redux';

import { useLocation, Link, useNavigate } from "react-router-dom";
import {login} from './store/actions'


const Login = () => {
    const {user, authenticated}=useSelector((s)=>s.session)
    const [error, setError]=useState(null)
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    function handleSubmit(event) {
        event.preventDefault();
        setError(null)
        let formData = new FormData(event.currentTarget);
        let email = formData.get("email") ?? 'email@mail.com';
        let password = formData.get("password") ?? 'password1'
        dispatch(login({email, password}));
    }

    useEffect(()=>{
        if(authenticated){
            navigate(from, { replace: true });
        }
    },[authenticated])

    return (
        <div className='container'>
            <div className="content">
                <div className="" style={{ padding: '10rem' }}>

                    <h1 style={{ marginBottom: '3rem' }}>
                        Login  Page
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email"/>
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="password"/>
                        </div>
                        {error ? <div className="alert alert-danger">{error}</div>: null}
                        
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                   
                </div>
            </div>
        </div>
    )
}

export default Login;