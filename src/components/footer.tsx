import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white py-10 mt-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <img
            src="/img/logo.jpg"
            alt="FundMate Logo"
            className="w-20 h-20 mb-3 rounded-full border-2 border-white"
          />
          <h2 className="text-xl font-bold mb-2">FundMate</h2>
          <p className="text-sm text-gray-200">
            Empowering lives through crowdfunding. Raise funds for medical,
            educational, and social causes with ease.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
          <ul className="text-sm space-y-1">
            <li>
              📧{" "}
              <a
                href="mailto:support@fundmate.com"
                className="hover:underline text-blue-300"
              >
                support@fundmate.com
              </a>
            </li>
            <li>
              📞{" "}
              <a
                href="tel:9896543200"
                className="hover:underline text-blue-300"
              >
                +91 98965 43200
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2">Popular Causes</h4>
          <ul className="text-sm space-y-1">
            <li>🌿 Environment Crowdfunding</li>
            <li>🏥 Medical Crowdfunding</li>
            <li>📚 Education Support</li>
            <li>🐶 Animal Welfare</li>
            <li>👶 Child Welfare</li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2">How It Works?</h4>
          <ul className="text-sm space-y-1">
            <li>🤔 What is Crowdfunding?</li>
            <li>💡 Fundraising Tips</li>
            <li>💸 Withdraw Funds</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-gray-300 mt-10">
        © {new Date().getFullYear()} FundMate. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
