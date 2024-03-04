import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
function Register({ history }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');
  const navigate =useNavigate();
  const handleRegister = async () => {
    try {
      // const response = await axios.post(`http://localhost:3000/api/users/signup`, {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/signup`, {
        username,
        email,
        password,
        dob,
      });
    ////   console.log(response)
       alert("User Created Successfully!!!"); // Assuming the response contains some information about the registration
      navigate('/signIn')
    ////   history.push('/signin'); // Redirect to signin page upon successful registration
    } catch (error) {
      alert(error.response.data.msg)
      setError(error.response.data.message);
    }
  };
  

  return (
    <div className='main1 flex-col gap-10 pt-10'>
      <div className='text-4xl'>Register</div>
      <input
        className='w-[300px] border-[1px] p-2 border-slate-800'
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className='w-[300px] border-[1px] p-2 border-slate-800'
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className='w-[300px] border-[1px] p-2 border-slate-800'
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className='w-[300px] border-[1px] p-2 border-slate-800'
        type="date"
        placeholder="Date of Birth"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
      />
      <button className='border-2 px-2 py-1  border-gray-900' onClick={handleRegister}>Register</button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Register;
