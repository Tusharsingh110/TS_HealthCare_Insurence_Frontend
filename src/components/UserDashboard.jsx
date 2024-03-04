import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/global.css'
import { useLocation } from 'react-router-dom';
import PolicyCard from './PolicyCard.jsx';
import ClaimsCard from './ClaimCard.jsx'; // Assuming you have created the ClaimsCard component

const UserDashboard = () => {
  const location = useLocation();
  const userId = location.state.userId;
  const token = localStorage.getItem('token'); // Retrieve JWT token from local storage

  const [userPolicies, setUserPolicies] = useState([]);
  const [userClaims, setUserClaims] = useState([]);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const fetchUserPolicies = async () => {
      try {
        // Fetch user policies array with authorization token in headers
        // const response = await axios.get(`http://localhost:3000/api/users/getUserById/${userId}`, {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/getUserById/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}` // Include JWT token in request headers
          }
        });
        const userPoliciesData = response.data.policies;
        setUserData(response.data);
        // Fetch policy details for each policy
        const policiesWithDetails = await Promise.all(userPoliciesData.map(async (policy) => {
          const policyId = policy.policyId; // Assuming the policy object has a policyId field
          // const policyDetailResponse = await axios.get(`http://localhost:3000/api/policies/getPolicyById/${policyId}`, {
          const policyDetailResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/policies/getPolicyById/${policyId}`, {
            headers: {
              Authorization: `Bearer ${token}` // Include JWT token in request headers
            }
          });
          const policyDetail = policyDetailResponse.data;
          // console.log(policyDetail)
          return {userId, ...policy, ...policyDetail };
        }));

        setUserPolicies(policiesWithDetails);
      } catch (error) {
        console.error('Error fetching user policies:', error);
      }
    };

    const fetchUserClaims = async () => {
      try {
        // Fetch user claims array with authorization token in headers
        // const response = await axios.get(`http://localhost:3000/api/claims/claimsByUserId/${userId}`, {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/claims/claimsByUserId/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}` // Include JWT token in request headers
          }
        });
        setUserClaims(response.data);
      } catch (error) {
        console.error('Error fetching user claims:', error);
      }
    };

    fetchUserPolicies();
    fetchUserClaims();
  }, [userId, token]);

  return (
    <div className="user-dashboard">
      <div className='my-4 flex-col gap-6 text-center'>
        <div className='text-4xl my-4 py-2'> TS Health Insurance</div>
        <div className="main1 my-4 pb-2 text-3xl ">Welcome, {userData.username}</div>
        <div className="my-4 max-w-[1600px] pb-2 text-lg font-bold text-left ml-20 border-gray-400 border-b-[1px]">Your Policies</div>
        <div className='max-w-[1600px] md:text-sm sm:text-[25px] mx-auto text-center grid lg:gap-5 md:gap-3 lg:grid-cols-4 sm:grid-cols-3'>
          {userPolicies.map((policy) => (
            <PolicyCard key={policy._id} policy={policy}/>
          ))}
        </div>
        <div className="my-4 max-w-[1600px] pb-2 text-lg font-bold text-left ml-20 border-gray-400 border-b-[1px]">Your Claims</div>
        <div className=' max-w-[1600px] md:text-sm sm:text-[25px] mx-auto text-center grid lg:gap-5 md:gap-3 lg:grid-cols-4 sm:grid-cols-3'>
          {userClaims.map((claim) => (
            <ClaimsCard key={claim._id} claim={claim} userPolicies={userPolicies} />
          ))}
        </div>
      </div>
    </div>
  );
}


export default UserDashboard;
