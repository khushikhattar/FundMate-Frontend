import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axiosInstance";

const DeleteCampaign = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this campaign?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(`/delete-campaign/${id}`);
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to delete campaign", err);
      alert("Failed to delete. Try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Delete Campaign</h1>
      <p className="text-gray-700 mb-6">
        Are you sure you want to delete this campaign? This action cannot be
        undone.
      </p>
      <button
        onClick={handleDelete}
        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
      >
        Delete Campaign
      </button>
    </div>
  );
};

export default DeleteCampaign;
