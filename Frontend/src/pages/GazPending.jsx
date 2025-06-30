import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import SearchForm from "../components/SearchForm";
import ApplicationsTable from "../components/ApplicationsTable";

export default function GazPending() {
  const [applications, setApplications] = useState([]);
  const [entries, setEntries] = useState(10);

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="h-dvh w-full pt-28 mx-4 flex flex-col justify-start items-center text-sm">
          <SearchForm isGaz={true} setApplications={setApplications} />
          {!(applications.length == 0) && (
            <div className="w-[1200px] h-[510px] top-65 bg-white rounded-t border-2 border-b-0 border-sky-300 fixed">
              <div className="w-full rounded-md h-16 bg-sky-600 flex justify-center items-center text-white font-medium">
                Gazzetted I-Card Applications
              </div>
              <div className="mt-2 ml-2">
                <span className="px-1 font-medium text-gray-600">Show</span>
                <select
                  id="entries"
                  value={entries}
                  onChange={(e) => {
                    setEntries(e.target.value);
                  }}
                  className="px-1 border rounded text-gray-600 text-sm shadow-sm focus:outline-none"
                >
                  <option value="10">10</option>
                  {[20, 30, 40, 50]
                    .filter((_, idx) => idx <= entries - 1)
                    .map((option, idx) => (
                      <option key={idx} value={option} className="capitalize">
                        {option}
                      </option>
                    ))}
                </select>
                <span className="px-1 font-medium text-gray-600">Entries</span>
              </div>
              <div className="m-2 overflow-auto">
                <ApplicationsTable
                  applications={applications}
                  entries={entries}
                  isGaz={true}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}