import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminPolicyCard = ({userId, policy, onDelete }) => {
const [deleting,setDeleting] = useState(false)
const navigate = useNavigate();

const handleDelete = async () => {
    try {
        
      const token = localStorage.getItem('token'); // Retrieve JWT token from local storage
      setDeleting(true); // Show deleting text in the button
      // Send a POST request to delete the policy
      // await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/policies/deletePolicyById/`, {
      await axios.post('http://localhost:3000/api/policies/deletePolicyById/', {
        userId: policy.userId,
        policyId: policy._id
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
      alert(error.response.data.error)
      console.error('Error deleting policy:', error);
    } finally {
      setDeleting(false); // Reset deleting state after request completion
    }
  };
  const handleEdit = () => {
    navigate('/updatePolicy',{state: {policy:policy,userId:userId}})
  }

  return (
    <div className='bg-opacity-50 mt-2 backdrop-filter backdrop-blur-md flex-col w-[320px] p-6 rounded shadow-lg text-center'>
      <h2 className='md:text-lg lg:text-md font-bold border-b-[1px] border-gray-400 text-left'>{policy.policyName}</h2>
      <div className="flex justify-between pt-4">
        <span className='font-semibold'>Total Sum Assured: </span>
        <span>Rs {policy.totalAmount}</span>
      </div>
      <div className="flex justify-between py-1">
        <span className='font-semibold'>Premium Amount:</span>
        <span>Rs {policy.premiumAmount}</span>
      </div>
      <div className="flex justify-between pb-4">
        <span className='font-semibold'>Duration: </span>
        <span>{policy.duration} years</span>
      </div>

      <div className='flex justify-around'>
        <button onClick={handleEdit} className='block md:w-[80px] md:h-[30px]  px-2 py-1 text-white bg-slate-800 hover:bg-slate-600 mt-4'>
          Edit
        </button>
        <button onClick={handleDelete} className='block md:w-[80px] md:h-[30px] px-2 py-1 hover:bg-red-600 border-[1.5px] border-red-600 hover:text-white text-red-600  mt-4'>
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>      
      
    </div>
  );
}

export default AdminPolicyCard;
