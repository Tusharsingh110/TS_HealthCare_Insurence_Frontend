import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import {LoginContext} from "../contexts/LoginContext";
const ProfileComponent = () => {
  const {setLoggedIn} = useContext(LoginContext);
  const [userData, setUserData] = useState({});
  const [editable, setEditable] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dob: "",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/getUserById/`,
          // `${process.env.REACT_APP_BACKEND_URL}/api/users/getUserById/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data);
        setFormData({
          username: response.data.username,
          email: response.data.email,
          dob: response.data.dob ? response.data.dob.split("T")[0] : "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [token]);

  const handleEdit = () => {
    setEditable(true);
  };

  const handleCancel = () => {
    setEditable(false);
    setFormData({
      username: userData.username,
      email: userData.email,
      dob: userData.dob ? userData.dob.split("T")[0] : "",
    });
    setErrors({});
  };
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      setDeleting(true);
      await axios.delete(`http://localhost:3000/api/users/deleteUser/`, {
      // await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/users/deleteUser/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("User Deleted Successfully.");
      localStorage.removeItem('token');
      setLoggedIn(false);
      navigate('/');
    } catch (error) {
      console.error("Error deleting the user.", error);
    } finally {
      setDeleting(false);
    }
  };
  const handleSave = async () => {
    setSaving(true);
    const validationErrors = validateFormData(formData);
    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.put(
          `http://localhost:3000/api/users/updateUser`,
          // `${process.env.REACT_APP_BACKEND_URL}/api/users/updateUser`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEditable(false);
        setErrors({});
      } catch (error) {
        console.error("Error saving user data:", error);
      } finally {
        setSaving(false);
        alert("User Updated successfully!!");
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateFormData = (data) => {
    const errors = {};
    const { email, dob } = data;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const currentDate = new Date();
    const eighteenYearsAgo = new Date(
      currentDate.getFullYear() - 18,
      currentDate.getMonth(),
      currentDate.getDate()
    );

    if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    if (new Date(dob) > eighteenYearsAgo) {
      errors.dob = "You must be at least 18 years old";
    }

    return errors;
  };

  return (
    <div className="user-profile max-w-md mt-4 mx-auto p-4 border border-gray-300">
      <div className="my-4 flex-col gap-6 text-center">
        <div className="text-4xl my-4 py-2">User Profile</div>
        <div className="main1 my-4 pb-2 text-3xl">
          Welcome, {userData.username}
        </div>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled={!editable}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!editable}
              className={`w-full px-3 py-2 border border-gray-300 focus:outline-none ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="dob" className="block">
              Date of Birth:
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              disabled={!editable}
              className={`w-full px-3 py-2 border border-gray-300 focus:outline-none ${
                errors.dob ? "border-red-500" : ""
              }`}
            />
            {errors.dob && (
              <span className="text-red-500 text-sm">{errors.dob}</span>
            )}
          </div>
          <div>
            <div className="flex justify-between mx-2">
              {!editable ? (
                <>
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="px-4 w-[100px] py-2 mr-2 bg-blue-500 hover:bg-blue-400 text-white focus:outline-none"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="px-4 w-[100px] py-2 hover:bg-red-500 hover:text-white text-red-500 border-[1.5px] border-red-500 focus:outline-none"
                  >
                    {deleting ? "Deleting" : "Delete"}
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="px-4 w-[100px] py-2 mr-2 bg-green-500 hover:bg-green-400 text-white focus:outline-none"
                  >
                    {saving ? "Saving.." : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 w-[100px] py-2 bg-red-500 hover:bg-red-400 text-white focus:outline-none"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileComponent;
