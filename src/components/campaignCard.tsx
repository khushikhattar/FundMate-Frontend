import Sidebar from "./sidebar";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

interface Campaign {
  id: number;
  title: string;
  description: string;
  cstatus: boolean;
}

const campaignCard = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const res = await axiosInstance.get("/read");
      setCampaigns(res.data);
    };
    fetchCampaigns();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-6 w-full">
        <h1 className="text-2xl font-semibold mb-4">All Campaigns</h1>
        <div className="grid grid-cols-1 gap-4">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className={`p-4 rounded shadow ${
                campaign.cstatus ? "bg-white" : "bg-gray-300 text-gray-500"
              }`}
            >
              <h2 className="text-lg font-bold">{campaign.title}</h2>
              <p>{campaign.description}</p>
              <span className="text-sm font-medium">
                Status: {campaign.cstatus ? "Active" : "Inactive"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default campaignCard;
