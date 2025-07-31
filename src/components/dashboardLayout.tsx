import React, { useState } from "react";
import Sidebar from "./sidebar";
import { Menu } from "lucide-react";
import ThemeToggle from "./toggle";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {sidebarOpen && (
        <div className="fixed z-50 w-64 h-full bg-gray-900 text-white">
          <Sidebar />
        </div>
      )}
      <div className="flex flex-col flex-1">
        <header className="flex items-center justify-between px-4 py-3 border-b bg-white dark:bg-gray-800 dark:text-white">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="w-6 h-6" />
          </button>
          <ThemeToggle />
        </header>
        <main className="p-4 dark:bg-gray-900 dark:text-white">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
