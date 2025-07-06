import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import FormTitle from "../components/FormTitle";
import FamilySection from "../components/FamilySection";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function GazCard() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    empName: "",
    desg: "",
    ruidNo: "",
    dob: "",
    dept: "",
    station: "",
    billUnit: "",
    address: "",
    mobile: "",
    reason: "",
    rlyContact: "",
    emergencyName: "",
    emergencyContact: "",
    family: [],
    profilePic: null,
    signPic: null,
    hindiName: null,
    hindiDesg: null,
  });

  const [familyMember, setFamilyMember] = useState({
    name: "",
    bloodGrp: "",
    relation: "",
    famDob: "",
    idMarks: "",
  });

  // to fill dummy data
  const fillDummy = () => {
    setFormData({
      empName: "John gaz Doe",
      desg: "Senior Engineer",
      ruidNo: "123456",
      dob: "2025-06-25",
      dept: "ENGINEERING",
      station: "New Delhi",
      billUnit: 3101024,
      address: "123, Park Street, New Delhi",
      mobile: "9876543210",
      reason: "Official Travel Purpose",
      rlyContact: "1234567",
      emergencyName: "Jane Doe",
      emergencyContact: "9876500000",
      family: [
        {
          name: "Alice Doe",
          bloodGrp: "A+",
          relation: "Daughter",
          famDob: "2010-03-25",
          idMarks: "Mole on right hand",
        },
        {
          name: "Bob Doe",
          bloodGrp: "O+",
          relation: "Son",
          famDob: "2015-09-10",
          idMarks: "Scar on left eyebrow",
        },
      ],
      profilePic: null,
      signPic: null,
      hindiName: null,
      hindiDesg: null,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFamilyChange = (e) => {
    const { id, value } = e.target;
    setFamilyMember((prev) => ({ ...prev, [id]: value }));
  };

  const addFamilyMember = () => {
    if (
      familyMember.name &&
      familyMember.bloodGrp &&
      familyMember.relation &&
      familyMember.famDob &&
      familyMember.idMarks
    ) {
      setFormData((prev) => ({
        ...prev,
        family: [...prev.family, familyMember],
      }));
      setFamilyMember({
        name: "",
        bloodGrp: "",
        relation: "",
        famDob: "",
        idMarks: "",
      });
    } else {
      alert("Please fill all fields of family member before adding.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    const response = await axios
      .post(`${import.meta.env.VITE_BASE_URL}/gaz/create-req`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      })
      .catch((e) => {
        alert("It looks like this employee has already applied for an id card");
        navigate("/app-status");
      });
    if (response.status === 201) {
      const data = response.data;
      alert(`Hello ${data.newReq.empName}, your request has been submitted!`);
      navigate("/app-status");
    }
    setFormData({
      empName: "",
      desg: "",
      ruidNo: "",
      dob: "",
      dept: "",
      station: "",
      billUnit: "",
      address: "",
      mobile: "",
      reason: "",
      rlyContact: "",
      emergencyName: "",
      emergencyContact: "",
      family: [],
      photo: null,
      signature: null,
      hindiName: null,
      hindiDesg: null,
    });
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="h-dvh w-full pt-28 mx-2 overflow-y-auto">
          <form
            className="border-blue-400 my-2 border-1 rounded-md pb-8"
            onSubmit={handleSubmit}
          >
            {/* basic details */}
            <FormTitle desg={"Gazetted"} />
            <div className="mt-2 bg-green-100 pt-4">
              <div className="font-medium text-sm text-blue-500 mb-4 px-4">
                Employee Details:
              </div>

              {/* basic details */}
              <div className="grid grid-cols-3 gap-x-3 gap-y-6 px-4">
                {[
                  { id: "empName", label: "Employee Name" },
                  { id: "desg", label: "Designation" },
                  { id: "ruidNo", label: "RUID No." },
                  { id: "dob", label: "Date of Birth", type: "date" },
                  {
                    id: "dept",
                    label: "Department",
                    type: "select",
                    options: [
                      { value: "ACCOUNTS", label: "ACCOUNTS" },
                      { value: "COMMERCIAL", label: "COMMERCIAL" },
                      { value: "ELECTRICAL", label: "ELECTRICAL" },
                      { value: "ENGINEERING", label: "ENGINEERING" },
                      { value: "GA", label: "GA" },
                      { value: "MECHANICAL", label: "MECHANICAL" },
                      { value: "MEDICAL", label: "MEDICAL" },
                      { value: "OPERATING", label: "OPERATING" },
                      { value: "PERSONNEL", label: "PERSONNEL" },
                      { value: "RRB", label: "RRB" },
                      { value: "S&T", label: "S&T" },
                      { value: "SAFETY", label: "SAFETY" },
                      { value: "SECURITY", label: "SECURITY" },
                      { value: "STORES", label: "STORES" },
                    ],
                  },
                  { id: "station", label: "Station" },
                  {
                    id: "billUnit",
                    label: "Bill Unit",
                    type: "select",
                    options: [
                      { value: 3101001, label: "3101001" },
                      { value: 3101002, label: "3101002" },
                      { value: 3101003, label: "3101003" },
                      { value: 3101004, label: "3101004" },
                      { value: 3101010, label: "3101010" },
                      { value: 3101023, label: "3101023" },
                      { value: 3101024, label: "3101024" },
                      { value: 3101025, label: "3101025" },
                      { value: 3101026, label: "3101026" },
                      { value: 3101027, label: "3101027" },
                      { value: 3101065, label: "3101065" },
                      { value: 3101066, label: "3101066" },
                      { value: 3101165, label: "3101165" },
                      { value: 3101166, label: "3101166" },
                      { value: 3101285, label: "3101285" },
                      { value: 3101286, label: "3101286" },
                      { value: 3101287, label: "3101287" },
                      { value: 3101288, label: "3101288" },
                      { value: 3101470, label: "3101470" },
                    ],
                  },
                  {
                    id: "address",
                    label: "Address",
                    type: "textarea",
                    colSpan: 2,
                  },
                  {
                    id: "rlyContact",
                    label: "Rly Contact No.",
                  },
                  { id: "mobile", label: "Mobile", type: "number" },
                  {
                    id: "reason",
                    label: "Reason",
                    type: "textarea",
                    colSpan: 2,
                  },
                ].map((field) => (
                  <div
                    key={field.id}
                    className={`flex flex-col ${
                      field.colSpan ? `col-span-${field.colSpan}` : ""
                    }`}
                  >
                    <label
                      htmlFor={field.id}
                      className="font-medium text-sm mb-2"
                    >
                      {field.label}{" "}
                      <span className="text-red-800">
                        {field.id == "rlyContact" ? "" : "*"}
                      </span>
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        id={field.id}
                        required
                        value={formData[field.id]}
                        onChange={handleInputChange}
                        className="bg-white outline-none border-1 border-emerald-600 rounded-sm p-1 pl-3 shadow-sm shadow-green-950/30 resize-none"
                        rows={2}
                        placeholder={`Enter ${field.label}`}
                      ></textarea>
                    ) : field.type === "select" ? (
                      <select
                        id={field.id}
                        required
                        value={formData[field.id]}
                        onChange={handleInputChange}
                        className="bg-white outline-none border-1 border-emerald-600 rounded-sm p-1 pl-3 shadow-sm shadow-green-950/30"
                      >
                        <option value="" className="text-gray-600">
                          [Select {field.label}]
                        </option>
                        {field.options?.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            className="text-gray-600"
                          >
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        id={field.id}
                        required={field.id !== "rlyContact"}
                        type={field.type || "text"}
                        value={formData[field.id]}
                        onChange={handleInputChange}
                        className="bg-white outline-none border-1 border-emerald-600 rounded-sm p-1 pl-3 shadow-sm shadow-green-950/30"
                        placeholder={`Enter ${field.label}`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Family Section */}
              <div className="mt-10 p-4 pb-10 bg-red-100 w-full rounded-md">
                <FamilySection
                  handleFamilyChange={handleFamilyChange}
                  familyMember={familyMember}
                  addFamilyMember={addFamilyMember}
                />

                {/* Added Family Members Table */}
                <div className="mt-6 overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300 text-sm text-center">
                    <thead className="bg-green-100 text-gray-800">
                      <tr>
                        <th className="px-2 py-1">Sl No.</th>
                        <th className="px-2 py-1">Name</th>
                        <th className="px-2 py-1">Blood Group</th>
                        <th className="px-2 py-1">Relation</th>
                        <th className="px-2 py-1">DOB</th>
                        <th className="px-2 py-1">ID Marks</th>
                        <th className="px-2 py-1">Actions</th>
                      </tr>
                    </thead>
                    {formData.family.length > 0 && (
                      <tbody>
                        {formData.family.map((member, index) => (
                          <tr key={index} className="hover:bg-red-50">
                            <td className="px-1 py-1">{index + 1}</td>
                            <td className="px-1 py-1">{member.name}</td>
                            <td className="px-1 py-1">{member.bloodGrp}</td>
                            <td className="px-1 py-1">{member.relation}</td>
                            <td className="px-1 py-1">{member.famDob}</td>
                            <td className="px-1 py-1">{member.idMarks}</td>
                            <td className="px-1 py-1">
                              <button
                                type="button"
                                onClick={() => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    family: prev.family.filter(
                                      (_, i) => i !== index
                                    ),
                                  }));
                                }}
                                className="text-red-600 hover:underline"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </table>
                </div>
              </div>

              {/* Emergency Details and upload files section */}
              <div className="p-4 pb-10 bg-blue-200/70 w-full">
                <div className="font-medium text-sm text-blue-500 mb-3">
                  Additional Details:
                </div>
                <div>
                  <span className="text-red-500 block font-medium text-sm">
                    NOTE: File name should be Employee's FirstName_photo,
                    FirstName_sign (jpeg/jpg/png)
                  </span>
                  <span className="text-red-500 block font-medium text-sm">
                    Upload well scanned Photo and Signature. For better
                    visibility Avoid uploading Mobile scanned files and Selfie
                  </span>
                </div>
                {/* Input fields */}
                <div className="p-4 rounded-md space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label
                        htmlFor="emergencyName"
                        className="text-sm font-medium mb-1"
                      >
                        Emergency Contact Name:{" "}
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="emergencyName"
                        value={formData.emergencyName}
                        id="emergencyName"
                        onChange={handleInputChange}
                        placeholder="Enter Emergency Contact Name"
                        className="border border-green-600 rounded px-3 py-1 outline-none bg-white"
                        required
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="emergencyContact"
                        className="text-sm font-medium mb-1"
                      >
                        Emergency Contact Number:{" "}
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="number"
                        name="emergencyContact"
                        id="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleInputChange}
                        placeholder="Enter Emergency Contact Number"
                        className="border border-green-600 rounded px-3 py-1 outline-none bg-white"
                        required
                      />
                    </div>
                  </div>
                  {/* File Upload Fields */}
                  {[
                    { name: "profilePic", label: "Upload Photo" },
                    { name: "signPic", label: "Upload Signature" },
                    { name: "hindiNamePic", label: "Upload Hindi Name" },
                    { name: "hindiDesg", label: "Upload Hindi Designation" },
                  ].map((field) => (
                    <div className="flex flex-col" key={field.name}>
                      <label
                        htmlFor={field.name}
                        className="text-sm font-medium mb-1"
                      >
                        {field.label}: <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="file"
                        name={field.name}
                        onChange={handleFileChange}
                        className="border border-green-600 rounded px-2 py-1  text-sm w-1/2 bg-white"
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit button */}
            </div>
            <div className="mt-9 flex justify-center items-center gap-2">
              <button
                type="submit"
                id="submit"
                className="bg-emerald-600 text-white px-5 py-2 rounded hover:bg-emerald-700 transition w-28"
              >
                SUBMIT
              </button>
              <button
              onClick={fillDummy}
              className="bg-emerald-600 text-white px-5 py-2 rounded hover:bg-emerald-700 transition w-fit">
                Fill Dummy
              </button>
              <button
                onClick={() =>
                  setFormData({
                    empName: "",
                    desg: "",
                    ruidNo: "",
                    dob: "",
                    dept: "",
                    station: "",
                    billUnit: "",
                    address: "",
                    mobile: "",
                    rlyContact:"",
                    reason: "",
                    emergencyName: "",
                    emergencyContact: "",
                    family: [],
                    profilePic: null,
                    signPic: null,
                    hindiName: null,
                    hindiDesg: null,
                  })
                }
                id="clear"
                className="bg-emerald-600 text-white px-5 py-2 rounded hover:bg-emerald-700 transition w-28"
              >
                CLEAR
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
