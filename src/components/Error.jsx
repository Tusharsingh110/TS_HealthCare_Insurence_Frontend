import React, { useEffect, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 10000);

    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [navigate]);

  return (
    <div className='max-w-screen-lg flex-col mt-[20vh] justify-between items-center mx-auto  text-center text-6xl md:text-xl'>
      <div className="p-2"> Feeling lost eh, mate!! 😫</div>
      <div className="p-1"> Let me take you back Home. 🤝</div>
      <div className="p-2"> Going back to 
      
      <Link to="/" className='text-blue-800  px-[6px]'>
         <u>Home</u>
          </Link>
       in {countdown} seconds</div>
    </div>
  );
};

export default Error;
