import React, { useState } from "react";
import Dashboard from "../pages/dashboard";
import MyCampaigns from "../pages/myCampaigns";

const CampaignTabs = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("all")}
        >
          All Campaigns
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "my" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("my")}
        >
          My Campaigns
        </button>
      </div>
      {activeTab === "all" ? <Dashboard /> : <MyCampaigns />}
    </div>
  );
};

export default CampaignTabs;
