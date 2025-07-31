import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "../components/button";
import { useAuth } from "../auth/useAuth";

type VoteMilestoneProps = {
  milestoneId: number;
  currentVote?: boolean;
  onVoted?: () => void;
};

const VoteMilestone = ({
  milestoneId,
  currentVote,
  onVoted,
}: VoteMilestoneProps) => {
  const { user } = useAuth();

  const canVote = user?.role === "Donor" || user?.role === "Admin";
  if (!canVote) return null;

  const castVote = async (vote: boolean) => {
    try {
      await axios.post("/milestone/vote", { milestoneId, vote });
      toast.success(`Voted ${vote ? "Approve" : "Reject"}`);
      onVoted?.();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Voting failed");
    }
  };

  return (
    <div className="flex gap-2 mt-2">
      <Button
        variant={currentVote === true ? "success" : "outline"}
        onClick={() => castVote(true)}
      >
        Approve
      </Button>
      <Button
        variant={currentVote === false ? "destructive" : "outline"}
        onClick={() => castVote(false)}
      >
        Reject
      </Button>
    </div>
  );
};

export default VoteMilestone;
