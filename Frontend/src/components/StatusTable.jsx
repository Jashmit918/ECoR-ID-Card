import React from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function StatusTable({ app, isGaz }) {
  const qrData = {
    name: app.empName,
    desg: app.desg,
    station: app.station,
    address: app.address,
    mobile: app.mobile,
    emergencyName: app.emergencyName,
    emergencyContact: app.emergencyContact,
  };

  return (
    <div className="w-5xl mb-6 bg-gray-50 border border-blue-500 rounded-sm">
      <div className="h-14 bg-sky-600 rounded flex justify-center items-center text-white">
        <p>ID No: {app._id}</p>
      </div>
      <div className="m-4">
        <table className="w-full">
          <tbody>
            <tr>
              <td className="font-semibold uppercase p-2 border border-black/30">
                EmpNo
              </td>
              <td className="p-2 border border-black/30">
                {app.empNo || app.ruidNo}
              </td>
              <td className="p-2 border font-semibold uppercase  border-black/30">
                EmpName
              </td>
              <td className="p-2 border border-black/30">{app.empName}</td>
              <td className="p-2 border font-semibold uppercase  border-black/30">
                Designation
              </td>
              <td className="p-2 border border-black/30">{app.desg}</td>
            </tr>
            <tr>
              <td className="font-semibold uppercase p-2 border border-black/30">
                DOB
              </td>
              <td className="p-2 border border-black/30">{app.dob.toString().split("T")[0]}</td>
              <td className="p-2 border font-semibold uppercase  border-black/30">
                Department
              </td>
              <td className="p-2 border border-black/30">{app.dept}</td>
              <td className="p-2 border font-semibold uppercase  border-black/30">
                Station
              </td>
              <td className="p-2 border border-black/30">{app.station}</td>
            </tr>
            <tr>
              <td className="font-semibold uppercase p-2 border border-black/30">
                Address
              </td>
              <td className="p-2 border border-black/30">{app.address}</td>
              <td className="p-2 border font-semibold uppercase  border-black/30">
                rly number
              </td>
              <td className="p-2 border border-black/30">{app.rlyContact}</td>
              <td className="p-2 border font-semibold uppercase  border-black/30">
                Mobile Number
              </td>
              <td className="p-2 border border-black/30">{app.mobile}</td>
            </tr>
            <tr>
              <td className="font-semibold uppercase p-2 border border-black/30">
                Emergency Contact Name
              </td>
              <td className="p-2 border border-black/30">
                {app.emergencyName}
              </td>
              <td className="p-2 border font-semibold uppercase  border-black/30">
                Emergency Contact No
              </td>
              <td className="p-2 border border-black/30">
                {app.emergencyContact}
              </td>
              <td className="p-2 border font-semibold uppercase  border-black/30">
                Application Date
              </td>
              <td className="p-2 border border-black/30">
                {app.createdAt.toString().split("T")[0]}
              </td>
            </tr>
            <tr>
              <td className="font-semibold uppercase p-2 border border-black/30">
                Application Status
              </td>
              <td className="p-2 border border-black/30">{app.status}</td>
              {isGaz && (
                <>
                  <td className="p-2 border font-semibold uppercase  border-black/30">
                    Hindi Designation
                  </td>
                  <td className="p-2 border border-black/30">
                    {app.hindiDesg && (
                      <img src={app.hindiDesg} className="h-20 p-2" />
                    )}
                  </td>
                  <td className="p-2 border font-semibold uppercase  border-black/30">
                    Hindi Name
                  </td>
                  <td className="p-2 border border-black/30">
                    {app.hindiNamePic && (
                      <img src={app.hindiNamePic} className="h-20 p-2" />
                    )}
                  </td>
                </>
              )}
            </tr>
            <tr>
              <td className="font-semibold uppercase p-2 border border-black/30">
                QR Code
              </td>
              <td className="p-2 border border-black/30">
                <QRCodeCanvas value={JSON.stringify(qrData)} size={100} />
              </td>
              <td className="p-2 border font-semibold uppercase  border-black/30">
                Photo
              </td>
              <td className="p-2 border border-black/30">
                {app.profilePic && (
                  <img
                    src={app.profilePic}
                    alt="Profile"
                    className="h-20 p-2"
                  />
                )}
              </td>
              <td className="p-2 border font-semibold uppercase border-black/30">
                Signature
              </td>
              <td className="p-2 border border-black/30">
                {app.signPic && (
                  <img src={app.signPic} alt="Signature" className="h-20 p-2" />
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <table className="w-full mt-4">
          <thead>
            <tr>
              <td className="font-semibold capitalize bg-red-200/50 p-2 border border-black/30">
                Name
              </td>
              <td className="font-semibold capitalize bg-red-200/50 p-2 border border-black/30">
                Blood Group
              </td>
              <td className="font-semibold capitalize bg-red-200/50 p-2 border border-black/30">
                Relation
              </td>
              <td className="font-semibold capitalize bg-red-200/50 p-2 border border-black/30">
                DOB
              </td>
              <td className="font-semibold capitalize bg-red-200/50 p-2 border border-black/30">
                Identification Mark(s)
              </td>
            </tr>
          </thead>
          {app.family.length > 0 && (
            <tbody>
              {app.family.map((e, index) => (
                <tr key={index}>
                  <td className="p-2 border border-black/30">{e.name}</td>
                  <td className="p-2 border border-black/30">{e.bloodGrp}</td>
                  <td className="p-2 border border-black/30">{e.relation}</td>
                  <td className="p-2 border border-black/30">{e.famDob.toString().split("T")[0]}</td>
                  <td className="p-2 border border-black/30">{e.idMarks}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
