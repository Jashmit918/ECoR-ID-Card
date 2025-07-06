import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatusTable from "../components/StatusTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 10,
    borderBottom: "1 solid #ccc",
    paddingBottom: 6,
  },
  heading: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: "bold",
  },
  row: {
    marginBottom: 2,
  },
});

const ApplicationPDF = ({ applications, isGaz }) => (
  <Document>
    {applications.map((app, idx) => (
      <Page key={idx} size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>
            {isGaz ? "Gazette" : "Non-Gazette"} Application
          </Text>
          {app.profilePic && (
            <View style={{ marginTop: 10 }}>
              <Text style={styles.heading}>Profile Photo</Text>
              <Image
                style={{ width: 100, marginBottom: 10 }}
                src={app.profilePic}
              />
            </View>
          )}
          {app.signPic && (
            <View style={{ marginTop: 10 }}>
              <Text style={styles.heading}>Signature</Text>
              <Image
                style={{ width: 100, marginBottom: 10 }}
                src={app.signPic}
              />
            </View>
          )}
          <View style={styles.row}>
            <Text>Employee Name: {app.empName}</Text>
          </View>
          <View style={styles.row}>
            <Text>Designation: {app.desg}</Text>
          </View>
          <View style={styles.row}>
            {app.ruidNo && <Text>RUID No: {app.ruidNo}</Text>}
            {app.empNo && <Text>Employee No: {app.empNo}</Text>}
          </View>
          <View style={styles.row}>
            <Text>
              Date of Birth: {new Date(app.dob.$date).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.row}>
            <Text>Department: {app.dept}</Text>
          </View>
          <View style={styles.row}>
            <Text>Station: {app.station}</Text>
          </View>
          <View style={styles.row}>
            <Text>Bill Unit: {app.billUnit}</Text>
          </View>
          <View style={styles.row}>
            <Text>Address: {app.address}</Text>
          </View>
          <View style={styles.row}>
            <Text>Railway Contact: {app.rlyContact}</Text>
          </View>
          <View style={styles.row}>
            <Text>Mobile: {app.mobile}</Text>
          </View>
          <View style={styles.row}>
            <Text>Reason: {app.reason}</Text>
          </View>
          <View style={styles.row}>
            <Text>Emergency Contact Name: {app.emergencyName}</Text>
          </View>
          <View style={styles.row}>
            <Text>Emergency Contact Number: {app.emergencyContact}</Text>
          </View>
          <View style={styles.row}>
            <Text>Status: {app.status}</Text>
          </View>
          {app.family && app.family.length > 0 && (
            <View style={{ marginTop: 10 }}>
              <Text style={styles.heading}>Family Members</Text>
              {app.family.map((member, idx) => (
                <View key={idx} style={styles.row}>
                  <Text>
                    {idx + 1}. {member.name} - {member.relation}, Blood Group:{" "}
                    {member.bloodGrp}, DOB:{" "}
                    {new Date(member.famDob.$date).toLocaleDateString()}, ID
                    Marks: {member.idMarks}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    ))}
  </Document>
);

export default function PrintApplication() {
  const [applications, setApplications] = useState([]);
  const [isGaz, setIsGaz] = useState(false);
  const [page, setPage] = useState(false);
  const navigate = useNavigate();

  const cancelBtn = () => {
    setPage(false);
    setApplications([]);
  };

  const printFiles = async (isGazette) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const url = isGazette
        ? `${import.meta.env.VITE_BASE_URL}/gaz/view-applications`
        : `${import.meta.env.VITE_BASE_URL}/nonGaz/view-applications`;

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setApplications(res.data.applications);
      setPage(true);
      setIsGaz(isGazette);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="h-dvh w-full pt-28 mx-2 flex flex-col items-center justify-center text-sm">
          <div className="flex gap-20 mb-6">
            <div className="border border-green-300 rounded w-sm">
              <div className="rounded h-8 bg-green-100 flex py-2 px-3 items-center text-green-800">
                Print Applications (Non Gaz)
              </div>
              <button
                onClick={() => printFiles(false)}
                className="w-full flex justify-start items-center my-2 h-8 py-2 px-3 rounded text-sky-600 hover:underline cursor-pointer"
              >
                Click Here
              </button>
            </div>
            <div className="border border-red-300 rounded w-sm">
              <div className="rounded h-8 bg-red-100 flex py-2 px-3 items-center text-red-800">
                Print Applications (Gaz)
              </div>
              <button
                onClick={() => printFiles(true)}
                className="w-full flex justify-start items-center my-2 h-8 py-2 px-3 rounded text-sky-600 hover:underline cursor-pointer"
              >
                Click Here
              </button>
            </div>
          </div>

          {page && (
            <div className="fixed h-[600px] overflow-auto w-5xl bg-gray-100 border rounded-xl border-sky-200 pb-8">
              <button
                className="px-2 fixed right-35 top-40 border border-white rounded text-white bg-red-500 hover:bg-red-600 font-bold cursor-pointer"
                onClick={cancelBtn}
              >
                X
              </button>
              {applications.map((app, idx) => (
                <div key={idx}>
                  <StatusTable app={app} isGaz={isGaz} />
                </div>
              ))}
              <div className="w-full flex justify-center items-center mt-4">
                <PDFDownloadLink
                  document={
                    <ApplicationPDF applications={applications} isGaz={isGaz} />
                  }
                  fileName={
                    isGaz
                      ? "Gazette_Applications.pdf"
                      : "NonGazette_Applications.pdf"
                  }
                  className="bg-sky-600 px-3 py-1 rounded cursor-pointer text-white"
                >
                  {({ loading }) => (loading ? "Preparing PDF..." : "Download")}
                </PDFDownloadLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
