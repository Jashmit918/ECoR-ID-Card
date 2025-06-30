import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      empNo: userId,
      password,
    };
    const response = await axios
      .post(`${import.meta.env.VITE_BASE_URL}/users/login`, user)
      .catch((e) => {
        alert("Invalid Credentials !!!");
        setUserId("");
        setPassword("");
      });
    if (response.status === 200) {
      const data = response.data;
      setUser(data.user);
      alert(`welcome user!!\nYour Employee Id: ${data.user._id}`);
      localStorage.setItem("token", data.token);
      navigate("/print-app");
    }
    setUserId("");
    setPassword("");
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="h-dvh w-full pt-28 mx-2">
          <div className="flex flex-col items-center mt-20 bg-white">
            <div className="w-80 shadow-md outline-none shadow-black/30 rounded">
              <div className="bg-blue-600 text-white text-center py-2 rounded-t ">
                <h2 className="text-lg font-semibold ">I-Card Admin Login</h2>
              </div>
              <form
                onSubmit={handleSubmit}
                className="p-4 px-11 py-5 flex flex-col gap-3"
              >
                <input
                  type="text"
                  placeholder="Enter USER ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className=" border border-gray-300 px-3 py-2  shadow-sm outline-none shadow-black/30 rounded focus:shadow-blue-600/50"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-300 px-3 py-2 shadow-sm outline-none shadow-black/30 rounded focus:shadow-blue-600/50"
                  required
                />
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 rounded hover:bg-green-600 transition cursor-pointer"
                >
                  Login
                </button>
              </form>
            </div>
            <img src="g20-india-seeklogo.png" alt="" className="h-32 mt-30" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
