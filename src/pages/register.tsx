import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const registerSchema = z
  .object({
    firstname: z.string().min(1, "First name is required"),
    lastname: z.string().min(1, "Last name is required"),
    email: z.email("Invalid email"),
    username: z.string().min(6, "Username must be at least 6 characters"),
    contact: z.string().length(10, "Contact must be 10 digits"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    address: z.string().min(1, "Address is required"),
    purpose: z.string().optional(),
    role: z.enum(["Donor", "Admin", "CampaignCreator"]),
  })
  .refine((data: any) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterSchema = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    setLoading(true);
    try {
      await axiosInstance.post("/auth/register", data);
      navigate("/login");
    } catch (err: any) {
      console.error(
        "Registration failed:",
        err.response?.data?.message || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("firstname")}
          placeholder="First Name"
          className="w-full border px-3 py-2 rounded"
        />
        {errors.firstname && (
          <p className="text-red-500 text-sm">{errors.firstname.message}</p>
        )}

        <input
          {...register("lastname")}
          placeholder="Last Name"
          className="w-full border px-3 py-2 rounded"
        />
        {errors.lastname && (
          <p className="text-red-500 text-sm">{errors.lastname.message}</p>
        )}

        <input
          {...register("email")}
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <input
          {...register("username")}
          placeholder="Username"
          className="w-full border px-3 py-2 rounded"
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}

        <input
          {...register("contact")}
          placeholder="Contact Number"
          className="w-full border px-3 py-2 rounded"
        />
        {errors.contact && (
          <p className="text-red-500 text-sm">{errors.contact.message}</p>
        )}

        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="w-full border px-3 py-2 rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <input
          type="password"
          {...register("confirmPassword")}
          placeholder="Confirm Password"
          className="w-full border px-3 py-2 rounded"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}

        <input
          {...register("address")}
          placeholder="Address"
          className="w-full border px-3 py-2 rounded"
        />
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address.message}</p>
        )}

        <input
          {...register("purpose")}
          placeholder="Purpose (Optional)"
          className="w-full border px-3 py-2 rounded"
        />

        <select
          {...register("role")}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select Role</option>
          <option value="Donor">Donor</option>
          <option value="CampaignCreator">Campaign Creator</option>
          <option value="Admin">Admin</option>
        </select>
        {errors.role && (
          <p className="text-red-500 text-sm">{errors.role.message}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 font-medium">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
