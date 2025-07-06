import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function IdCardBackPage({ app }) {
  const qrData = {
    name: app.empName,
    desg: app.desg,
    station: app.station,
    address: app.address,
    mobile: app.mobile,
    emergencyName: app.emergencyName,
    emergencyContact: app.emergencyContact,
  };
  const family = app.family || [];

  const [textSize, setTextSize] = useState(16);

  useEffect(() => {
    if (family.length < 2) {
      setTextSize(14);
    } else if (family.length < 3) {
      setTextSize(12);
    } else if (family.length < 5) {
      setTextSize(10);
    } else {
      setTextSize(5);
    }
  }, [family.length]);

  return (
    <div className="w-[768px] h-[480px] p-4 bg-white shadow-md text-xs font-sans ">
      {/* Header Section */}
      <div className="text-center font-semibold text-xl mb-6">
        <p>
          परिवार का विवरण /{" "}
          <span className="font-normal">Details of the family</span>
        </p>
      </div>

      {/* Family Members List */}
      {family.map((member, index) => (
        <div
          className={`grid grid-cols-8 justify-start text-xs`}
          style={{ fontSize: `${textSize}px` }}
          key={index}
        >
          <div className="flex col-span-2">{member.name || ""}</div>
          <div className="flex">{member.relation || ""}</div>
          <div className="flex">{member.famDob?.toString().split("T")[0] || ""}</div>
          <div className="flex">{member.bloodGrp || ""}</div>
          <div className="flex col-span-3">{member.idMarks || ""}</div>
        </div>
      ))}

      <div className="flex justify-between items-center px-6 mt-10">
        <div className="mt-2 text-lg flex flex-col">
          <div className="grid grid-cols-2 font-semibold">
            <div>Emergency Contact No.</div>
            <div>: {app.emergencyContact || ""}</div>
          </div>
          <div className="grid grid-cols-2 font-normal">
            <div>घर का पता / Res. Address</div>
            <div>: {app.address || ""}</div>
          </div>
          <div className="mt-6 font-semibold">
            <div>
              यदि यह कार्ड मिले तो कृपया निकटतम पोस्ट बॉक्स में डाल दें।
            </div>
            <div>If found please drop it in the nearest Post Box</div>
          </div>
        </div>
        <div>
          <QRCodeCanvas value={JSON.stringify(qrData)} size={120} />
        </div>
      </div>
    </div>
  );
}
