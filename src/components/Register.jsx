import React, { useState,useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
const SITE_KEY = '6Lf1ro0pAAAAAFg9zG9H2YKxvSKpXFt-E0YKNshM'
function Register() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const [recaptchaValue,setRecaptchaValue] = useState('')
  const captchaRef = useRef();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const values = { ...formData };
    values[e.target.name] = e.target.value;
    setFormData(values);
  };

  const handleRegister = async () => {
    try {
      captchaRef.current.reset();
      const response = await axios.post(`http://localhost:3000/api/users/signup`, {...formData, recaptchaValue});
      // const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/signup`, formData);
      alert("User Created Successfully!!!");
      // navigate('/signIn');
    } catch (error) {
      alert(error.response.data.error);
      setError(error.response.data.error);
    }
  };
  const onChange = (value) => {
    setRecaptchaValue(value)
  }

  return (
    <div className='main1 flex-col gap-10 pt-10'>
      <div className='text-4xl'>Register</div>
      <input
        className='w-[300px] border-[1px] p-2 border-slate-800'
        type="text"
        placeholder="Username"
        name="username"
        value={formData.username || ''}
        onChange={handleChange}
      />
      <input
        className='w-[300px] border-[1px] p-2 border-slate-800'
        type="email"
        placeholder="Email"
        name="email"
        value={formData.email || ''}
        onChange={handleChange}
      />
      <input
        className='w-[300px] border-[1px] p-2 border-slate-800'
        type="password"
        placeholder="Password"
        name="password"
        value={formData.password || ''}
        onChange={handleChange}
      />
      <input
        className='w-[300px] border-[1px] p-2 border-slate-800'
        type="date"
        placeholder="Date of Birth"
        name="dob"
        value={formData.dob || ''}
        onChange={handleChange}
      />
      <div className="">
        <ReCAPTCHA 
          sitekey={SITE_KEY}
          onChange={onChange}
          ref={captchaRef}
        />
      </div>
      <button className='border-2 px-2 py-1  border-gray-900' onClick={handleRegister}>Register</button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Register;
