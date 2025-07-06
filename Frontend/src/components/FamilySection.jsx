import React from "react";

export default function FamilySection({familyMember, handleFamilyChange, addFamilyMember}) {
  return (
    <>
      <div className="font-medium text-sm text-blue-500 mb-3">
        Details of Family (As per the pass rules):
      </div>

      {/* Family Member Input Fields */}
      <div className="grid grid-cols-6 gap-14">
        {[
          { id: "name", label: "Family Member Name" },
          { id: "bloodGrp", label: "Blood Group" },
          { id: "relation", label: "Relation" },
          { id: "famDob", label: "Date of Birth", type: "date" },
          { id: "idMarks", label: "Identification Marks" },
        ].map((field) => (
          <div key={field.id} className="flex flex-col">
            <label htmlFor={field.id} className="font-medium text-sm mb-1">
              {field.label} <span className="text-red-800">*</span>
            </label>
            <input
              id={field.id}
              type={field.type || "text"}
              value={familyMember[field.id]}
              onChange={handleFamilyChange}
              className="bg-white outline-none border-1 rounded-sm p-1 shadow"
            />
          </div>
        ))}
        <div className="mt-3 flex justify-center items-center">
          <button
            type="button"
            onClick={addFamilyMember}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
}
