import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [pwd,setPwd]=useState("");


  const registerUser = async (e) => {
    e.preventDefault();
    
    try {
      console.log({ name, email, pwd });
      const response = await axios.post('/register', { name, email, pwd });
      
      // Assuming your backend returns the created user data in the response
      const newUser = response.data;
      
      alert("Success");
      setName("");
      setEmail("");
      setPwd("");
    } catch (error) {
      console.error('Error:', error);
      alert('Error while submitting the form. Please try again later.');
    }
  };
  
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input className="w-full border my-1 py-2 px-3 rounded-2xl 140px" type="text"
                 placeholder="your name"
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 />
          <input className="w-full border my-1 py-2 px-3 rounded-2xl 140px" type="email"
                 placeholder="your@email.com"
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}
                 />
          <input className="w-full border my-1 py-2 px-3 rounded-2xl 140px" type="password"
                 placeholder="password"
                 value={pwd}
                 onChange={(e)=>setPwd(e.target.value)}
                 />
          <button className="bg-red-500 p-2 my-3 w-full text-white rounded-2xl">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member? <Link className="underline text-black" to={'/login'}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;