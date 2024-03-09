import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/global.css'
import { useLocation, useNavigate } from 'react-router-dom';
import PolicyCard from './PolicyCard.jsx';
import ClaimsCard from './ClaimCard.jsx';

const UserDashboard = () => {
  const [reloadKeyPolicy, setReloadKeyPolicy] = useState(0);
  const [reloadKeyClaim, setReloadKeyClaim] = useState(0);

  const handlePolicyDelete = () => {
    setReloadKeyPolicy(prevKey => prevKey + 1); // Update the key to force remounting PolicyCard
  };
  const handleClaimDelete = () => {
    setReloadKeyClaim(prevKey => prevKey + 1); // Update the key to force remounting ClaimCard
  };
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state.userId;
  // console.log(userId)
  const token = localStorage.getItem('token'); // Retrieve JWT token from local storage

  const [userPolicies, setUserPolicies] = useState([]);
  const [userClaims, setUserClaims] = useState([]);
  const [userData, setUserData] = useState({});
  const [loadingPolicies, setLoadingPolicies] = useState(false);
  const [loadingClaims, setLoadingClaims] = useState(false);
  
  useEffect(() => {
    setLoadingPolicies(true);
    const fetchUserPolicies = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/getUserById/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });   
        const userPoliciesData = response.data.policies;
        setUserData(response.data);
        const policiesWithDetails = await Promise.all(userPoliciesData.map(async (policy) => {
          const policyId = policy.policyId;
          const policyDetailResponse = await axios.get(`http://localhost:3000/api/policies/getPolicyById/${policyId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const policyDetail = policyDetailResponse.data;
          return { userId, ...policy, ...policyDetail };
        }));
        setUserPolicies(policiesWithDetails);
      } catch (error) {
        console.error('Error fetching user policies:', error);
      } finally {
        setLoadingPolicies(false)
      }
    };
  
    const fetchUserClaims = async () => {
      setLoadingClaims(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/claims/claimsByUserId/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserClaims(response.data);
      } catch (error) {
        console.error('Error fetching user claims:', error);
      } finally {
        setLoadingClaims(false)
      }
    };
  
    fetchUserClaims();
    fetchUserPolicies();
  }, [userId, token, reloadKeyPolicy,reloadKeyClaim]);

  const handleBuyPolicies = () => {
    // Navigate to the listPolicies route and pass the userId as state
    navigate('/listPolicies', { state: {userId: userId } });
  };

  return (
    <div className="user-dashboard">
    <div className='my-4 flex-col gap-6 text-center'>
      <div className='text-4xl my-4 py-2'> TS Health Insurance</div>
      <div className="main1 my-4 pb-2 text-3xl ">Welcome, {userData.username}</div>
      <div className="flex max-w-[1600px] mx-auto justify-between border-gray-400 border-b-[1px] flex-wrap">
        <div className="pb-2 pt-6 text-lg font-bold ">Your Policies</div>
        <button className='border p-2 border-gray-[2px] my-2  bg-gray-800 hover:bg-gray-600 text-white' onClick={handleBuyPolicies}>
          Buy Policies</button>
      </div>
      {userPolicies.length === 0 ? (
        <div className="lg:text-lg pt-10 md:text-md max-w-[1600px] mx-auto text-gray-600">{loadingPolicies ? `Loading Policies...` : 'Nothing to show here.'}

        </div>
      ) : (
        <div className='max-w-[1600px] md:text-sm sm:text-[25px] mx-auto justify-center text-center grid lg:grid-cols-4 md:grid-cols-2 gap-3'>
          {userPolicies.map((policy) => (
            <PolicyCard 
            key={policy._id} 
            policy={policy} 
            onDelete={handlePolicyDelete}/>
          ))}
        </div>
      )}
      <div className="flex max-w-[1600px] mx-auto justify-between border-gray-400 border-b-[1px] flex-wrap">
        <div className="pb-2 pt-6 text-lg font-bold">Your Claims</div>
      </div>

      {userClaims.length === 0 ? (
        <div className="lg:text-lg pt-10 md:text-md max-w-[1600px] mx-auto text-gray-600">{loadingClaims ? `Loading Claims...` : 'Nothing to show here.'}</div>
      ) : (
        <div className='max-w-[1600px] md:text-sm sm:text-[25px] mx-auto justify-center text-center grid lg:grid-cols-4 md:grid-cols-2 gap-3'>
        {userClaims.map((claim) => (
          <ClaimsCard
           key={claim._id}
            claim={claim}
             userPolicies={userPolicies}
              onDelete={handleClaimDelete} />
        ))}
      </div>
      )}
    </div>
</div>

  );
}

export default UserDashboard;
