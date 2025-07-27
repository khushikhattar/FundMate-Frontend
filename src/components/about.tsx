import React from "react";
import { Link } from "react-router-dom";

const About: React.FC = () => {
  return (
    <div className="px-6 py-12 max-w-5xl mx-auto text-gray-800">
      <h1 className="text-5xl font-extrabold mb-8 text-blue-700 text-center">
        About FundMate
      </h1>

      <p className="text-lg leading-8 mb-5">
        <strong className="text-blue-700">FundMate</strong> is your friendly
        crowdfunding companion — built to empower individuals, families, and
        communities to raise funds when they need them most. From emergency
        medical treatments and educational goals to community-driven causes,
        FundMate simplifies fundraising and helps amplify your story to the
        world.
      </p>

      <p className="text-lg leading-8 mb-5">
        Our platform is built on{" "}
        <span className="font-semibold text-green-600">trust</span>,{" "}
        <span className="font-semibold text-purple-600">transparency</span>, and{" "}
        <span className="font-semibold text-yellow-600">ease of use</span>. We
        enable campaign creators to tell their stories beautifully and allow
        donors to contribute with confidence.
      </p>

      <h3 className="text-2xl font-bold text-blue-600 mt-8 mb-2">
        💡 Why FundMate?
      </h3>
      <ul className="list-disc list-inside text-base space-y-2">
        <li>🚀 Easy campaign creation with real-time approval</li>
        <li>🔐 Secure payments with trusted gateways</li>
        <li>📊 Track donations and milestones clearly</li>
        <li>👥 Role-based access: Admins, Donors, Campaigners</li>
      </ul>

      <p className="text-lg leading-8 mt-8">
        Whether you're a student needing funds, facing medical emergencies, or
        just want to create impact — FundMate is for you.
        <span className="block mt-4 font-semibold text-blue-700">
          Join our community that cares.{" "}
          <Link to="/register" className="underline text-blue-500">
            Create your campaign today →
          </Link>
        </span>
      </p>
    </div>
  );
};

export default About;
