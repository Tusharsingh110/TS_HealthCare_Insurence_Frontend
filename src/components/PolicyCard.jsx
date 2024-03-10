import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PolicyCard = ({ policy, onDelete }) => {
  // console.log(policy)
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
  const token = localStorage.getItem('token'); // Retrieve JWT token from local storage

  // Calculate policy expiry date 
  const expiryDate = new Date(policy.expiresOn);
  
  // Calculate policy availed date
  const availedDate = new Date(expiryDate);
  availedDate.setFullYear(expiryDate.getFullYear() - policy.duration);

  const handleClaim = () => {
    // Navigate to the fileClaim route and pass the policy state
    navigate('/fileClaim', { state: { policy } });
  };

  const handleDelete = async () => {
    try {
      setDeleting(true); // Show deleting text in the button
      // Send a POST request to delete the policy
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/policies/deletePolicyForUser/`, {
      // await axios.post('http://localhost:3000/api/policies/deletePolicyForUser/', {
        userId: policy.userId,
        policyId: policy.policyId
      } ,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      );
      // After successful deletion, trigger the onDelete callback
      onDelete();
      // console.log('Policy deleted successfully');
    } catch (error) {
      console.error('Error deleting policy:', error);
    } finally {
      setDeleting(false); // Reset deleting state after request completion
    }
  };
  
  return (
    <div className=' bg-opacity-50 mt-2 backdrop-filter backdrop-blur-md flex-col w-[320px] p-6 rounded shadow-lg text-center '>
      <h2 className='md:text-lg lg:text-md font-bold border-b-[1px] border-gray-400 text-left'>{policy.policyName}</h2>
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

      <div className='flex justify-around'>
        <button onClick={handleClaim} className='block md:w-[80px] md:h-[30px]  px-2 py-1 text-white bg-slate-800 hover:bg-slate-600 mt-4'>
          Claim
        </button>
        <button onClick={handleDelete} disabled={deleting} className='block md:w-[80px] md:h-[30px] px-2 py-1 hover:bg-red-600 border-[1.5px] border-red-600 hover:text-white text-red-600  mt-4'>
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>      
      
    </div>
  );
};

export default PolicyCard;
