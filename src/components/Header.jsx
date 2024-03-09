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
    <div className='lg:max-w-[1700px] mx-auto md:flex items-center justify-between p-4 text-slate-800 text-center border-b-[1px] border-gray-200'>
      <div className='lg:text-4xl md:text-xl sm:text-md '>Claims Management System</div>
      {loggedIn ? (
        <div className='flex gap-4 text-md'>
          {/* <button>Show Profile</button>
          <button>Update Profile</button> */}
          <button className='mx-auto border-red-600 border-[1.5px] p-2 hover:bg-red-600 text-red-600 mt-6 md:mt-0  hover:text-white' onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <div className='flex gap-4 text-md'>
          <Link to="/signin">
            
        <button className='border hidden md:block p-2 w-[100px] border-gray-[2px] my-2 hover:bg-gray-600 hover:text-white'>Sign In</button>
            </Link>
          <Link to="/register">
            
        <button className='border hidden md:block p-2 w-[100px] border-gray-[2px] my-2 hover:bg-gray-600 hover:text-white'>Register</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
