import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";
import { Button } from "../components/button";

const updateSchema = z.object({
  newtitle: z.string().min(1, "Title is required"),
  newdescription: z.string().min(1, "Description is required"),
});

type UpdateMilestoneForm = z.infer<typeof updateSchema>;

export default function UpdateMilestone() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UpdateMilestoneForm>({
    resolver: zodResolver(updateSchema),
  });

  useEffect(() => {
    const fetchMilestone = async () => {
      try {
        const res = await axiosInstance.get("/read");
        const milestone = res.data.milestones.find(
          (m: any) => m.id === parseInt(id!)
        );
        if (milestone) {
          setValue("newtitle", milestone.title);
          setValue("newdescription", milestone.description);
        }
      } catch {
        toast.error("Failed to fetch milestone");
      }
    };
    fetchMilestone();
  }, [id, setValue]);

  const onSubmit = async (data: UpdateMilestoneForm) => {
    try {
      await axiosInstance.put(`/milestone/${id}`, data);
      toast.success("Milestone updated");
      navigate("/dashboard");
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded"
    >
      <h2 className="text-2xl font-semibold mb-4">Update Milestone</h2>

      <div className="mb-4">
        <label className="block mb-1">Title</label>
        <input {...register("newtitle")} className="border w-full p-2" />
        {errors.newtitle && (
          <p className="text-red-500">{errors.newtitle.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-1">Description</label>
        <textarea
          {...register("newdescription")}
          className="border w-full p-2"
        />
        {errors.newdescription && (
          <p className="text-red-500">{errors.newdescription.message}</p>
        )}
      </div>

      <Button type="submit" isLoading={isSubmitting}>
        Update
      </Button>
    </form>
  );
}
