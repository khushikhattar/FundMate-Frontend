import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  goalAmount: z.number().min(1),
});

type FormData = z.infer<typeof formSchema>;

const CreateCampaign: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await axios.post("/campaigns/create-campaign", data, {
        withCredentials: true,
      });
      toast.success("Campaign Created");
      navigate("/dashboard/my-campaigns");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error creating campaign");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Campaign</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            {...register("title")}
            className="w-full border rounded p-2"
            placeholder="Campaign Title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            {...register("description")}
            className="w-full border rounded p-2"
            placeholder="Description"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Goal Amount</label>
          <input
            type="number"
            {...register("goalAmount")}
            className="w-full border rounded p-2"
            placeholder="Enter goal amount"
          />
          {errors.goalAmount && (
            <p className="text-red-500 text-sm">{errors.goalAmount.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isSubmitting ? "Creating..." : "Create Campaign"}
        </button>
      </form>
    </div>
  );
};

export default CreateCampaign;
