import React, { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import IdCardFrontPage from "./IdCardFrontPage";
import IdCardBackPage from "./IdCardBackPage";

export default function ApplicationsTable({ applications, entries, isGaz }) {
  const frontRef = useRef();
  const backRef = useRef();

  const [currentApp, setCurrentApp] = useState(null);

  const handleDownloadPdf = async (app) => {
    setCurrentApp(app);
    const front = frontRef.current;
    const back = backRef.current;
    if (!front || !back) return;

    const frontCanvas = await html2canvas(front, { scale: 2 });
    const frontImg = frontCanvas.toDataURL("image/png");

    const backCanvas = await html2canvas(back, { scale: 2 });
    const backImg = backCanvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [85.6, 53.98],
    });

    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();

    pdf.addImage(frontImg, "PNG", 0, 0, width, height);
    pdf.addPage();
    pdf.addImage(backImg, "PNG", 0, 0, width, height);
    pdf.save(`${app.empName}_IDCard.pdf`);

    setCurrentApp(null);
  };

  const updateStatus = async (id) => {
    const status = prompt("Enter the updated status:");
    const userType = isGaz ? "gaz" : "nonGaz";

    const statusUpdate = {
      ruidNo: id,
      empNo: id,
      status,
    };
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const response = await axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/${userType}/update`,
        statusUpdate,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((e) => {
        alert("Failed to update status!");
        return null;
      });

    if (response && response.status === 200) {
      alert("Status updated successfully!");
    }
  };

  const convertToQR = (app) => {
    const qrData = {
      name: app.empName,
      desg: app.desg,
      station: app.station,
      address: app.address,
      mobile: app.mobile,
      emergencyName: app.emergencyName,
      emergencyContact: app.emergencyContact,
    };
    return <QRCodeCanvas value={JSON.stringify(qrData)} size={100} />;
  };

  return (
    <div className="text-sm h-[400px] overflow-y-scroll ">
      <table className="text-xs text-gray-800">
        <thead className="bg-green-100">
          <tr>
            <th className="border p-2 border-gray-300">Sl No</th>
            <th className="border p-2 border-gray-300">EMPNO</th>
            <th className="border p-2 border-gray-300">EMPNAME</th>
            <th className="border p-2 border-gray-300">DESIGNATION</th>
            <th className="border p-2 border-gray-300">DOB</th>
            <th className="border p-2 border-gray-300">DEPARTMENT</th>
            <th className="border p-2 border-gray-300">STATION</th>
            <th className="border p-2 border-gray-300">BILL UNIT</th>
            <th className="border p-2 border-gray-300">ADDRESS</th>
            <th className="border p-2 border-gray-300">RLY NUMBER</th>
            <th className="border p-2 border-gray-300">MOBILE NUMBER</th>
            <th className="border p-2 border-gray-300">
              EMERGENCY CONTACT NAME
            </th>
            <th className="border p-2 border-gray-300">EMERGENCY CONTACT NO</th>
            <th className="border p-2 border-gray-300">APPLICATION DATE</th>
            <th className="border p-2 border-gray-300">QR Code</th>
            <th className="border p-2 border-gray-300">PHOTO</th>
            <th className="border p-2 border-gray-300">SIGNATURE</th>
            {[1, 2, 3, 4, 5].map((elem, index) =>
              !(index < entries) ? null : (
                <React.Fragment key={index}>
                  <th className="border p-2 border-gray-300">Name{elem}</th>
                  <th className="border p-2 border-gray-300">BG{elem}</th>
                  <th className="border p-2 border-gray-300">Rel{elem}</th>
                  <th className="border p-2 border-gray-300">DOB{elem}</th>
                  <th className="border p-2 border-gray-300">Identity{elem}</th>
                </React.Fragment>
              )
            )}
            <th className="border p-2 border-gray-300">Status</th>
            <th className="border p-2 border-gray-300">Remarks</th>
            <th className="border p-2 border-gray-300">Update</th>
            <th className="border p-2 border-gray-300">Download</th>
          </tr>
        </thead>
        <tbody className="bg-sky-100">
          {applications.map((app, index) => (
            <tr key={index}>
              <td className="border p-2 border-gray-300 text-center">
                {index + 1}
              </td>
              <td className="border p-2 border-gray-300 text-center">
                {app.empNo || app.ruidNo}
              </td>
              <td className="border p-2 border-gray-300">{app.empName}</td>
              <td className="border p-2 border-gray-300">{app.desg}</td>
              <td className="border p-2 border-gray-300">
                {app.dob.toString().split("T")[0]}
              </td>
              <td className="border p-2 border-gray-300">{app.dept}</td>
              <td className="border p-2 border-gray-300">{app.station}</td>
              <td className="border p-2 border-gray-300">{app.billUnit}</td>
              <td className="border p-2 border-gray-300">{app.address}</td>
              <td className="border p-2 border-gray-300">
                {app.rlyContact || "N/A"}
              </td>
              <td className="border p-2 border-gray-300">{app.mobile}</td>
              <td className="border p-2 border-gray-300">
                {app.emergencyName}
              </td>
              <td className="border p-2 border-gray-300">
                {app.emergencyContact}
              </td>
              <td className="border p-2 border-gray-300">
                {app.createdAt.toString().split("T")[0]}
              </td>
              <td className="border p-2 border-gray-300">{convertToQR(app)}</td>
              <td className="border p-2 border-gray-300">
                <img src={app.profilePic} alt="User" className="w-20 mx-auto" />
              </td>
              <td className="border p-2 border-gray-300">
                <img src={app.signPic} alt="Sign" className="w-20 mx-auto" />
              </td>
              {Array.from({ length: 5 }).map((_, idx) => {
                const { name, bloodGrp, relation, famDob, idMarks } =
                  app.family?.[idx] ?? {};
                return (
                  <React.Fragment key={idx}>
                    <td className="border p-2 border-gray-300">{name ?? ""}</td>
                    <td className="border p-2 border-gray-300">
                      {bloodGrp ?? ""}
                    </td>
                    <td className="border p-2 border-gray-300">
                      {relation ?? ""}
                    </td>
                    <td className="border p-2 border-gray-300">
                      {famDob?.toString().split("T")[0] ?? ""}
                    </td>
                    <td className="border p-2 border-gray-300">
                      {idMarks ?? ""}
                    </td>
                  </React.Fragment>
                );
              })}
              <td className="border p-2 border-gray-300">{app.status}</td>
              <td className="border p-2 border-gray-300">N/A</td>
              <td className="border p-2 border-gray-300 text-center">
                <button
                  className="bg-sky-600 px-2 py-1 rounded text-white cursor-pointer"
                  onClick={() => updateStatus(app.ruidNo || app.empNo)}
                >
                  Update
                </button>
              </td>
              <td className="border p-2 border-gray-300 text-center">
                <button
                  className="bg-sky-600 px-2 py-1 rounded text-white cursor-pointer"
                  onClick={() => handleDownloadPdf(app)}
                >
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {currentApp && (
        <div className="fixed left-[9999px]">
          <div ref={frontRef}>
            <IdCardFrontPage app={currentApp} />
          </div>
          <div ref={backRef}>
            <IdCardBackPage app={currentApp} />
          </div>
        </div>
      )}
    </div>
  );
}
