import React from 'react';
import { useNavigate } from 'react-router-dom';

const PolicyCard = ({ policy }) => {
  const navigate = useNavigate();
  // console.log(policy)
  // Calculate policy expiry date
  const expiryDate = new Date(policy.expiresOn);
  
  // Calculate policy availed date
  const availedDate = new Date(expiryDate);
  availedDate.setFullYear(expiryDate.getFullYear() - policy.duration);

  const handleClaim = () => {
    // Navigate to the fileClaim route and pass the policy state
    navigate('/fileClaim', { state: { policy } });
  };
  
  return (
    <div className=' bg-opacity-50 backdrop-filter backdrop-blur-md flex-col w-[320px] p-6 rounded shadow-lg text-center '>
      <h2 className='text-xl font-bold border-b-[1px] border-gray-400 text-left'>{policy.policyName}</h2>
      <div className="flex justify-between pt-4">
        <span className='font-semibold'>Policy Availed Date: </span>
        <span>{availedDate.toLocaleDateString()}</span>
      </div>
      <div className="flex justify-between py-1">
        <span className='font-semibold'>Policy Expiry Date:</span>
        <span>{expiryDate.toLocaleDateString()}</span>
      </div>
      <div className="flex justify-between pb-4">
        <span className='font-semibold'>Amount left: </span>
        <span>Rs {policy.claimableAmount}</span>
      </div>
      <button onClick={handleClaim} className='block px-2 py-1 text-white bg-slate-800 hover:bg-slate-600 rounded-lg mt-4'>
        Claim
      </button>
    </div>
  );
}

export default PolicyCard;
