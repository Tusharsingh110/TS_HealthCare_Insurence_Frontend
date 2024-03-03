import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../contexts/LoginContext';

const Header = () => {
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if a token exists in local storage
    const token = localStorage.getItem('token');
    if (token) {
      // If token exists, set loggedIn to true
      setLoggedIn(true);
    }
  }, []); // Run this effect only once on component mount

  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem('token');
    // Set loggedIn to false
    setLoggedIn(false);
    // Navigate to /signin path
    navigate('/signin');
  };

  return (
    <div className='max-w-[1700px] mx-auto flex items-center justify-between p-4 text-slate-800 text-center border-b-[1px] border-gray-200'>
      <div className='text-4xl'>Claims Management System</div>
      {loggedIn ? (
        <div className='flex gap-4 text-md'>
          {/* <button>Show Profile</button>
          <button>Update Profile</button> */}
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <div className='flex gap-4 text-md'>
          <Link to="/signin"><button>Sign In</button></Link>
          <Link to="/register"><button>Register</button></Link>
        </div>
      )}
    </div>
  );
}

export default Header;
