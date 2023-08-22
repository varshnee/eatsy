import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

function Login() {
   const [email,setEmail]=useState('');
   const [pwd,setPwd]=useState('');
   const [redirect,setRedirect]=useState(false);
   const {setUser} = useContext(UserContext);

   async function SubmitUser(e){
    e.preventDefault();
    try{
      const { data } = await axios.post('/login', { email, pwd }, { withCredentials: true });
      setUser(data);
      alert('login successful');
      setRedirect(true);
    }
    catch(e){
      console.log("Error at login.jsx :",e);
      alert('login failed');
    }
   }

   if(redirect){
    return <Navigate to={'/'}/>
   }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-64 w-full max-w-lg mx-auto'>
        <h1 className='text-4xl text-center mb-4'>Login</h1>
        <form className='max-w-md mx-auto' onSubmit={SubmitUser}>
          <div className='w-full border my-1 py-2 px-3 rounded-2xl 140px'>
            <input type="email" placeholder='user@email.com'
            value={email}
            onChange={e=>{setEmail(e.target.value)}}
            />
          </div>
          <div className='w-full border my-1 py-2 px-3 rounded-2xl 140px'>
            <input type="password" placeholder='password'
            value={pwd}
            onChange={e=>{setPwd(e.target.value)}}
            />
          </div>
          <div>
            <button className='bg-red-500 p-2 my-3 w-full text-white rounded-2xl'>
              Login
            </button>
          </div>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?
            <Link className='underline text-black' to="/register">Register now!</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
