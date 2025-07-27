import React from "react";
import { Link } from "react-router-dom";

const About: React.FC = () => {
  return (
    <div className="px-6 py-12 max-w-5xl mx-auto text-gray-800">
      <h1 className="text-5xl font-extrabold mb-8 text-indigo-700 text-center">
        Empower Dreams. Fund Futures. 🌟
      </h1>

      <p className="text-lg leading-8 mb-5">
        <strong className="text-indigo-700">FundMate</strong> is your trusted
        crowdfunding ally — helping individuals, families, and communities raise
        funds during life’s most critical moments. Whether it’s for medical
        emergencies, education, or a social cause, FundMate makes fundraising
        simple, fast, and impactful.
      </p>

      <p className="text-lg leading-8 mb-5">
        We’ve built our platform around{" "}
        <span className="font-semibold text-emerald-600">trust</span>,{" "}
        <span className="font-semibold text-amber-600">transparency</span>, and{" "}
        <span className="font-semibold text-rose-600">simplicity</span>. Create
        campaigns with ease and connect with donors who genuinely care.
      </p>

      <h3 className="text-2xl font-bold text-indigo-600 mt-8 mb-2">
        🚀 What Makes FundMate Special?
      </h3>
      <ul className="list-disc list-inside text-base space-y-2">
        <li>🛠️ Effortless campaign creation with fast approvals</li>
        <li>🔒 Safe & secure donations via trusted payment partners</li>
        <li>📈 Clear insights on donations and campaign milestones</li>
        <li>🧑‍🤝‍🧑 Role-based access for Admins, Donors & Campaign Creators</li>
      </ul>

      <p className="text-lg leading-8 mt-8">
        Whether you're a student with big dreams, someone facing a health
        emergency, or a changemaker with a vision —
        <span className="font-medium text-rose-600"> FundMate is for you.</span>
        <span className="block mt-4 font-semibold text-indigo-700">
          Ready to make a difference?{" "}
          <Link
            to="/register"
            className="underline text-indigo-500 hover:text-indigo-600"
          >
            Start your campaign today →
          </Link>
        </span>
      </p>
    </div>
  );
};

export default About;
