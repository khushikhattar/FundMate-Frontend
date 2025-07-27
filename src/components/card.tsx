import React from "react";

interface Campaign {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const sampleCampaigns: Campaign[] = [
  {
    id: 1,
    title: "Help Ayaan Fight Leukemia",
    description:
      "Ayaan, a 7-year-old boy, needs urgent help for his leukemia treatment.",
    imageUrl: "/img/ayaan.jpeg",
  },
  {
    id: 2,
    title: "Support Priya's College Fees",
    description:
      "Priya is a bright student needing help to continue her computer science education.",
    imageUrl: "/img/priya.jpeg",
  },
  {
    id: 3,
    title: "Save the Stray Animals in Delhi",
    description:
      "A grassroots effort to provide shelter, food, and medication to stray animals.",
    imageUrl: "/img/animal.jpeg",
  },
  {
    id: 4,
    title: "Support for Natural Calamity Victims",
    description:
      "Thousands lost their homes and livelihoods due to recent floods. Help provide shelter, food, and essentials to affected families.",
    imageUrl: "/img/flood.jpeg",
  },
];

const Card: React.FC = () => {
  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">
        Ongoing Campaigns
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleCampaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
          >
            <img
              src={campaign.imageUrl}
              alt={campaign.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {campaign.title}
              </h3>
              <p className="text-sm text-gray-600">{campaign.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
