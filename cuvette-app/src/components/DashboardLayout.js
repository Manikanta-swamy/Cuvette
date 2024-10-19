// src/components/home/DashboardLayout.js
import Navbar from "./NavBar"; // Import the Navbar component
import Sidebar from "./Sidebar"; // Import the Sidebar component
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar /> {/* Top Navigation Bar */}
      <div className="flex flex-1 border-2">
        <Sidebar /> {/* Sidebar on the left */}
        <main className="flex-1 p-6 bg-gray-50"> {/* Content Area */}
          <Outlet /> {/* This will render the nested routes */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
