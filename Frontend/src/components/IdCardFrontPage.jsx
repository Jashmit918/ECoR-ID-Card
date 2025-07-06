import React, { useState } from "react";

export default function IdCardFrontPage({app}) {

  return (
    <div className="w-[768px] h-[480px] p-4 bg-[#ffffff] shadow-md text-xs font-sans">
      <div className="text-center pb-2">
        <div className="flex justify-between items-center gap-2 mb-3">
          <img src="/railways-logo.png" alt="Logo" className="h-20" />
          <div>
            <h1 className="text-3xl font-medium">पूर्व तट रेलवे</h1>
            <h2 className="text-3xl font-bold">East Coast Railway</h2>
          </div>
          <div></div>
        </div>
        <div className="grid grid-cols-4 text-sm font-semibold py-1 bg-[#009689] text-white">
          <div className="relative -top-2">विभाग</div>
          <div className="relative -top-2">DEPARTMENT</div>
          <div className="relative -top-2">व्यवसायिक</div>
          <div className="relative -top-2">COMMERCIAL</div>
        </div>
        <div className="grid grid-cols-4 text-sm font-semibold py-1 bg-[#00598a] text-white">
          <div className="relative -top-2">पहचान पत्र</div>
          <div className="relative -top-2">IDENTITY CARD</div>
          <div className="relative -top-2">प्र.का</div>
          <div className="relative -top-2">H.Q. SI.No. COMMERCIAL</div>
        </div>
      </div>

      {/* Body */}
      <div className="flex gap-2 mt-2">
          <img
            src={app.profilePic}
            alt="User"
            className="h-35 mr-6"
          />

        <div className="w-full font-medium">
          <div className="grid grid-cols-2 text-lg space-y-1">
            <span>नाम / Name</span>
            <div>: {app.empName}</div>
          </div>
          <div className="grid grid-cols-2 text-lg space-y-1">
            <span>पद नाम / Desig</span>
            <div>: {app.desg}</div>
          </div>
          <div className="grid grid-cols-2 text-lg space-y-1">
            <span>पी.एफ.नं / P.F.No.</span>
            <div>: {app.empNo || app.ruidNo}</div>
          </div>
          <div className="grid grid-cols-2 text-lg space-y-1">
            <span>स्टेशन / Station</span>
            <div>: {app.station}</div>
          </div>
          <div className="grid grid-cols-2 text-lg space-y-1">
            <span>जन्म तारीख / D.O.B</span>
            <div>: {app.dob?.toString().split("T")[0]}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 mt-4 text-center text-sm">
        <div>
          <img
            src={app.signPic}
            alt="Stamp"
            className="h-10 mx-auto"
          />
          <p className="mt-1">
            <span>कार्डधारक का हस्ताक्षर</span>
            <br />
            <span className="font-medium">Signature of the Card Holder</span>
          </p>
        </div>
        <div>
          <img
            src="/authority signature.png"
            alt="Signature"
            className="h-12 mx-auto"
          />
          <p className="mt-1">
            <span>जारीकर्ता अधिकारी का हस्ताक्षर</span>
            <br />
            <span className="font-medium">Signature of Issuing Authority</span>
          </p>
        </div>
      </div>
    </div>
  );
}