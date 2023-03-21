import React from 'react';
import { useNavigate, } from "react-router-dom";
import {useSelector, dispatch} from '../redux';
import {logout} from './store/actions'


const Profile = () => {
  const {user, authenticated}=useSelector((s)=>s.session)
  let navigate = useNavigate();

  const handlelogout =()=>{
    dispatch(logout());
    
  }

  if (!authenticated) {
    return <p>You are not logged in.</p>;
  }

  return (
    <div className='container'>
      <div className="content">
        <div className="" style={{ padding: '10rem' }}>

          <h1 style={{ marginBottom: '3rem' }}>
            Login  Page
          </h1>
          <p>
            Welcome {user?.email}!{" "}
            <br/>
            <button
            className="btn btn-primary"
              onClick={handlelogout}
            >
              Sign out
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;