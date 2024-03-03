import React from 'react';
import Header from './components/Header';
import './styles/global.css'
import {useState} from 'react';
import SignIn from './components/Signin';
import Register from './components/Register';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserDashboard from './components/UserDashboard';
import FileClaim from './components/FileClaim';
// import BuyPolicy from './components/BuyPolicy';
import {LoginContext} from './contexts/LoginContext'
import AdminPanel from './components/AdminPanel';
import UpdateClaim from './components/UpdateClaim';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  
  return (
    <LoginContext.Provider value={{loggedIn, setLoggedIn}}>
    <Router>
      <div className="gradient"></div>
      <Header />
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/signIn'  element={<SignIn/>}/>  
        <Route path='/admin'  element={<AdminPanel/>}/>  
        <Route path='/userDashboard'  element={<UserDashboard/>}/>  
        <Route path='/fileClaim'  element={<FileClaim/>}/>  
        <Route path='/updateClaim'  element={<UpdateClaim/>}/>  
        {/* <Route path='/buyPolicy'  element={<BuyPolicy/>}/>   */}
      </Routes>

    </Router>
        </LoginContext.Provider>
  );
};

export default App;