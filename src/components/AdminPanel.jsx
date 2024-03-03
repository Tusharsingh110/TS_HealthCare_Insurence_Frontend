import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import AdminClaimCard from "./AdminClaimCard"; // Import AdminClaimCard component
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const location = useLocation();
  const userId = location.state.userId;
  const [claims, setClaims] = useState([]);
//   console.log(userId)
  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve JWT token from localStorage
        const response = await axios.post(
          "http://localhost:3000/api/claims/allClaims",
          { userId: userId },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include JWT token in the Authorization header
            },
          }
        );
        setClaims(response.data);
      } catch (error) {
        console.error("Error fetching claims:", error);
      }
    };

    fetchClaims();
  }, []);

  const handleApproveClaim = async (claimId) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve JWT token from localStorage

      // Find the claim in the claims array by its id
      const claim = claims.find((claim) => claim._id === claimId);
      if (!claim) {
        console.error("Claim not found");
        return;
      }

      const { userId, policyId, amount } = claim;

      const response = await axios.put(
        `http://localhost:3000/api/claims/updateClaim/${claimId}`,
        {
          userId,
          policyId,
          amount,
          status: "approved",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include JWT token in the Authorization header
          },
        }
      );

      // Update the status of the claim in the local state
      setClaims((prevClaims) => {
        return prevClaims.map((claim) => {
          if (claim._id === claimId) {
            // Update the status of the claim
            return { ...claim, status: "approved" };
          }
          return claim;
        });
      });

    //   console.log("Claim approved:", response.data);
    } catch (error) {
      console.error("Error approving claim:", error);
      // Handle errors here
    }
  };

  const handleRejectClaim = async (claimId) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve JWT token from localStorage

      // Find the claim in the claims array by its id
      const claim = claims.find((claim) => claim._id === claimId);
      if (!claim) {
        console.error("Claim not found");
        return;
      }

      const { userId, policyId, amount } = claim;

      const response = await axios.put(
        `http://localhost:3000/api/claims/updateClaim/${claimId}`,
        {
          userId,
          policyId,
          amount,
          status: "rejected",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include JWT token in the Authorization header
          },
        }
      );

      // Update the status of the claim in the local state
      setClaims((prevClaims) => {
        return prevClaims.map((claim) => {
          if (claim._id === claimId) {
            // Update the status of the claim
            return { ...claim, status: "rejected" };
          }
          return claim;
        });
      });

    //   console.log("Claim rejected:", response.data);
    } catch (error) {
      console.error("Error rejecting claim:", error);
      // Handle errors here
    }
  };

  return (
    <div className="admin-panel">
        
        <div className='main1 text-4xl my-4 py-2'> TS Health Insurance</div>
        
        <div className="main1 my-4 pb-2 text-3xl ">Welcome to the Administrator Panel</div>
      <div className="my-4 max-w-[1600px] pb-2 text-lg font-bold text-left ml-20 border-gray-400 border-b-[1px]">
        All Policies
      </div>
      <div className="max-w-[1600px] md:text-sm sm:text-[25px] mx-auto text-center grid lg:gap-5 md:gap-3 lg:grid-cols-4 sm:grid-cols-3">
        {claims.map((claim) => (
          <AdminClaimCard
            key={claim._id}
            claim={claim}
            onApprove={() => handleApproveClaim(claim._id)}
            onReject={() => handleRejectClaim(claim._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
