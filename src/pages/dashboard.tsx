import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Button } from "../components/button";
import { useAuth } from "../auth/useAuth";

interface Campaign {
  id: string;
  title: string;
  description: string;
  goalAmount: bigint;
  isApproved: boolean;
  isActive: boolean;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  goalAmount: bigint;
  proofUrl?: string;
}

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [expandedCampaignId, setExpandedCampaignId] = useState<string | null>(
    null
  );
  const [milestones, setMilestones] = useState<Record<string, Milestone[]>>({});
  const { user } = useAuth();

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await axiosInstance.get("/campaigns/read-campaigns");
      setCampaigns(res.data);
    } catch (err) {
      console.error("Error fetching campaigns", err);
    }
  };

  const toggleExpand = async (campaignId: string) => {
    if (expandedCampaignId === campaignId) {
      setExpandedCampaignId(null);
      return;
    }

    setExpandedCampaignId(campaignId);

    if (!milestones[campaignId]) {
      try {
        const res = await axiosInstance.get("/milestone/grouped-by-campaign");
        setMilestones(res.data);
      } catch (error) {
        console.error("Failed to fetch milestones", error);
      }
    }
  };

  const handleApproval = async (campaignId: string, approve: boolean) => {
    try {
      await axiosInstance.put(
        `/campaigns/${approve ? "approve" : "reject"}/${campaignId}`
      );
      fetchCampaigns();
    } catch (error) {
      console.error("Approval error", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Campaigns</h1>
      <div className="grid grid-cols-1 gap-4">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="border p-4 rounded-lg shadow bg-white"
          >
            <h2 className="text-xl font-semibold">{campaign.title}</h2>
            <p>{campaign.description}</p>
            <p className="text-gray-600">Goal: ₹{campaign.goalAmount}</p>
            <p>
              Status: {campaign.isApproved ? "Approved" : "Pending"} |{" "}
              {campaign.isActive ? "Active" : "Inactive"}
            </p>

            {user?.role === "Admin" && (
              <div className="flex gap-2 my-2">
                <Button
                  variant="success"
                  onClick={() => handleApproval(campaign.id, true)}
                >
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleApproval(campaign.id, false)}
                >
                  Reject
                </Button>
              </div>
            )}

            {campaign.isActive && (
              <Button
                variant="outline"
                onClick={() => toggleExpand(campaign.id)}
              >
                {expandedCampaignId === campaign.id
                  ? "Hide Milestones"
                  : "View Milestones"}
              </Button>
            )}

            {expandedCampaignId === campaign.id && milestones[campaign.id] && (
              <div className="mt-4 space-y-2">
                {milestones[campaign.id].map((m) => (
                  <div key={m.id} className="p-2 border rounded bg-gray-50">
                    <h4 className="font-semibold">{m.title}</h4>
                    <p>{m.description}</p>
                    <p>Goal: ₹{m.goalAmount}</p>
                    {m.proofUrl && (
                      <a
                        href={m.proofUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                      >
                        View Proof
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
