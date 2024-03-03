import React from 'react';

const AdminClaimCard = ({ claim, onApprove, onReject }) => {
  // Convert createdAt date string to Date object
  const createdAtDate = new Date(claim.createdAt);

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

  return (
    <div className='bg-opacity-50 backdrop-filter backdrop-blur-md flex-col w-[320px] p-6 rounded shadow-lg text-center'>
      <h2 className='text-xl font-bold border-b-[1px] border-gray-400 text-left'>Claim ID: {claim._id}</h2>
      <div className="flex justify-between pt-4">
        <span className='font-semibold'>Policy ID:</span>
        <span>{claim.policyId}</span>
      </div>
      <div className="flex justify-between py-1">   
        <span className='font-semibold'>User Id:</span>
        <span>{claim.userId}</span>
      </div>
      <div className="flex justify-between py-1">   
        <span className='font-semibold'>Claim Amount:</span>
        <span>Rs {claim.amount}</span>
      </div>
      <div className="flex justify-between py-1">   
        <span className='font-semibold'>Created At:</span>
        <span>{createdAtDate.toLocaleString()}</span>
      </div>
      <div className={`flex justify-between pb-4 ${statusColor}`}>
        <span className='font-semibold'>Status: </span>
        <span>{claim.status}</span>
      </div>
      {claim.status !== 'approved' && claim.status !== 'rejected' && (
        <div className="flex justify-between">
          <button onClick={() => onApprove(claim._id)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Approve
          </button>
          <button onClick={() => onReject(claim._id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            Reject
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminClaimCard;
