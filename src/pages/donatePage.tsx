import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../auth/useAuth";

interface Milestone {
  id: string;
  title: string;
}

const DonatePage: React.FC = () => {
  const { id: campaignId } = useParams();
  const { user } = useAuth();
  const [amount, setAmount] = useState<number>(0);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [selectedMilestone, setSelectedMilestone] = useState<string>("");

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const res = await axios.get(`/api/milestone/campaign/${campaignId}`);
        setMilestones(res.data);
        if (res.data.length) setSelectedMilestone(res.data[0].id);
      } catch (err) {
        console.error("Error fetching milestones:", err);
      }
    };

    if (campaignId) fetchMilestones();
  }, [campaignId]);

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleDonate = async () => {
    if (!amount || !selectedMilestone) {
      return alert("Please enter donation amount and select a milestone.");
    }

    try {
      const orderRes = await axios.post("/api/transaction/create-order", {
        amount,
        campaignId,
        milestoneId: selectedMilestone,
      });

      const { order } = orderRes.data;
      const razorpayLoaded = await loadRazorpayScript();

      if (!razorpayLoaded) {
        alert("Razorpay SDK failed to load. Please check your connection.");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Fundraiser",
        description: "Campaign Donation",
        order_id: order.id,
        handler: async (response: any) => {
          try {
            const verifyRes = await axios.post(
              "/api/transaction/verify-payment",
              {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                amount,
                campaignId,
                milestoneId: selectedMilestone,
              }
            );

            alert(verifyRes.data.message);
          } catch (verifyErr) {
            console.error("Payment verification failed:", verifyErr);
            alert("Failed to verify payment.");
          }
        },
        prefill: {
          name: user?.username,
          email: user?.email,
        },
        theme: { color: "#4F46E5" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Donation error:", err);
      alert("Something went wrong during donation.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 border rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Donate to Campaign
      </h2>
      <div className="mb-4">
        <label className="block mb-2">Amount (INR)</label>
        <input
          type="number"
          className="w-full border p-2 rounded"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Select Milestone</label>
        <select
          className="w-full border p-2 rounded"
          value={selectedMilestone}
          onChange={(e) => setSelectedMilestone(e.target.value)}
        >
          {milestones.map((milestone) => (
            <option key={milestone.id} value={milestone.id}>
              {milestone.title}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleDonate}
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
      >
        Pay with Razorpay
      </button>
    </div>
  );
};

export default DonatePage;
