import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext";
function Signin() {
  const { setLoggedIn } = useContext(LoginContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading,isLoading] = useState(false);
  const navigate = useNavigate();
  // console.log(process)
  const handlesignin = async (e) => {
    isLoading(true);
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post(
        // `http://localhost:3000/api/users/login`,
        `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
        { email, password }
        );
        setLoggedIn(true);
        const { token, userId, isAdmin } = response.data;
        localStorage.setItem("token", token);
        if (isAdmin) {
          navigate("/admin", { state: { userId: userId } });
        } else {
          navigate("/userDashboard", { state: { userId: userId } });
        }
      } catch (error) {
        console.error("Sign-in failed:", error);
        setError(error.response.data.error);
        // alert(error.response.data.error);
      } finally {
          isLoading(false);
      }
    };
    
    return (
      <div className="main1 flex-col gap-10 pt-10 ">
      <div className="text-4xl">Sign In</div>
      <form onSubmit={handlesignin}>
        {" "}
        {/* Add onSubmit event handler */}
        <div className="p-4">
          <input
            className="w-[300px] border-[1px] p-2 border-slate-800"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="p-4">
          <input
            className="w-[300px] border-[1px] p-2 border-slate-800"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="main1">
          <button
            type="submit"
            className='border p-2 w-[100px] border-gray-[2px] my-2 hover:bg-gray-800 bg-gray-600 text-white'
          >
            {loading ? 'Signing In': 'Sign In'}
          </button>
        </div>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Signin;
