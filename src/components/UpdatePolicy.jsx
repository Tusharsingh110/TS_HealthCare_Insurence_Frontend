import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const UpdatePolicy = () => {
  const location = useLocation();
  const data = location.state;
  const policy = data.policy;
  const userId = data.userId;

  const navigate = useNavigate();
  const [updating, setUpdating] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [updatedPolicy, setUpdatedPolicy] = useState({
    policyName: policy.policyName,
    totalAmount: policy.totalAmount,
    premiumAmount: policy.premiumAmount,
    duration: policy.duration,
  });
//   console.log(policy)
//   console.log(updatedPolicy)
  const handleChange = (e) => {
    setUpdatedPolicy({ ...updatedPolicy,  [e.target.name]: e.target.value});
  };

  const validatePolicyForm = () => {
    const { policyName, totalAmount, premiumAmount, duration } = updatedPolicy;
    const newErrors = {};

    if (!policyName.trim()) {
      newErrors.policyName = 'Policy name is required.';
    }

    if (!totalAmount.toString().trim() || isNaN(totalAmount) || totalAmount <= 0 || totalAmount > 1000000) {
      newErrors.totalAmount = 'Total sum assured must be a positive number and less than or equal to 1000000.';
    }

    if (!premiumAmount.toString().trim() || isNaN(premiumAmount) || premiumAmount <= 0 || premiumAmount > 1000000) {
      newErrors.premiumAmount = 'Premium amount must be a positive number and less than or equal to 1000000.';
    }

    if (!duration.toString().trim() || isNaN(duration) || duration <= 0 || duration > 100) {
      newErrors.duration = 'Duration must be a positive number and less than or equal to 100 years.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
        const token = localStorage.getItem('token');
        if (!validatePolicyForm()) {
            throw new Error("Form details are invalid!");
          }
      // Make API request to update policy
      await axios.put(
        `http://localhost:3000/api/policies/updatePolicybyId/${policy._id}`,
        // `${process.env.REACT_APP_BACKEND_URL}/api/policies/updatePolicybyId/${policy._id}`,
        updatedPolicy , {
            headers: { Authorization: `Bearer ${token}` }
        }
      );
      // Navigate to user dashboard or wherever needed after successful update
      alert('Policy updated Successfully!!')
      navigate("/admin",{state:{userId:userId}});
    } catch (error) {
        // Handle error, e.g., show error message
        // alert(error.response.data.error);
        setError(error.message || 'An error occurred while creating the policy');
    } finally {
      setUpdating(false);
    }
  };



  return (
    <div className="main1 mt-20">
      <div className="bg-opacity-50 backdrop-filter backdrop-blur-md flex-col w-[400px] p-6 rounded shadow-lg text-center">
        <h2 className="text-xl font-bold border-b-[1px] border-gray-400 text-left mb-4">
          Update Plan
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="policyName"
              className="block text-sm font-medium text-gray-700"
            >
              Plan Name
            </label>
            <input
              type="text"
              id="policyName"
              name="policyName"
              value={updatedPolicy.policyName}
              onChange={handleChange}
              className="border-[1.5px] border-gray-300 mt-1 p-2 block w-full rounded-md focus:ring-slate-500 focus:border-slate-500"
              placeholder="Policy Name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="totalAmount"
              className="block text-sm font-medium text-gray-700"
            >
              Total Sum Assured (In Rs)
            </label>
            <input
              type="number"
              id="totalAmount"
              name="totalAmount"
              value={updatedPolicy.totalAmount}
              onChange={handleChange}
              className="border-[1.5px] border-gray-300 mt-1 p-2 block w-full rounded-md focus:ring-slate-500 focus:border-slate-500"
              placeholder="Total Sum Assured"
              required
            />
            {errors.totalAmount && <p className="text-red-500">{errors.totalAmount}</p>}
          </div>
          <div className="mb-4">
            <label
              htmlFor="premiumAmount"
              className="block text-sm font-medium text-gray-700"
            >
              Premium Amount (In Rs)
            </label>
            <input
              type="number"
              id="premiumAmount"
              name="premiumAmount"
              value={updatedPolicy.premiumAmount}
              onChange={handleChange}
              className="border-[1.5px] border-gray-300 mt-1 p-2 block w-full rounded-md focus:ring-slate-500 focus:border-slate-500"
              placeholder="Premium Amount"
              required
            />
          {errors.premiumAmount && <p className="text-red-500">{errors.premiumAmount}</p>}
          </div>
          <div className="mb-4">
            <label
              htmlFor="duration"
              className="block text-sm font-medium text-gray-700"
            >
              Duration (in years)
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={updatedPolicy.duration}
              onChange={handleChange}
              className="border-[1.5px] border-gray-300 mt-1 p-2 block w-full rounded-md focus:ring-slate-500 focus:border-slate-500"
              placeholder="Duration (in years)"
              required
            />
          {errors.duration && <p className="text-red-500">{errors.duration}</p>}
          </div>
          <button
            type="submit"
            className="block w-[130px] h-[40px] mx-auto px-2 py-1 text-white bg-slate-800 hover:bg-slate-600 mt-4"
            disabled={updating}
          >
            {updating ? "Updating.." : "Update Plan"}
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default UpdatePolicy;
