import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from "axios";

export default function AppStatus() {
  const [id, setId] = useState("");
  const [dob, setDob] = useState("");
  const [id_non, setId_non] = useState("");
  const [dob_non, setDob_non] = useState("");

  const submitHandlerGaz = async (e) => {
    e.preventDefault();
    const application = {
      ruidNo: id,
      dob,
    };
    const response = await axios
      .post(`${import.meta.env.VITE_BASE_URL}/gaz/app-status`, application)
      .catch((e) => {
        alert("No such application found !!!");
      });
    if (response.status === 201) {
      const data = response.data;
      alert("Your Application is: "+ data.app.status);
    }
    console.log(id);
    console.log(dob);
    setId("");
    setDob("");
  };

  const submitHandlerNonGaz = async (e) => {
    e.preventDefault();
    const application = {
      empNo: id_non,
      dob: dob_non,
    };
    const response = await axios
      .post(`${import.meta.env.VITE_BASE_URL}/nonGaz/app-status`, application)
      .catch((e) => {
        alert("No such application found !!!");
      });
    if (response.status === 201) {
      const data = response.data;
      alert("Your Application is: "+ data.app.status);
    }
    console.log(id_non);
    console.log(dob_non);
    setId_non("");
    setDob_non("");
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="h-dvh w-full pt-28 mx-2 flex justify-center items-center gap-10">
          <form
            onSubmit={submitHandlerGaz}
            className="border border-green-300 rounded"
          >
            <div className="rounded h-12 bg-green-100 flex py-2 px-3 items-center text-green-800">
              Application Status (Gaz)
            </div>
            <div className="p-4">
              <input
                type="text"
                value={id}
                placeholder="Enter RUID No"
                name="id"
                onChange={(e) => setId(e.target.value)}
                className="w-full px-4 py-2 border rounded border-gray-300 outline-none focus:ring-2 focus:ring-green-200 mt-1"
              />
              <input
                type="date"
                value={dob}
                name="dob"
                className="w-full px-4 py-2 border rounded border-gray-300 outline-none focus:ring-2 focus:ring-green-200 mt-1"
                onChange={(e) => setDob(e.target.value)}
              />
              <button
                type="submit"
                className="w-full flex justify-center items-center bg-green-500 hover:bg-green-600 mt-3 h-12 rounded text-white cursor-pointer"
              >
                Submit
              </button>
            </div>
          </form>

          <form
            onSubmit={submitHandlerNonGaz}
            className="border 
            border-red-300 rounded"
          >
            <div className="rounded h-12 bg-red-100 flex py-2 px-3 items-center text-red-800">
              Application Status (Non Gaz)
            </div>
            <div className="p-4">
              <input
                type="text"
                value={id_non}
                placeholder="Enter Employee No."
                name="id"
                className="w-full px-4 py-2 border rounded border-gray-300 outline-none focus:ring-2 focus:ring-red-200 mt-1"
                onChange={(e) => setId_non(e.target.value)}
              />
              <input
                type="date"
                value={dob_non}
                name="dob"
                className="w-full px-4 py-2 border rounded border-gray-300 outline-none focus:ring-2 focus:ring-red-200 mt-1"
                onChange={(e) => setDob_non(e.target.value)}
              />
              <button
                type="submit"
                className="w-full flex justify-center items-center bg-red-500 hover:bg-red-600 mt-3 h-12 rounded text-white cursor-pointer"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
