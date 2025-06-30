import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoading(false);
      return navigate("/login");
    }
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
        }
        setIsLoading(false);
        navigate("/login");
      });
  }, [navigate,setUser]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen w-screen">Loading...</div>;
  }

  return <>{children}</>;
};

export default UserProtectWrapper;
