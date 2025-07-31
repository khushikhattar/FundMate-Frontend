import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  goalAmount: z.number().min(1, "Goal amount must be greater than 0"),
  proofUrl: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const CreateMilestone: React.FC = () => {
  const { id: campaignId } = useParams<{ id: string }>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    if (!campaignId) {
      alert("Campaign ID is missing.");
      return;
    }

    try {
      await axiosInstance.post("/milestone", {
        ...data,
        campaignId,
        goalAmount: BigInt(data.goalAmount),
      });
      alert("Milestone created!");
      reset();
    } catch (error) {
      console.error("Error creating milestone", error);
      alert("Error creating milestone");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add Milestone</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            className="border p-2 w-full"
            placeholder="Title"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <textarea
            className="border p-2 w-full"
            placeholder="Description"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <input
          className="border p-2 w-full"
          placeholder="Proof URL (optional)"
          {...register("proofUrl")}
        />

        <div>
          <input
            type="number"
            className="border p-2 w-full"
            placeholder="Goal Amount"
            {...register("goalAmount", { valueAsNumber: true })}
          />
          {errors.goalAmount && (
            <p className="text-red-500 text-sm">{errors.goalAmount.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isSubmitting ? "Submitting..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateMilestone;
