import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FileClaim = () => {
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
    e.preventDefault();
    try {
      // Make API request to file claim
      // console.log(policy.policyId +' '+policy.userId+' '+claimDetails.claimAmount);
      const response = await axios.post('http://localhost:3000/api/claims/createClaim', {
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
      // console.log('Claim filed successfully:', response.data);
      // Alert the user
      alert('Claim filed successfully!');
      // Navigate to userDashboard
      navigate('/userDashboard', { state: { userId: policy.userId } });
    } catch (error) {
      console.error('Error filing claim:', error);
      // Handle error, e.g., show error message to user
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
              className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-slate-500 focus:border-slate-500"
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
              className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-slate-500 focus:border-slate-500"
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
              className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-slate-500 focus:border-slate-500"
              placeholder="Enter Claim Amount"
              required
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-600">Submit Claim</button>
        </form>
      </div>
    </div>
  );
}

export default FileClaim;
