import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';

const CreatePolicy = () => {
  const location = useLocation();
  const userId = location.state.userId;
  const [formData, setFormData] = useState({
    policyName: '',
    totalAmount: '',
    premiumAmount: '',
    duration: ''
  });
  const [errors, setErrors] = useState({});
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePolicyForm = () => {
    const { policyName, totalAmount, premiumAmount, duration } = formData;
    const newErrors = {};

    if (!policyName.trim()) {
      newErrors.policyName = 'Policy name is required.';
    }

    if (!totalAmount.trim() || isNaN(totalAmount) || totalAmount <= 0 || totalAmount > 1000000) {
      newErrors.totalAmount = 'Total sum assured must be a positive number and less than or equal to 1000000.';
    }

    if (!premiumAmount.trim() || isNaN(premiumAmount) || premiumAmount <= 0 || premiumAmount > 1000000) {
      newErrors.premiumAmount = 'Premium amount must be a positive number and less than or equal to 1000000.';
    }

    if (!duration.trim() || isNaN(duration) || duration <= 0 || duration > 100) {
      newErrors.duration = 'Duration must be a positive number and less than or equal to 100 years.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      if (!validatePolicyForm()) {
        throw new Error("Form details are invalid!");
      }
      const token = localStorage.getItem('token');
      // const response = await axios.post('http://localhost:3000/api/policies/createPolicy', formData, {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/policies/createPolicy`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Handle success, e.g., show success message
      alert("Policy Created Successfully!!")
      // Navigate to wherever needed
      navigate("/admin", { state: { userId: userId } });
    } catch (error) {
      // Handle error, e.g., show error message
      alert(error.response.data.error);
      setError(error.message || 'An error occurred while creating the policy');
    } finally {
      setIsCreating(false);
    }
  };
  

return (
  <div className="main1 mt-20">
    <div className='bg-opacity-50 backdrop-filter backdrop-blur-md flex-col w-[400px] p-6 rounded shadow-lg text-center'>
      <h2 className='text-xl font-bold border-b-[1px] border-gray-400 text-left mb-4'>Create Policy</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="policyName" className="block text-sm font-medium text-gray-700">Policy Name</label>
          <input
            type="text"
            id="policyName"
            name="policyName"
            value={formData.policyName}
            onChange={handleChange}
            className="border-[1.5px] border-gray-300 mt-1 p-2 block w-full rounded-md focus:ring-slate-500 focus:border-slate-500"
            placeholder="Policy Name"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700">Total Amount</label>
          <input
            type="number"
            id="totalAmount"
            name="totalAmount"
            value={formData.totalAmount}
            onChange={handleChange}
            className="border-[1.5px] border-gray-300 mt-1 p-2 block w-full rounded-md focus:ring-slate-500 focus:border-slate-500"
            placeholder="Total Amount"
            required
          />
          {errors.totalAmount && <p className="text-red-500">{errors.totalAmount}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="premiumAmount" className="block text-sm font-medium text-gray-700">Premium Amount</label>
          <input
            type="number"
            id="premiumAmount"
            name="premiumAmount"
            value={formData.premiumAmount}
            onChange={handleChange}
            className="border-[1.5px] border-gray-300 mt-1 p-2 block w-full rounded-md focus:ring-slate-500 focus:border-slate-500"
            placeholder="Premium Amount"
            required
          />
          {errors.premiumAmount && <p className="text-red-500">{errors.premiumAmount}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration (in years)</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="border-[1.5px] border-gray-300 mt-1 p-2 block w-full rounded-md focus:ring-slate-500 focus:border-slate-500"
            placeholder="Duration"
            required
          />
          {errors.duration && <p className="text-red-500">{errors.duration}</p>}
        </div>
        <button type="submit" className='block w-[130px] h-[40px] mx-auto px-2 py-1 text-white bg-slate-800 hover:bg-slate-600 mt-4'>
         {isCreating ? "Creating" : 'Create Policy'}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  </div>
);
}

export default CreatePolicy;
