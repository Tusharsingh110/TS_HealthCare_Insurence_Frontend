import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AdminClaimCard from "./AdminClaimCard";
import { useNavigate } from "react-router-dom";
import AdminPolicyCard from "./AdminPolicyCard";

const AdminPanel = () => {
  
  const location = useLocation();
  const userId = location.state.userId;
  const [claims, setClaims] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [loadingPolicies, setLoadingPolicies] = useState(false);
  const [loadingClaims, setLoadingClaims] = useState(false);
  const navigate  = useNavigate();
  const [reloadKeyPolicy, setReloadKeyPolicy] = useState(0);
  const handlePolicyDelete = () => {
      setReloadKeyPolicy(prevKey => prevKey + 1); // Update the key to force remounting PolicyCard
    };

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        setLoadingClaims(true);
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `http://localhost:3000/api/claims/allClaims`,
          // `${process.env.REACT_APP_BACKEND_URL}/api/claims/allClaims`,
          { userId: userId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },    
          }
        );
        setClaims(response.data);
      } catch (error) {
        console.error("Error fetching claims:", error);
      } finally {
        setLoadingClaims(false);
      }
    };

    fetchClaims();
  }, []);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        setLoadingPolicies(true);
        const response = await axios.get(
          `http://localhost:3000/api/policies/allPolicies`
          // `${process.env.REACT_APP_BACKEND_URL}/api/policies/allPolicies`
        );
        setPolicies(response.data);
      } catch (error) {
        console.error("Error fetching policies:", error);
      } finally {
        setLoadingPolicies(false);
      }
    };

    fetchPolicies();
  }, [reloadKeyPolicy]);

  const handleApproveClaim = async (claimId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3000/api/claims/updateClaimStatusById/${claimId}`,
        // `${process.env.REACT_APP_BACKEND_URL}/api/claims/updateClaimStatusById/${claimId}`,
        {
          status: "approved",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the status of the claim in the local state
      setClaims((prevClaims) => {
        return prevClaims.map((claim) => {
          if (claim._id === claimId) {
            return { ...claim, status: "approved" };
          }
          return claim;
        });
      });
    } catch (error) {
      console.error("Error approving claim:", error);
    }
  };

  const handleRejectClaim = async (claimId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3000/api/claims/updateClaimStatusById/${claimId}`,
        // `${process.env.REACT_APP_BACKEND_URL}/api/claims/updateClaimStatusById/${claimId}`,
        {
          status: "rejected",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the status of the claim in the local state
      setClaims((prevClaims) => {
        return prevClaims.map((claim) => {
          if (claim._id === claimId) {
            return { ...claim, status: "rejected" };
          }
          return claim;
        });
      });
    } catch (error) {
      console.error("Error rejecting claim:", error);
    }
  };
  const handleCreatePolicy = () => {
    navigate('/createPolicy', {state:{userId: userId}})
  }




  return (
    <div className="admin-panel max-w-[1600px] mx-auto mb-6">
      <div className="main1 md:text-4xl text-xl my-4 py-2"> TS Health Insurance</div>
      <div className="main1 my-4 pb-2 md:text-3xl ">
        Welcome to the Administrator Panel
      </div>
      <div className="mx-6">
      <div className="flex max-w-[1600px] mx-auto justify-between border-gray-400 border-b-[1px] flex-wrap">
      <div className="pb-2 pt-6 text-lg font-bold ">
        All Plans
      </div>
      <button className='border p-2 border-gray-[2px] my-2  text-sm h-md   bg-gray-800 hover:bg-gray-600 text-white' onClick={handleCreatePolicy}>Create Plan</button>
      </div>
      {policies.length === 0 ? (
        <div className="lg:text-lg pt-10 md:text-md max-w-[1600px] mx-auto text-gray-600">{loadingPolicies ? `Loading Policies...` : 'Nothing to show here.'}

        </div>
      ) : (
        <div className='max-w-[1600px] md:text-sm sm:text-[25px] mx-auto justify-center text-center grid lg:grid-cols-4 md:grid-cols-2 gap-3'>
          {policies.map((policy) => (
            <AdminPolicyCard 
            key={policy._id} 
            policy={policy}
            userId={userId}
            onDelete={handlePolicyDelete}/>
          ))}
        </div>
      )}
      <div className="flex max-w-[1600px] mx-auto justify-between border-gray-400 border-b-[1px] flex-wrap">
        <div className="pb-2 pt-6 text-lg font-bold">All Claims</div>
      </div>
      {claims.length === 0 ? (
        <div className="lg:text-lg pt-10 md:text-md max-w-[1600px] mx-auto text-gray-600">{loadingClaims ? `Loading Claims...` : 'Nothing to show here.'}</div>
      ) : (
        <div className='max-w-[1600px] md:text-sm sm:text-[25px] mx-auto justify-center text-center grid lg:grid-cols-4 md:grid-cols-2 gap-3'>
        {claims.map((claim) => (
          <AdminClaimCard
            key={claim._id}
            claim={claim}
            onApprove={() => handleApproveClaim(claim._id)}
            onReject={() => handleRejectClaim(claim._id)}
          />
        ))}
      </div>
      )}
      </div>
    </div>
  );
};

export default AdminPanel;
