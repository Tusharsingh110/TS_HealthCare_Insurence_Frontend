import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const BuyPolicy = ({ userId = "", policyId = "" }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);


  return (
    <div className="main1">
      <h2>Buy Policy</h2>
      {/* {error && <div className="error">{error}</div>}
      {success && <div className="success">Policy purchased successfully!</div>} */}
      <button onClick={handleBuyPolicy} disabled={loading}>
        {loading ? 'Loading...' : 'Buy Policy'}
      </button>
    </div>
  );
};

// Setting default props
BuyPolicy.defaultProps = {
  userId: "",
  policyId: ""
};

export default BuyPolicy;
