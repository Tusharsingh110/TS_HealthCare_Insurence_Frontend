import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const ListPolicies = () => {
  const [policies, setPolicies] = useState([]);
  const location = useLocation();
  const userId = location.state.userId;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const token = localStorage.getItem('token');
        // const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/policies/policiesByUserId/${userId}`, {
        const response = await axios.get(`http://localhost:3000/api/policies/policiesByUserId/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPolicies(response.data);
      } catch (error) {
        console.error('Error fetching policies:', error);
      }
    };

    fetchPolicies();
  }, []);

  const handleBuyPolicy = async (policyId, index) => {
    try {
      const token = localStorage.getItem('token');
      const requestData = {
        userId: userId,
        policyId: policyId
      };

      // Create a copy of policies array to modify the state
      const updatedPolicies = [...policies];
      // Set loading state for the clicked policy card
      updatedPolicies[index].isBuying = true;
      setPolicies(updatedPolicies);

    //   await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/policies/buyPolicy`, requestData, {
      await axios.post(`http://localhost:3000/api/policies/buyPolicy`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      navigate('/userDashboard', { state: { userId } });
    } catch (error) {
      alert(error.response.data.error);
      console.error('Error buying policy:', error);
    }
  };

  return (
    <>
      <div className="my-4 max-w-[1600px] mx-auto pb-2 text-lg  font-bold text-left border-gray-400 border-b-[1px]">All Policies</div>
      <div className="max-w-[1600px] mx-auto justify-center grid lg:grid-cols-3 md:grid-cols-2 gap-6">
        {policies.map((policy, index) => (
          <div key={policy._id} className="bg-opacity-50 backdrop-filter backdrop-blur-md flex-col w-[320px] p-6 rounded shadow-lg text-center">
            <h2 className="text-xl font-bold border-b-[1px] border-gray-400 text-left">{policy.policyName}</h2>
            <div className="flex justify-between pt-4">
              <span className="font-semibold">Total Amount:</span>
              <span>Rs {policy.totalAmount}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-semibold">Premium Amount:</span>
              <span>Rs {policy.premiumAmount}</span>
            </div>
            <div className="flex justify-between pb-4">
              <span className="font-semibold">Duration:</span>
              <span>{policy.duration} years</span>
            </div>

            <button
              disabled={policy.isBuying || policy.bought}
              onClick={() => handleBuyPolicy(policy._id, index)}
              className={`block px-2 py-1 text-white bg-slate-800 rounded-lg mt-4 ${
                policy.bought ? '' : 'hover:bg-slate-600'
              }`}
            >
              {policy.bought ? 'Bought Already' : policy.isBuying ? 'Buying...' : 'Buy Policy'}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListPolicies;
