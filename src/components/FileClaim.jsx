import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FileClaim = () => {
  const [loading,isLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [claimDetails, setClaimDetails] = useState({
    policyId: '',
    policyName: '',
    claimAmount: ''
  });

  // Get the policy from the location state
  const { state: { policy } } = location;

   // Get the token from localStorage
   const token = localStorage.getItem('token');
    
   // Make API request to file claim with authorization header

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClaimDetails({ ...claimDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    isLoading(true)
    e.preventDefault();
    try {
      // Make API request to file claim
      // console.log(policy.policyId +' '+policy.userId+' '+claimDetails.claimAmount);
      if(claimDetails.claimAmount < 0) {
        alert('Amount can not be less than 0');
        throw new Error('Amount is less than 0');
      }
      // const response = await axios.post(`http://localhost:3000/api/claims/createClaim`, {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/claims/createClaim`, {
        policyId: policy.policyId,
        userId: policy.userId,
        amount: claimDetails.claimAmount
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      );
      // Navigate to userDashboard
      navigate('/userDashboard', { state: { userId: policy.userId } });
    } catch (error) {
      console.error('Error filing claim:', error);
      // Handle error, e.g., show error message to user
    } finally {
      isLoading(false);
  }
    // Reset form after submission
    setClaimDetails({
      policyId: '',
      policyName: '',
      claimAmount: ''
    });
  };

  return (
    <div className="main1 mt-20">
      <div className='bg-opacity-50  backdrop-filter backdrop-blur-md flex-col w-[400px] p-6 rounded shadow-lg text-center'>
        <h2 className='text-xl font-bold border-b-[1px] border-gray-400 text-left mb-4'>File a Claim</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="policyId" className="block text-sm font-medium text-gray-700">Policy ID</label>
            <input
              type="text"
              id="policyId"
              name="policyId"
              value={policy.policyId}
              onChange={handleChange}
              className="border-[1.5px] border-gray-300 mt-1 p-2 block w-full  rounded-md focus:ring-slate-500 focus:border-slate-500"
              placeholder="Enter Policy ID"
              disabled
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="policyName" className="block text-sm font-medium text-gray-700">Policy Name</label>
            <input
              type="text"
              id="policyName"
              name="policyName"
              value={policy.policyName}
              onChange={handleChange}
              className="border-[1.5px] border-gray-300 mt-1 p-2 block w-full  rounded-md focus:ring-slate-500 focus:border-slate-500"
              placeholder="Enter Policy Name"
              disabled
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="claimAmount" className="block text-sm font-medium text-gray-700">Claim Amount</label>
            <input
              type="number"
              id="claimAmount"
              name="claimAmount"
              value={claimDetails.claimAmount}
              onChange={handleChange}
              className="border-[1.5px] border-gray-300 mt-1 p-2 block w-full  rounded-md focus:ring-slate-500 focus:border-slate-500"
              placeholder="Enter Claim Amount"
              required
            />
          </div>
            
        <button type='submit' className='border p-2 w-[120px] border-gray-[2px] my-2 hover:bg-gray-800 bg-gray-600 text-white'>
          {loading ? 'Submitting...': 'Submit Claim'}
            </button>
        </form>
      </div>
    </div>
  );
}

export default FileClaim;
