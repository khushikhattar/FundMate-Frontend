// pages/ApproveCampaign.tsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Button } from "../components/button";

interface Campaign {
  id: string;
  title: string;
  approved: boolean;
}

const ApproveCampaign = () => {
  const [pendingCampaigns, setPendingCampaigns] = useState<Campaign[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await axiosInstance.get("/campaign/read");
        const filtered = res.data.filter((c: Campaign) => !c.approved);
        setPendingCampaigns(filtered);
      } catch (error) {
        console.error("Error fetching pending campaigns:", error);
      }
    };
    fetchPending();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      setLoadingId(id);
      await axiosInstance.patch(`/campaign/${id}/approve`);
      setPendingCampaigns(pendingCampaigns.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error approving campaign:", error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Approve Campaigns</h1>
      {pendingCampaigns.length === 0 ? (
        <p className="text-gray-600">No pending campaigns to approve.</p>
      ) : (
        <ul className="space-y-3">
          {pendingCampaigns.map((c) => (
            <li
              key={c.id}
              className="flex justify-between items-center bg-gray-100 rounded-lg p-3 shadow-sm"
            >
              <span className="text-lg font-medium text-gray-800">
                {c.title}
              </span>
              <Button
                variant="success"
                isLoading={loadingId === c.id}
                onClick={() => handleApprove(c.id)}
              >
                Approve
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ApproveCampaign;
