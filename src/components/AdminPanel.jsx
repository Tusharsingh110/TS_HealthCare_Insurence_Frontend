import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AdminClaimCard from "./AdminClaimCard";

const AdminPanel = () => {
  const location = useLocation();
  const userId = location.state.userId;
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          // `http://localhost:3000/api/claims/allClaims`,
          `${process.env.REACT_APP_BACKEND_URL}/api/claims/allClaims`,
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
      }
    };

    fetchClaims();
  }, []);

  const handleApproveClaim = async (claimId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        // `http://localhost:3000/api/claims/updateClaimStatusById/${claimId}`,
        `${process.env.REACT_APP_BACKEND_URL}/api/claims/updateClaimStatusById/${claimId}`,
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
        // `http://localhost:3000/api/claims/updateClaimStatusById/${claimId}`,
        `${process.env.REACT_APP_BACKEND_URL}/api/claims/updateClaimStatusById/${claimId}`,
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

  return (
    <div className="admin-panel max-w-[1600px] mx-auto">
      <div className="main1 md:text-4xl sm:text-2xl my-4 py-2"> TS Health Insurance</div>
      <div className="main1 my-4 pb-2 md:text-3xl ">
        Welcome to the Administrator Panel
      </div>
      <div className="my-4 max-w-[1600px] mx-4 pb-2 md:text-lg font-bold text-left border-gray-400 border-b-[1px]">
        All Claims
      </div>
      <div className="max-w-[1600px] pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mx-auto justify-center text-center">
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
