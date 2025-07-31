import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { Button } from "../components/button";
import { useAuth } from "../auth/useAuth";

interface Campaign {
  id: string;
  title: string;
  description: string;
  goalAmount: number;
  isApproved: boolean;
  isActive: boolean;
}

const MyCampaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/campaigns/my-campaigns")
      .then((res) => setCampaigns(res.data))
      .catch(() => alert("Failed to fetch your campaigns"));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Campaigns</h2>
      <div className="grid grid-cols-1 gap-4">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="border p-4 rounded shadow bg-white">
            <h3 className="text-lg font-semibold">{campaign.title}</h3>
            <p>{campaign.description}</p>
            <p className="text-gray-600">Goal: ₹{campaign.goalAmount}</p>
            <p>
              Status: {campaign.isApproved ? "Approved" : "Pending"} |{" "}
              {campaign.isActive ? "Active" : "Inactive"}
            </p>

            {user?.role === "CampaignCreator" && (
              <div className="flex gap-2 mt-2">
                <Button
                  onClick={() => navigate(`/milestones/create/${campaign.id}`)}
                >
                  Add Milestone
                </Button>
                <Button
                  onClick={() => navigate(`/campaigns/update/${campaign.id}`)}
                  variant="outline"
                >
                  Edit Campaign
                </Button>
              </div>
            )}

            {user?.role === "Donor" && campaign.isActive && (
              <Button
                onClick={() => navigate(`/campaigns/donate/${campaign.id}`)}
              >
                Donate
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCampaigns;
