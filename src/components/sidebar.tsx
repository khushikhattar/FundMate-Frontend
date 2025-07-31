import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { Button } from "./button";
import { Menu, X } from "lucide-react";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setLoading(false);
  };

  return (
    <>
      <div className="bg-gray-900 text-white p-4 flex items-center justify-between shadow-md">
        <button
          onClick={() => setOpen(!open)}
          className="text-white focus:outline-none"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 className="text-xl font-bold">Dashboard</h1>
      </div>
      {open && (
        <div className="w-64 min-h-screen bg-gray-800 text-white p-6 absolute z-50 top-0 left-0 shadow-lg">
          <div className="space-y-4">
            <nav className="space-y-2">
              <Link
                to="/dashboard"
                className={`block px-2 py-1 rounded ${
                  isActive("/dashboard") ? "bg-gray-700 font-semibold" : ""
                }`}
              >
                All Campaigns
              </Link>

              {user?.role === "Admin" && (
                <Link
                  to="/approve-campaigns"
                  className={`block px-2 py-1 rounded ${
                    isActive("/approve-campaigns")
                      ? "bg-gray-700 font-semibold"
                      : ""
                  }`}
                >
                  Approve Campaigns
                </Link>
              )}

              {user?.role === "CampaignCreator" && (
                <>
                  <Link
                    to="/create-campaign"
                    className={`block px-2 py-1 rounded ${
                      isActive("/create-campaign")
                        ? "bg-gray-700 font-semibold"
                        : ""
                    }`}
                  >
                    Create Campaign
                  </Link>
                  <Link
                    to="/my-campaigns"
                    className={`block px-2 py-1 rounded ${
                      isActive("/my-campaigns")
                        ? "bg-gray-700 font-semibold"
                        : ""
                    }`}
                  >
                    My Campaigns
                  </Link>
                </>
              )}

              {user?.role === "Donor" && (
                <Link
                  to="/my-campaigns"
                  className={`block px-2 py-1 rounded ${
                    isActive("/my-campaigns") ? "bg-gray-700 font-semibold" : ""
                  }`}
                >
                  My Donations
                </Link>
              )}
            </nav>

            <div className="pt-4">
              <Button
                variant="destructive"
                onClick={handleLogout}
                disabled={loading}
                className="w-full"
              >
                {loading ? "Logging out..." : "Logout"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
