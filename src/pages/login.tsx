import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../auth/useAuth";

const loginSchema = z
  .object({
    username: z.string().optional(),
    email: z.string().email("Invalid email").optional(),
    password: z.string().min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.username || data.email, {
    message: "Either username or email is required",
    path: ["username"],
  });

type LoginSchema = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/login", data);
      if (!res.data.user) {
        throw new Error("Login response invalid");
      }
      login(res.data.user);
      const role = res.data.user.role;
      if (role === "Admin") navigate("/admin/dashboard");
      else if (role === "CampaignCreator") navigate("/creator/dashboard");
      else if (role === "Donor") navigate("/donor/dashboard");
      else navigate("/");
    } catch (err: any) {
      console.error(
        "Login failed:",
        err.response?.data?.message || err.message
      );
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 shadow-xl border rounded-xl bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full border px-3 py-2 rounded mt-1"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            type="text"
            {...register("username")}
            className="w-full border px-3 py-2 rounded mt-1"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full border px-3 py-2 rounded mt-1"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
