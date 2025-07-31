import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import CreateCampaign from "./pages/createCampaigns";
import MyCampaigns from "./pages/myCampaigns";
import UpdateCampaign from "./pages/updateCampaign";
import DeleteCampaign from "./pages/deleteCampaign";
import CreateMilestone from "./pages/createMilestone";
import UpdateMilestone from "./pages/updateMilestone";
import DeleteMilestone from "./pages/deleteMilestone";
import DonatePage from "./pages/donatePage";

import ProtectedRoute from "./api/privateRoute";
import DashboardLayout from "./components/dashboardLayout";
import { useAuth } from "./auth/useAuth";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route
        element={
          <ProtectedRoute
            allowedRoles={["Admin", "Donor", "CampaignCreator"]}
          />
        }
      >
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/campaigns"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/my-campaigns"
          element={
            <DashboardLayout>
              <MyCampaigns />
            </DashboardLayout>
          }
        />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["CampaignCreator"]} />}>
        <Route
          path="/create-campaign"
          element={
            <DashboardLayout>
              <CreateCampaign />
            </DashboardLayout>
          }
        />
        <Route
          path="/campaign/:id/update"
          element={
            <DashboardLayout>
              <UpdateCampaign />
            </DashboardLayout>
          }
        />
        <Route
          path="/campaign/:id/delete"
          element={
            <DashboardLayout>
              <DeleteCampaign />
            </DashboardLayout>
          }
        />
        <Route
          path="/milestone/:id/delete"
          element={
            <DashboardLayout>
              <DeleteMilestone />
            </DashboardLayout>
          }
        />
        <Route
          path="/milestone/:id/edit"
          element={
            <DashboardLayout>
              <UpdateMilestone />
            </DashboardLayout>
          }
        />
        <Route
          path="/campaign/:id/milestones/create"
          element={
            <DashboardLayout>
              <CreateMilestone />
            </DashboardLayout>
          }
        />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["Donor"]} />}>
        <Route
          path="/campaign/:id/donate"
          element={
            <DashboardLayout>
              <DonatePage />
            </DashboardLayout>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
