import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
const ClaimsCard = React.memo(({ claim, userPolicies, onDelete }) => {
  // console.log(claim)
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  // Convert createdAt date string to Date object
  const createdAtDate = new Date(claim.createdAt);
  // console.log(claim)
  let statusColor;
  switch (claim.status) {
    case 'approved':
      statusColor = 'text-green-600';
      break;
    case 'pending':
      statusColor = 'text-yellow-600';
      break;
    case 'rejected':
      statusColor = 'text-red-600';
      break;
    default:
      statusColor = 'text-gray-600';
  }

  const handleClaim = () => {
    // Navigate to the fileClaim route and pass the policy state
    navigate('/updateClaim', { state: { claim, userPolicies } });
  };

  // Find policy name based on policyId
  const policy = userPolicies.find((policy) => policy._id === claim.policyId);

  const handleDelete = async () => {
    try {
      const token  = localStorage.getItem('token');
      setDeleting(true); // Show deleting text in the button
      // Send a POST request to delete the policy
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/claims/deleteClaimById/`, {
      // await axios.post('http://localhost:3000/api/claims/deleteClaimById/', {
        userId: claim.userId,
        claimId: claim._id
      } ,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      );
      // After successful deletion, trigger the onDelete callback
      onDelete();
      // console.log('Claim deleted successfully');
    } catch (error) {
      console.error('Error deleting claim:', error);
    } finally {
      setDeleting(false); // Reset deleting state after request completion
    }
  };

  return (
    <div className='bg-opacity-50 mt-2 backdrop-filter backdrop-blur-md flex-col w-[320px] p-6 rounded shadow-lg text-center'>
      <h2 className='text-xl font-bold border-b-[1px] border-gray-400 text-left'>Claim ID: {claim._id}</h2>
      <div className="flex justify-between pt-4">
        <span className='font-semibold'>Policy Name: </span>
        <span>{policy ? policy.policyName : 'N/A'}</span>
      </div>
      <div className="flex justify-between py-1">   
        <span className='font-semibold'>Created At:</span>
        <span>{createdAtDate.toLocaleString()}</span>
      </div>
      <div className="flex justify-between py-1">   
        <span className='font-semibold'>Amount:</span>
        <span>Rs {claim.amount}</span>
      </div>
      <div className={`flex justify-between pb-4 ${statusColor}`}>
        <span className='font-semibold'>Status: </span>
        <span>{claim.status}</span>
      </div>
      <div className="flex justify-around">
      {claim.status === 'pending' ? 
        <button onClick={handleClaim} className='block w-[80px] h-[30px] px-2 py-1 text-white bg-slate-800 hover:bg-slate-600 mt-4'>
        Update
      </button> : ''
      }
      <button onClick={handleDelete} disabled={deleting} className='block md:w-[80px] md:h-[30px] px-2 py-1 hover:bg-red-600 border-[1.5px] border-red-600 hover:text-white text-red-600  mt-4'>
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
});

export default ClaimsCard;
