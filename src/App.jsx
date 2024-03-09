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
import Home from './components/Home';
import ListPolicies from './components/ListPolicies';
import CreatePolicy from './components/CreatePolicy';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  
  return (
    <LoginContext.Provider value={{loggedIn, setLoggedIn}}>
    <Router>
      <div className="gradient"></div>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/register' element={<Register/>}/>
        <Route path='/signIn'  element={<SignIn/>}/>  
        <Route path='/admin'  element={<AdminPanel/>}/>  
        <Route path='/userDashboard'  element={<UserDashboard/>}/>  
        <Route path='/fileClaim'  element={<FileClaim/>}/>  
        <Route path='/updateClaim'  element={<UpdateClaim/>}/>  
        <Route path='/listPolicies'  element={<ListPolicies/>}/>  
        <Route path='/createPolicy'  element={<CreatePolicy/>}/>  
        <Route path='/*'  element={<Home/>}/>  
      </Routes>

    </Router>
        </LoginContext.Provider>
  );
};

export default App;