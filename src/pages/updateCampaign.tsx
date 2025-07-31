import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axiosInstance";

const updateSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description is too short"),
  goalAmount: z.number().positive("Goal must be positive"),
  deadline: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
});

type UpdateFormData = z.infer<typeof updateSchema>;

const UpdateCampaign = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UpdateFormData>({
    resolver: zodResolver(updateSchema),
  });

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await axios.get(`/campaigns/get-campaign/${id}`);
        const campaign = res.data;
        setValue("title", campaign.title);
        setValue("description", campaign.description);
        setValue("goalAmount", campaign.goalAmount);
        setValue("deadline", campaign.deadline.split("T")[0]);
      } catch (errors) {
        console.error("Failed to load campaign", errors);
      }
    };
    fetchCampaign();
  }, [id, setValue]);

  const onSubmit = async (data: UpdateFormData) => {
    try {
      await axios.put(`/campaigns/update-campaign/${id}`, data);
      navigate("/dashboard");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Update Campaign</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            {...register("title")}
            className="w-full p-2 border rounded"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            {...register("description")}
            className="w-full p-2 border rounded"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Goal Amount</label>
          <input
            type="number"
            step="0.01"
            {...register("goalAmount", { valueAsNumber: true })}
            className="w-full p-2 border rounded"
          />
          {errors.goalAmount && (
            <p className="text-red-500 text-sm">{errors.goalAmount.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Deadline</label>
          <input
            type="date"
            {...register("deadline")}
            className="w-full p-2 border rounded"
          />
          {errors.deadline && (
            <p className="text-red-500 text-sm">{errors.deadline.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isSubmitting ? "Updating..." : "Update Campaign"}
        </button>
      </form>
    </div>
  );
};

export default UpdateCampaign;
