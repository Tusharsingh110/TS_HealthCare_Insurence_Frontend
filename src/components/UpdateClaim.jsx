import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateClaim = () => {
    const location = useLocation();
    const data = location.state;
    const navigate = useNavigate();

    const [claimDetails, setClaimDetails] = useState({
        userId: '',
        policyId: '',
        amount: '',
        status: ''
    });

    useEffect(() => {
        const fetchClaimDetails = async () => {
            try {
                // Get JWT token from localStorage
                const token = localStorage.getItem('token');

                // Make API request to fetch claim details with JWT token in headers
                // const response = await axios.get(`http://localhost:3000/api/claims/getClaimById/${data.claim._id}`, {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/claims/getClaimById/${data.claim._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setClaimDetails(response.data);
            } catch (error) {
                console.error('Error fetching claim details:', error);
            }
        };

        fetchClaimDetails();
    }, [data.claim._id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClaimDetails({ ...claimDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // Get JWT token from localStorage
          const token = localStorage.getItem('token');
          
          // Make API request to update claim with JWT token in headers
        //   const response = await axios.put(`http://localhost:3000/api/claims/updateClaim/${data.claim._id}`, {
          const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/claims/updateClaim/${data.claim._id}`, {
            userId: claimDetails.userId,
            policyId: claimDetails.policyId,
            status : claimDetails.status,
            amount: claimDetails.amount
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          // Alert the user
          alert('Claim updated successfully!');
        } catch (error) {
          console.error('Error updating claim:', error);
          // Handle error, e.g., show error message to user
        }
        // Navigate to userDashboard or wherever you want
        navigate("/userDashboard", { state: { userId: claimDetails.userId } });
      };

    return (
        <div className="main1 mt-20">
            <div className='bg-opacity-50 backdrop-filter backdrop-blur-md flex-col w-[400px] p-6 rounded shadow-lg text-center'>
                <h2 className='text-xl font-bold border-b-[1px] border-gray-400 text-left mb-4'>Update Claim</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="userId" className="block text-sm font-medium text-gray-700">User ID</label>
                        <input
                            type="text"
                            id="userId"
                            name="userId"
                            value={claimDetails.userId}
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-slate-500 focus:border-slate-500"
                            placeholder="User ID"
                            disabled
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="policyId" className="block text-sm font-medium text-gray-700">Policy ID</label>
                        <input
                            type="text"
                            id="policyId"
                            name="policyId"
                            value={claimDetails.policyId}
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-slate-500 focus:border-slate-500"
                            placeholder="Policy ID"
                            disabled
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Claim Amount</label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={claimDetails.amount}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-slate-500 focus:border-slate-500"
                            placeholder="Claim Amount"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                        <input
                            type="text"
                            id="status"
                            name="status"
                            value={claimDetails.status}
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-slate-500 focus:border-slate-500"
                            placeholder="Status"
                            disabled
                        />
                    </div>
                    <button onClick={handleSubmit} type="submit" className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-600">Update Claim</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateClaim;
