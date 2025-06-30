import GazCard from "./pages/GazCard";
import { Route, Routes } from "react-router-dom";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import Login from "./pages/Login";
import NonGazCard from "./pages/NonGazCard";
import AppStatus from "./pages/AppStatus";
import UserLogout from "./pages/UserLogout";
import GazPending from "./pages/GazPending";
import NonGazPending from "./pages/NonGazPending";
import PrintApplication from "./pages/PrintApplication";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gaz-card" element={<GazCard />} />
        <Route path="/nongaz-card" element={<NonGazCard />} />
        <Route
          path="/pending-gaz"
          element={
            <UserProtectWrapper>
              <GazPending />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/pending-nonGaz"
          element={
            <UserProtectWrapper>
              <NonGazPending />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/print-app"
          element={
            <UserProtectWrapper>
              <PrintApplication />
            </UserProtectWrapper>
          }
        />

        <Route path="/app-status" element={<AppStatus />} />
        <Route
          path="/logout"
          element={
            <UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
          }
        />
      </Routes>
    </>
  );
}

export default App;
