import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div className="main1 h-[90vh] flex md:justify-center items-start flex-col lg:text-[100px] md:text-xl">
        <div >
            Welcome to TS Healthcare
        </div>
        <div className="main1 md:text-xl sm:text-lg my-20">
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
