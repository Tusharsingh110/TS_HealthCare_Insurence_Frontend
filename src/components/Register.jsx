import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
const SITE_KEY = "6Lf1ro0pAAAAAFg9zG9H2YKxvSKpXFt-E0YKNshM";

function Register() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState("");
  const captchaRef = useRef();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const values = { ...formData };
    values[e.target.name] = e.target.value;
    setFormData(values);
  };

  const validateForm = () => {
    // Basic validation for required fields
    const { username, email, password, dob } = formData;
    if (!username || !email || !password || !dob) {
      setError("All fields are required.");
      return false;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }
  
    // Check if the user is at least 18 years old
    const dobDate = new Date(dob);
    const currentDate = new Date();
    const ageDifference = currentDate.getFullYear() - dobDate.getFullYear();
    const isUnder18 = ageDifference < 18 || (ageDifference === 18 && currentDate.getMonth() < dobDate.getMonth()) || (ageDifference === 18 && currentDate.getMonth() === dobDate.getMonth() && currentDate.getDate() < dobDate.getDate());
    if (isUnder18) {
      setError("You must be at least 18 years old to register.");
      return false;
    }
    return true;
  };
  

  const handleRegister = async () => {
    try {
      if (!validateForm()) return;

      captchaRef.current.reset();
      // const response = await axios.post(`http://localhost:3000/api/users/signup`,{ ...formData, recaptchaValue } );
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/signup`,{ ...formData, recaptchaValue } );
      alert("User Created Successfully!!!");
      navigate('/signIn');
    } catch (error) {
      alert(error.response.data.error);
      setError(error.response.data.error);
    }
  };

  const onChange = (value) => {
    setRecaptchaValue(value);
  };

  return (
    <div className="main1 max-w-[1700px] mx-auto flex-col gap-10 pt-10">
      <div className="text-4xl">Register</div>
      <input
        className="w-[300px] border-[1px] p-2 border-slate-800"
        type="text"
        placeholder="Username"
        name="username"
        value={formData.username || ""}
        onChange={handleChange}
        required
      />
      <input
        className="w-[300px] border-[1px] p-2 border-slate-800"
        type="email"
        placeholder="Email"
        name="email"
        value={formData.email || ""}
        onChange={handleChange}
        required
      />
      <input
        className="w-[300px] border-[1px] p-2 border-slate-800"
        type="password"
        placeholder="Password"
        name="password"
        value={formData.password || ""}
        onChange={handleChange}
        minLength={8}
        required
      />
      <input
        className="w-[300px] border-[1px] p-2 border-slate-800"
        type="date"
        placeholder="Date of Birth"
        name="dob"
        value={formData.dob || ""}
        onChange={handleChange}
        required
      />
      <div className="">
        <ReCAPTCHA sitekey={SITE_KEY} onChange={onChange} ref={captchaRef} />
      </div>
      <button
        className="border p-2 w-[80px] border-gray-[2px] my-2 hover:bg-gray-800 bg-gray-600 text-white"
        onClick={handleRegister}
      >
        Register
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Register;
