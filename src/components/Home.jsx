import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div className="main1 h-[91vh] items-start flex-col">
        <div className='text-[150px]'>
            Welcome to TS Healthcare
        </div>
        <div className="main1 text-3xl mb-20">
            Please  
            <Link to="/signin">
                <button className='px-2'><u>Sign In</u></button>
                </Link>
             or
          <Link to="/register">
            <button className='px-2'><u>Register</u></button>
            </Link>
            to Continue.
        </div>
    </div>
  )
}

export default Home
