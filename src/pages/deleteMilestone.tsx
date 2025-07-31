import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "../components/button";
import { useAuth } from "../auth/useAuth";

const DeleteMilestone = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const milestoneId = parseInt(id || "");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (user?.role !== "CampaignCreator") return null;
  if (!milestoneId) return <p>Invalid milestone ID.</p>;

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this milestone?"
    );
    if (!confirmed) return;

    try {
      setLoading(true);
      await axios.delete(`/campaigns/milestone/${milestoneId}`);
      toast.success("Milestone deleted successfully");
      navigate(-1);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Milestone deletion failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Delete Milestone</h1>
      <Button variant="destructive" onClick={handleDelete} disabled={loading}>
        {loading ? "Deleting..." : "Confirm Delete"}
      </Button>
    </div>
  );
};

export default DeleteMilestone;
