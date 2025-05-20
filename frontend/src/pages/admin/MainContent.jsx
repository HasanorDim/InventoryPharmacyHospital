import React, { useEffect } from "react";
import Sidebar from "../../components/admin/sidebar.jsx";
import Header from "../../components/admin/Header.jsx";
import { Outlet } from "react-router-dom";
import supabase from "../../lib/supabase.js";
const MainContent = () => {
  useEffect(() => {
    const fun = async () => {
      const { data } = await supabase.auth.getUser();

      console.log("user: ", data);
    };

    fun();
  }, []);
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navigation */}
        <Header />

        {/* Main Dashboard Content */}
        {/* <Dashboard /> */}
        <Outlet />
      </div>
    </div>
  );
};

export default MainContent;
